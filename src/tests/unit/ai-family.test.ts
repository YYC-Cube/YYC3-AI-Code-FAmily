/**
 * file: ai-family.test.ts
 * description: AI Family 模块单元测试 — 意图识别路由、AgentRegistry、Persona 构建、Skills Registry
 * @tags testing,unit,ai,family,intent,agent,skill
 * @priority P0
 */

import { describe, expect, it } from 'vitest';

/* ── AgentIntentRouter ── */

describe('AgentIntentRouter — 意图路由引擎', () => {
  describe('routeIntent()', () => {
    it('TC-AIF-001: "生成测试" 路由到 master 为主 Agent', async () => {
      const { detectIntent } = await import('../../app/components/ide/ai/SystemPromptBuilder');
      const { routeIntent } = await import('../../app/components/ide/ai/AgentIntentRouter');
      const intent = detectIntent('帮我生成单元测试');
      const routing = routeIntent('帮我生成单元测试', intent);
      expect(routing.primaryAgent).toBe('master');
      expect(routing.needsOrchestration).toBe(false);
    });

    it('TC-AIF-002: 安全关键词路由到 sentinel', async () => {
      const { routeIntent } = await import('../../app/components/ide/ai/AgentIntentRouter');
      const routing = routeIntent('检查 XSS 漏洞', 'review');
      expect(routing.primaryAgent).toBe('sentinel');
    });

    it('TC-AIF-003: 架构关键词路由到 tianshu', async () => {
      const { routeIntent } = await import('../../app/components/ide/ai/AgentIntentRouter');
      const routing = routeIntent('设计系统架构', 'general');
      expect(routing.primaryAgent).toBe('tianshu');
    });

    it('TC-AIF-004: 长文本(>200字符)复杂任务启用编排模式', async () => {
      const { routeIntent } = await import('../../app/components/ide/ai/AgentIntentRouter');
      const longMsg = '请帮我重构整个应用的前端架构，涉及多个文件和模块。' + '我们需要做的事情很多。'.repeat(20);
      const routing = routeIntent(longMsg, 'refactor');
      expect(routing.needsOrchestration).toBe(true);
      expect(routing.primaryAgent).toBe('tianshu');
    });

    it('TC-AIF-005: "多处/多个文件" 关键词触发天枢编排', async () => {
      const { routeIntent } = await import('../../app/components/ide/ai/AgentIntentRouter');
      const routing = routeIntent('修改多个文件中的类型定义', 'modify');
      expect(routing.needsOrchestration).toBe(true);
      expect(routing.primaryAgent).toBe('tianshu');
    });

    it('TC-AIF-006: general 意图不应启用编排模式', async () => {
      const { routeIntent } = await import('../../app/components/ide/ai/AgentIntentRouter');
      const routing = routeIntent('你好', 'general');
      expect(routing.needsOrchestration).toBe(false);
    });

    it('TC-AIF-007: 无关键词匹配时使用意图默认路由', async () => {
      const { routeIntent } = await import('../../app/components/ide/ai/AgentIntentRouter');
      const routing = routeIntent('一些随机的文字', 'explain');
      expect(routing.primaryAgent).toBe('thinker');
    });
  });

  describe('getFamilyAgent()', () => {
    it('TC-AIF-010: 获取已注册 Agent 返回完整定义', async () => {
      const { getFamilyAgent } = await import('../../app/components/ide/ai/AgentIntentRouter');
      const agent = getFamilyAgent('tianshu');
      expect(agent.id).toBe('tianshu');
      expect(agent.name).toContain('天枢');
      expect(agent.emoji).toBeTruthy();
      expect(agent.role).toBeTruthy();
      expect(agent.ideCapabilities.length).toBeGreaterThan(0);
    });

    it('TC-AIF-011: 8 位家人全部注册', async () => {
      const { AI_FAMILY_REGISTRY } = await import('../../app/components/ide/ai/AgentIntentRouter');
      const ids = Object.keys(AI_FAMILY_REGISTRY);
      expect(ids).toHaveLength(8);
      expect(ids).toContain('tianshu');
      expect(ids).toContain('navigator');
      expect(ids).toContain('thinker');
      expect(ids).toContain('prophet');
      expect(ids).toContain('bolero');
      expect(ids).toContain('sentinel');
      expect(ids).toContain('master');
      expect(ids).toContain('creative');
    });
  });

  describe('buildAgentPersona()', () => {
    it('TC-AIF-020: 返回包含 Agent 角色描述的字符串', async () => {
      const { buildAgentPersona } = await import('../../app/components/ide/ai/AgentIntentRouter');
      const persona = buildAgentPersona('sentinel');
      expect(persona).toContain('智云·守护');
      expect(persona).toContain('安全审计');
      expect(persona).toContain('AI Family 角色');
    });

    it('TC-AIF-021: 包含 IDE 核心能力列表', async () => {
      const { buildAgentPersona } = await import('../../app/components/ide/ai/AgentIntentRouter');
      const persona = buildAgentPersona('master');
      expect(persona).toContain('格物·宗师');
      expect(persona.split('-').length).toBeGreaterThan(3);
    });
  });

  describe('buildRoutingSummary()', () => {
    it('TC-AIF-030: 返回包含主 Agent 的摘要', async () => {
      const { buildRoutingSummary, routeIntent } = await import('../../app/components/ide/ai/AgentIntentRouter');
      const routing = routeIntent('优化性能', 'refactor');
      const summary = buildRoutingSummary('优化性能', 'refactor', routing);
      expect(summary).toContain('用户输入');
      expect(summary).toContain('识别意图');
      expect(summary).toContain('主Agent');
    });
  });
});

