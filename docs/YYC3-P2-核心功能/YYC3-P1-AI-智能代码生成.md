# YYC³ P1-AI-智能代码生成

## 🤖 AI 角色定义

You are a senior AI code generation specialist and intelligent development tools architect with deep expertise in AI-powered code generation, code analysis, and developer productivity enhancement.

### Your Role & Expertise

You are an experienced AI developer who specializes in:
- **AI Code Generation**: LLM-based code generation, code completion, code refactoring
- **Code Analysis**: Static analysis, code quality assessment, bug detection
- **Code Optimization**: Performance optimization, code simplification, best practices
- **Testing**: Automated test generation, test coverage analysis, test optimization
- **Documentation**: Code documentation generation, API documentation, inline comments
- **Developer Experience**: IDE integration, real-time suggestions, intelligent autocomplete
- **Code Patterns**: Design patterns, architectural patterns, code templates
- **Best Practices**: Clean code, SOLID principles, code maintainability

### Code Standards

**IMPORTANT**: Please ensure all generated code files follow the team requirements specified in: `guidelines/YYC3-Code-header.md`

All code files must include proper file headers with:
- @file: File name/path
- @description: Clear description of file purpose
- @author: YanYuCloudCube Team <admin@0379.email>
- @version: Semantic version (v1.0.0)
- @created: Creation date (YYYY-MM-DD)
- @updated: Last update date (YYYY-MM-DD)
- @status: File status (draft/dev/test/stable/deprecated)
- @license: License type
- @copyright: Copyright notice
- @tags: Relevant tags for categorization

---

## 📋 文档信息

| 字段 | 内容 |
|------|------|
| @file | P1-核心功能/YYC3-P1-AI-智能代码生成.md |
| @description | AI 智能代码生成功能设计和实现，包含代码生成、代码补全、代码优化等 |
| @author | YanYuCloudCube Team <admin@0379.email> |
| @version | v1.0.0 |
| @created | 2026-03-14 |
| @updated | 2026-03-14 |
| @status | stable |
| @license | MIT |
| @copyright | Copyright (c) 2026 YanYuCloudCube Team |
| @tags P1,AI,code,generation |

---

## 🎯 功能目标

### 核心目标

1. **代码生成**：根据描述生成代码
2. **代码补全**：智能代码自动补全
3. **代码优化**：优化代码质量和性能
4. **代码解释**：解释代码功能
5. **代码重构**：重构代码结构
6. **代码测试**：生成测试代码

---

## 🏗️ 架构设计

### 1. 功能架构

```
AI Code Generation/
├── CodeGenerator          # 代码生成器
├── CodeCompleter         # 代码补全器
├── CodeOptimizer         # 代码优化器
├── CodeExplainer         # 代码解释器
├── CodeRefactor         # 代码重构器
└── CodeTestGenerator     # 测试代码生成器
```

### 2. 数据流

```
User Input (用户输入)
    ↓ AI Prompt
AI Provider (AI 提供商)
    ↓ AI Response
Code Generator (代码生成器)
    ↓ Generated Code
Editor (编辑器)
```

---

## 💻 核心实现

### 1. 代码生成器

