/**
 * file: encryption.test.ts
 * description: encryption.ts 单元测试 — AES-GCM 加密/解密、密码生成、边界条件
 * author: YanYuCloudCube Team <admin@0379.email>
 * version: v1.0.0
 * created: 2026-06-04
 * updated: 2026-06-04
 * status: dev
 * tags: testing,unit,encryption,crypto
 * priority: P0
 */

import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

// Web Crypto API mock — jsdom 不提供 crypto.subtle
let mockEncryptCounter = 0;
let mockRngCounter = 0;
const mockCrypto: Crypto = {
  ...globalThis.crypto,
  subtle: {
    encrypt: vi.fn().mockImplementation(() => {
      mockEncryptCounter++;
      return Promise.resolve(new TextEncoder().encode(`mock-cipher-${mockEncryptCounter}`).buffer);
    }),
    decrypt: vi.fn().mockResolvedValue(new TextEncoder().encode('hello world').buffer),
    importKey: vi.fn().mockResolvedValue({} as CryptoKey),
    deriveKey: vi.fn().mockResolvedValue({} as CryptoKey),
  } as unknown as SubtleCrypto,
  getRandomValues: vi.fn((arr: Uint8Array) => {
    mockRngCounter++;
    for (let i = 0; i < arr.length; i++) arr[i] = (i + mockRngCounter) % 256;
    return arr;
  }) as unknown as Crypto['getRandomValues'],
};

describe('encryption.ts — 加密/解密服务', () => {
  beforeEach(() => {
    vi.stubGlobal('crypto', mockCrypto);
    vi.clearAllMocks();
    mockEncryptCounter = 0;
    mockRngCounter = 0;
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  /* ── encrypt ── */

  describe('encrypt()', () => {
    it('TC-ENC-001: 应返回 encrypted / salt / iv 三个 Base64 字段', async () => {
      const { encrypt } = await import('../../storage/encryption');
      const result = await encrypt('my secret data', 'password123');
      expect(result).toHaveProperty('encrypted');
      expect(result).toHaveProperty('salt');
      expect(result).toHaveProperty('iv');
      expect(typeof result.encrypted).toBe('string');
      expect(result.encrypted.length).toBeGreaterThan(0);
      expect(result.salt.length).toBeGreaterThan(0);
      expect(result.iv.length).toBeGreaterThan(0);
    });

    it('TC-ENC-002: 不同的输入产生不同的加密结果', async () => {
      const { encrypt } = await import('../../storage/encryption');
      const r1 = await encrypt('data1', 'pass');
      const r2 = await encrypt('data2', 'pass');
      expect(r1.encrypted).not.toBe(r2.encrypted);
    });

    it('TC-ENC-003: 不同密码对相同数据应产生不同 ciphertext', async () => {
      const { encrypt } = await import('../../storage/encryption');
      const r1 = await encrypt('same data', 'pass1');
      const r2 = await encrypt('same data', 'pass2');
      expect(r1.encrypted).not.toBe(r2.encrypted);
    });

    it('TC-ENC-004: 空字符串应正常处理', async () => {
      const { encrypt } = await import('../../storage/encryption');
      const result = await encrypt('', 'pass');
      expect(result.encrypted).toBeTruthy();
    });

    it('TC-ENC-005: 调用 deriveKey 时传入正确的算法参数', async () => {
      const { encrypt } = await import('../../storage/encryption');
      await encrypt('data', 'pass');
      expect(mockCrypto.subtle.importKey).toHaveBeenCalled();
      expect(mockCrypto.subtle.deriveKey).toHaveBeenCalled();
    });
  });

  /* ── decrypt ── */

  describe('decrypt()', () => {
    it('TC-ENC-010: 应正确解密出原始数据', async () => {
      mockCrypto.subtle.decrypt = vi.fn().mockResolvedValue(
        new TextEncoder().encode('原始数据').buffer
      );
      const { decrypt } = await import('../../storage/encryption');
      const result = await decrypt('encryptedBase64', 'pass', 'saltBase64', 'ivBase64');
      expect(result).toBe('原始数据');
    });

    it('TC-ENC-011: 密钥派生参数应使用 AES-GCM 256bit', async () => {
      const { encrypt } = await import('../../storage/encryption');
      await encrypt('test', 'pass');
      const deriveCall = (mockCrypto.subtle.deriveKey as ReturnType<typeof vi.fn>).mock.calls[0];
      expect(deriveCall[2]).toMatchObject({ name: 'AES-GCM', length: 256 });
    });
  });

  /* ── generateRandomPassword ── */

  describe('generateRandomPassword()', () => {
    it('TC-ENC-020: 默认生成长度为 32 的密码', async () => {
      const { generateRandomPassword } = await import('../../storage/encryption');
      const pwd = generateRandomPassword();
      expect(pwd.length).toBe(32);
    });

    it('TC-ENC-021: 可指定密码长度', async () => {
      const { generateRandomPassword } = await import('../../storage/encryption');
      const pwd = generateRandomPassword(16);
      expect(pwd.length).toBe(16);
    });

    it('TC-ENC-022: 密码应只包含预定字符集', async () => {
      const { generateRandomPassword } = await import('../../storage/encryption');
      const pwd = generateRandomPassword();
      expect(pwd).toMatch(/^[A-Za-z0-9!@#$%^&*]+$/);
    });

    it('TC-ENC-023: 多次生成的密码应不同', async () => {
      const { generateRandomPassword } = await import('../../storage/encryption');
      const p1 = generateRandomPassword();
      const p2 = generateRandomPassword();
      expect(p1).not.toBe(p2);
    });
  });
});
