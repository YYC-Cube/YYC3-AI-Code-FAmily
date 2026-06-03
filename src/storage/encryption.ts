/**
 * @file src/storage/encryption.ts
 * @description Web Crypto API 加密/解密服务
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags storage,encryption,crypto
 */

const ENCRYPTION_CONFIG = {
  algorithm: 'AES-GCM' as const,
  keyLength: 256,
  ivLength: 12,
  saltLength: 16,
} as const;

/**
 * 将 Uint8Array 转为 ArrayBuffer（解决 Uint8Array<ArrayBufferLike> 兼容性问题）
 */
function toBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

/**
 * 从密码派生密钥
 */
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: toBuffer(salt),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: ENCRYPTION_CONFIG.keyLength },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * 将 ArrayBuffer 转为 Base64 字符串
 */
function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * 将 Base64 字符串转为 Uint8Array
 */
function base64ToBuffer(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * 加密数据
 * @returns 加密后的数据、盐值、初始化向量（均为 Base64 编码）
 */
export async function encrypt(
  data: string,
  password: string
): Promise<{ encrypted: string; salt: string; iv: string }> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(ENCRYPTION_CONFIG.saltLength));
  const iv = crypto.getRandomValues(new Uint8Array(ENCRYPTION_CONFIG.ivLength));

  const key = await deriveKey(password, salt);

  const encrypted = await crypto.subtle.encrypt(
    { name: ENCRYPTION_CONFIG.algorithm, iv: toBuffer(iv) },
    key,
    encoder.encode(data)
  );

  return {
    encrypted: bufferToBase64(encrypted),
    salt: bufferToBase64(toBuffer(salt)),
    iv: bufferToBase64(toBuffer(iv)),
  };
}

/**
 * 解密数据
 * @param encryptedData 加密后的数据（Base64）
 * @param password 密码
 * @param salt 盐值（Base64）
 * @param iv 初始化向量（Base64）
 * @returns 解密后的原始字符串
 */
export async function decrypt(
  encryptedData: string,
  password: string,
  salt: string,
  iv: string
): Promise<string> {
  const saltArray = base64ToBuffer(salt);
  const ivArray = base64ToBuffer(iv);
  const encryptedArray = base64ToBuffer(encryptedData);

  const key = await deriveKey(password, saltArray);

  const decrypted = await crypto.subtle.decrypt(
    { name: ENCRYPTION_CONFIG.algorithm, iv: toBuffer(ivArray) },
    key,
    toBuffer(encryptedArray)
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

/**
 * 生成随机密码
 */
export function generateRandomPassword(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }

  return password;
}