```typescript
// src/ai/code/CodeGenerator.ts
import { aiProviderManager } from '../AIProviderManager';
import type { AIRequestConfig } from '@/types';

export interface CodeGenerationOptions {
  /** 代码语言 */
  language: string;
  /** 代码描述 */
  description: string;
  /** 代码上下文 */
  context?: string;
  /** 是否包含注释 */
  includeComments?: boolean;
  /** 代码风格 */
  style?: 'functional' | 'object-oriented' | 'procedural';
  /** 是否包含错误处理 */
  includeErrorHandling?: boolean;
}

export class CodeGenerator {
  /**
   * 生成代码
   */
  async generateCode(options: CodeGenerationOptions): Promise<string> {
    const {
      language,
      description,
      context = '',
      includeComments = true,
      style = 'object-oriented',
      includeErrorHandling = true,
    } = options;

    const systemPrompt = this.buildSystemPrompt(language, style, includeComments, includeErrorHandling);
    const userPrompt = this.buildUserPrompt(description, context);

    const config: AIRequestConfig = {
      provider: await aiProviderManager.selectProvider(),
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      maxTokens: 4096,
      stream: false,
    };

    const response = await aiProviderManager.request(config);
    return response.content;
  }

  /**
   * 流式生成代码
   */
  async generateCodeStream(
    options: CodeGenerationOptions,
    onChunk: (chunk: string) => void,
    onComplete: () => void,
    onError: (error: Error) => void
  ): Promise<void> {
    const {
      language,
      description,
      context = '',
      includeComments = true,
      style = 'object-oriented',
      includeErrorHandling = true,
    } = options;

    const systemPrompt = this.buildSystemPrompt(language, style, includeComments, includeErrorHandling);
    const userPrompt = this.buildUserPrompt(description, context);

    const config: AIRequestConfig = {
      provider: await aiProviderManager.selectProvider(),
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      maxTokens: 4096,
      stream: true,
    };

    await aiProviderManager.streamRequest(config, onChunk, onComplete, onError);
  }

  /**
   * 构建系统提示词
   */
  private buildSystemPrompt(
    language: string,
    style: string,
    includeComments: boolean,
    includeErrorHandling: boolean
  ): string {
    let prompt = `You are an expert ${language} programmer. Generate clean, efficient, and well-structured code.\n\n`;

    prompt += `Code Style: ${style}\n`;
    prompt += includeComments ? 'Include clear and helpful comments.\n' : 'Do not include comments.\n';
    prompt += includeErrorHandling ? 'Include proper error handling.\n' : 'Do not include error handling.\n';

    prompt += `\nGuidelines:\n`;
    prompt += `- Write production-ready code\n`;
    prompt += `- Follow best practices and conventions\n`;
    prompt += `- Use meaningful variable and function names\n`;
    prompt += `- Keep code DRY (Don't Repeat Yourself)\n`;
    prompt += `- Write modular and reusable code\n`;

    return prompt;
  }

  /**
   * 构建用户提示词
   */
  private buildUserPrompt(description: string, context: string): string {
    let prompt = '';

    if (context) {
      prompt += `Context:\n${context}\n\n`;
    }

    prompt += `Task:\n${description}\n\n`;
    prompt += `Please generate the code that fulfills the above requirements. Only output the code, no explanations.`;

    return prompt;
  }
}

export const codeGenerator = new CodeGenerator();
```

### 2. 代码补全器

```typescript
// src/ai/code/CodeCompleter.ts
import { aiProviderManager } from '../AIProviderManager';
import type { AIRequestConfig } from '@/types';

export interface CodeCompletionOptions {
  /** 代码语言 */
  language: string;
  /** 当前代码 */
  code: string;
  /** 光标位置 */
  cursorPosition: { line: number; column: number };
  /** 补全类型 */
  type?: 'inline' | 'block' | 'function' | 'class';
  /** 最大补全长度 */
  maxLength?: number;
}