/* ── SystemPromptBuilder ── */

describe('SystemPromptBuilder — 系统提示词构建', () => {
  describe('detectIntent()', () => {
    it('TC-AIF-040: "测试" 关键词识别为 test 意图', async () => {
      const { detectIntent } = await import('../../app/components/ide/ai/SystemPromptBuilder');
      expect(detectIntent('帮我写一个单元测试')).toBe('test');
      expect(detectIntent('生成测试')).toBe('test');
    });

    it('TC-AIF-041: "修复/报错" 关键词识别为 fix', async () => {
      const { detectIntent } = await import('../../app/components/ide/ai/SystemPromptBuilder');
      expect(detectIntent('修复这个 bug')).toBe('fix');
      expect(detectIntent('修复这个报错')).toBe('fix');
      expect(detectIntent('解决这个异常')).toBe('fix');
    });

    it('TC-AIF-042: "解释/说明" 关键词识别为 explain', async () => {
      const { detectIntent } = await import('../../app/components/ide/ai/SystemPromptBuilder');
      expect(detectIntent('解释这段代码')).toBe('explain');
      expect(detectIntent('说明一下这段代码')).toBe('explain');
      expect(detectIntent('解释代码原理')).toBe('explain');
    });

    it('TC-AIF-043: "生成/创建" 关键词识别为 generate', async () => {
      const { detectIntent } = await import('../../app/components/ide/ai/SystemPromptBuilder');
      expect(detectIntent('创建一个 React 组件')).toBe('generate');
      expect(detectIntent('生成 API 接口')).toBe('generate');
      expect(detectIntent('添加一个按钮')).toBe('generate');
    });

    it('TC-AIF-044: "重构/优化" 关键词识别为 refactor', async () => {
      const { detectIntent } = await import('../../app/components/ide/ai/SystemPromptBuilder');
      expect(detectIntent('重构这个类')).toBe('refactor');
      expect(detectIntent('优化性能')).toBe('refactor');
    });

    it('TC-AIF-045: "修改" 关键词识别为 modify', async () => {
      const { detectIntent } = await import('../../app/components/ide/ai/SystemPromptBuilder');
      expect(detectIntent('修改这段代码')).toBe('modify');
      expect(detectIntent('更改颜色')).toBe('modify');
    });

    it('TC-AIF-046: 无匹配返回 general', async () => {
      const { detectIntent } = await import('../../app/components/ide/ai/SystemPromptBuilder');
      expect(detectIntent('你好')).toBe('general');
      expect(detectIntent('今天天气不错')).toBe('general');
    });

    it('TC-AIF-047: "review/审查" 关键词识别为 review', async () => {
      const { detectIntent } = await import('../../app/components/ide/ai/SystemPromptBuilder');
      expect(detectIntent('帮我 review 这段代码')).toBe('review');
      expect(detectIntent('code review 一下')).toBe('review');
    });
  });
});

