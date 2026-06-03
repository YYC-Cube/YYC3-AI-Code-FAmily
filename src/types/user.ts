/**
 * @file src/types/user.ts
 * @description 用户与认证相关类型定义
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags types,user,auth
 */

/** 用户角色 */
export type UserRole = 'admin' | 'user' | 'guest';

/** 用户状态 */
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'deleted';

/** 用户接口 */
export interface User {
  /** 用户 ID */
  id: string;
  /** 用户名 */
  username: string;
  /** 邮箱 */
  email: string;
  /** 头像 URL */
  avatar?: string;
  /** 角色 */
  role: UserRole;
  /** 状态 */
  status: UserStatus;
  /** 创建时间 */
  createdAt: number;
  /** 更新时间 */
  updatedAt: number;
  /** 最后登录时间 */
  lastLoginAt?: number;
}

/** 用户认证信息 */
export interface AuthUser extends User {
  /** 访问令牌 */
  accessToken: string;
  /** 刷新令牌 */
  refreshToken: string;
  /** 令牌过期时间 */
  tokenExpiresAt: number;
}