export class CodeCompleter {
  /**
   * 生成代码补全
   */
  async completeCode(options: CodeCompletionOptions): Promise<string> {
    const {
      language,
      code,
      cursorPosition,
      type = 'inline',
      maxLength = 100,
    } = options;

    const prompt = this.buildPrompt(language, code, cursorPosition, type);

    const config: AIRequestConfig = {
      provider: await aiProviderManager.selectProvider(),
      model: 'gpt-4',
      messages: [
        { role: 'system', content: this.buildSystemPrompt(language) },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      maxTokens: maxLength,
      stream: false,
    };

    const response = await aiProviderManager.request(config);
    return response.content;
  }

  /**
   * 流式代码补全
   */
  async completeCodeStream(
    options: CodeCompletionOptions,
    onChunk: (chunk: string) => void,
    onComplete: () => void,
    onError: (error: Error) => void
  ): Promise<void> {
    const {
      language,
      code,
      cursorPosition,
      type = 'inline',
      maxLength = 100,
    } = options;

    const prompt = this.buildPrompt(language, code, cursorPosition, type);

    const config: AIRequestConfig = {
      provider: await aiProviderManager.selectProvider(),
      model: 'gpt-4',
      messages: [
        { role: 'system', content: this.buildSystemPrompt(language) },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      maxTokens: maxLength,
      stream: true,
    };

    await aiProviderManager.streamRequest(config, onChunk, onComplete, onError);
  }

  /**
   * 构建系统提示词
   */
  private buildSystemPrompt(language: string): string {
    return `You are an expert ${language} programmer. Complete the code at the cursor position. Only provide the completion, no explanations.`;
  }

  /**
   * 构建提示词
   */
  private buildPrompt(
    language: string,
    code: string,
    cursorPosition: { line: number; column: number },
    type: string
  ): string {
    const lines = code.split('\n');
    const prefix = lines.slice(0, cursorPosition.line).join('\n') + '\n';
    const currentLine = lines[cursorPosition.line];
    const suffix = lines.slice(cursorPosition.line + 1).join('\n');

    let prompt = `Language: ${language}\n`;
    prompt += `Completion Type: ${type}\n\n`;
    prompt += `Code:\n\`\`\`${language}\n${prefix}${currentLine.slice(0, cursorPosition.column)}<CURSOR>${currentLine.slice(cursorPosition.column)}\n${suffix}\n\`\`\`\n\n`;
    prompt += `Complete the code at <CURSOR>. Only output the completion, no explanations.`;

    return prompt;
  }
}

export const codeCompleter = new CodeCompleter();
```

### 3. 代码优化器

```typescript
// src/ai/code/CodeOptimizer.ts
import { aiProviderManager } from '../AIProviderManager';
import type { AIRequestConfig } from '@/types';

export interface CodeOptimizationOptions {
  /** 代码语言 */
  language: string;
  /** 原始代码 */
  code: string;
  /** 优化目标 */
  goals?: ('performance' | 'readability' | 'maintainability' | 'security')[];
  /** 是否保留注释 */
  keepComments?: boolean;
}

export class CodeOptimizer {
  /**
   * 优化代码
   */
  async optimizeCode(options: CodeOptimizationOptions): Promise<{ optimizedCode: string; explanation: string }> {
    const {
      language,
      code,
      goals = ['performance', 'readability'],
      keepComments = true,
    } = options;

    const prompt = this.buildPrompt(language, code, goals, keepComments);

    const config: AIRequestConfig = {
      provider: await aiProviderManager.selectProvider(),
      model: 'gpt-4',
      messages: [
        { role: 'system', content: this.buildSystemPrompt(language) },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
      maxTokens: 4096,
      stream: false,
    };

    const response = await aiProviderManager.request(config);
    const { optimizedCode, explanation } = this.parseResponse(response.content);

    return { optimizedCode, explanation };
  }

  /**
   * 构建系统提示词
   */
  private buildSystemPrompt(language: string): string {
    return `You are an expert ${language} programmer and code reviewer. Optimize the given code for better performance, readability, and maintainability.`;
  }

  /**
   * 构建提示词
   */
  private buildPrompt(
    language: string,
    code: string,
    goals: string[],
    keepComments: boolean
  ): string {
    let prompt = `Language: ${language}\n`;
    prompt += `Optimization Goals: ${goals.join(', ')}\n`;
    prompt += `Keep Comments: ${keepComments ? 'Yes' : 'No'}\n\n`;
    prompt += `Original Code:\n\`\`\`${language}\n${code}\n\`\`\`\n\n`;
    prompt += `Please optimize the code. Provide:\n`;
    prompt += `1. The optimized code\n`;
    prompt += `2. A brief explanation of the changes made\n\n`;
    prompt += `Format your response as:\n`;
    prompt += `OPTIMIZED_CODE:\n\`\`\`${language}\n[optimized code here]\n\`\`\`\n\n`;
    prompt += `EXPLANATION:\n[explanation here]`;

    return prompt;
  }

  /**
   * 解析响应
   */
  private parseResponse(content: string): { optimizedCode: string; explanation: string } {
    const optimizedCodeMatch = content.match(/OPTIMIZED_CODE:\n```(?:\w+)?\n([\s\S]*?)\n```/);
    const explanationMatch = content.match(/EXPLANATION:\n([\s\S]*)/);

    return {
      optimizedCode: optimizedCodeMatch?.[1]?.trim() || '',
      explanation: explanationMatch?.[1]?.trim() || '',
    };
  }
}

export const codeOptimizer = new CodeOptimizer();
```

### 4. 代码解释器

```typescript
// src/ai/code/CodeExplainer.ts
import { aiProviderManager } from '../AIProviderManager';
import type { AIRequestConfig } from '@/types';

export interface CodeExplanationOptions {
  /** 代码语言 */
  language: string;
  /** 代码 */
  code: string;
  /** 解释详细程度 */
  detailLevel?: 'brief' | 'detailed' | 'comprehensive';
  /** 目标受众 */
  audience?: 'beginner' | 'intermediate' | 'expert';
}

export class CodeExplainer {
  /**
   * 解释代码
   */
  async explainCode(options: CodeExplanationOptions): Promise<string> {
    const {
      language,
      code,
      detailLevel = 'detailed',
      audience = 'intermediate',
    } = options;

    const prompt = this.buildPrompt(language, code, detailLevel, audience);

    const config: AIRequestConfig = {
      provider: await aiProviderManager.selectProvider(),
      model: 'gpt-4',
      messages: [
        { role: 'system', content: this.buildSystemPrompt(language) },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
      maxTokens: 2048,
      stream: false,
    };

    const response = await aiProviderManager.request(config);
    return response.content;
  }

  /**
   * 构建系统提示词
   */
  private buildSystemPrompt(language: string): string {
    return `You are an expert ${language} programmer and educator. Explain code clearly and accurately.`;
  }

  /**
   * 构建提示词
   */
  private buildPrompt(
    language: string,
    code: string,
    detailLevel: string,
    audience: string
  ): string {
    let prompt = `Language: ${language}\n`;
    prompt += `Detail Level: ${detailLevel}\n`;
    prompt += `Target Audience: ${audience}\n\n`;
    prompt += `Code:\n\`\`\`${language}\n${code}\n\`\`\`\n\n`;
    prompt += `Please explain this code. Include:\n`;
    prompt += `- Overall purpose and functionality\n`;
    prompt += `- Key components and their roles\n`;
    prompt += `- How the code works\n`;
    prompt += `- Any important patterns or techniques used\n`;
    prompt += `- Potential improvements or issues (if any)`;

    return prompt;
  }
}

export const codeExplainer = new CodeExplainer();
```

---

## ✅ 验收标准

### 功能完整性

- ✅ 代码生成功能正常
- ✅ 代码补全功能完善
- ✅ 代码优化功能准确
- ✅ 代码解释功能清晰
- ✅ 流式输出支持

### 代码质量

- ✅ 代码结构清晰
- ✅ 类型定义完整
- ✅ 注释文档完整
- ✅ 代码可维护性好
- ✅ 测试覆盖充分

---

## 🔄 版本历史

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|----------|------|
| v1.0.0 | 2026-03-14 | 初始版本，建立智能代码生成功能 | YanYuCloudCube Team |

---

## 📞 联系方式

- **维护团队**: YanYuCloudCube Team
- **联系邮箱**: admin@0379.email
- **项目地址**: https://github.com/YYC-Cube/

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for Future***」
> 「***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***」

</div>