/* ── AIFamilySkills ── */

describe('AIFamilySkills — Skills 注册表', () => {
  it('TC-AIF-050: IDE_SKILLS_REGISTRY 包含至少 8 个 Skill', async () => {
    const { IDE_SKILLS_REGISTRY } = await import('../../app/components/ide/ai/AIFamilySkills');
    expect(IDE_SKILLS_REGISTRY.length).toBeGreaterThanOrEqual(8);
  });

  it('TC-AIF-051: 每个 Skill 包含必要字段', async () => {
    const { IDE_SKILLS_REGISTRY } = await import('../../app/components/ide/ai/AIFamilySkills');
    for (const skill of IDE_SKILLS_REGISTRY) {
      expect(skill.id).toBeTruthy();
      expect(skill.name).toBeTruthy();
      expect(skill.agent).toBeTruthy();
      expect(skill.description).toBeTruthy();
      expect(skill.triggers).toBeInstanceOf(Array);
      expect(skill.steps).toBeInstanceOf(Array);
      expect(skill.steps.length).toBeGreaterThan(0);
    }
  });

  it('TC-AIF-052: 所有 Skill 的 agent 均在已注册家人中', async () => {
    const { IDE_SKILLS_REGISTRY } = await import('../../app/components/ide/ai/AIFamilySkills');
    const { AI_FAMILY_REGISTRY } = await import('../../app/components/ide/ai/AgentIntentRouter');
    const validAgents = Object.keys(AI_FAMILY_REGISTRY);
    for (const skill of IDE_SKILLS_REGISTRY) {
      expect(validAgents).toContain(skill.agent);
    }
  });

  it('TC-AIF-053: 所有 Skill 的 ID 唯一', async () => {
    const { IDE_SKILLS_REGISTRY } = await import('../../app/components/ide/ai/AIFamilySkills');
    const ids = IDE_SKILLS_REGISTRY.map(s => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('TC-AIF-054: 每个 Skill 的 tool 类型为有效值', async () => {
    const { IDE_SKILLS_REGISTRY } = await import('../../app/components/ide/ai/AIFamilySkills');
    const validTools: string[] = [
      'read_file', 'write_file', 'search_code', 'run_terminal',
      'security_scan', 'generate_test', 'code_review', 'preview_url',
      'git_diff', 'snapshot', 'web_search', 'rag_query',
      'analyze_deps', 'list_files', 'format_code', 'generate_docs',
      'check_types', 'run_lint',
    ];
    for (const skill of IDE_SKILLS_REGISTRY) {
      for (const step of skill.steps) {
        expect(validTools).toContain(step.tool);
      }
    }
  });

  it('TC-AIF-055: tianshu-arch-design 包含架构分析步骤', async () => {
    const { IDE_SKILLS_REGISTRY } = await import('../../app/components/ide/ai/AIFamilySkills');
    const archSkill = IDE_SKILLS_REGISTRY.find(s => s.id === 'tianshu-arch-design');
    expect(archSkill).toBeDefined();
    expect(archSkill!.agent).toBe('tianshu');
    expect(archSkill!.steps.length).toBeGreaterThanOrEqual(3);
  });
});
