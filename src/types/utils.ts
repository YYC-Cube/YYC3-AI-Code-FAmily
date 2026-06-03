/**
 * @file src/types/utils.ts
 * @description 通用工具类型定义 — 深度可选、深度只读、类型转换等
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags types,utils,utility
 */

/** 可选的键 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** 必需的键 */
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** 深度可选 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** 深度只读 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/** 联合转交叉 */
export type UnionToIntersection<U> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

/** 元组转联合 */
export type TupleToUnion<T extends unknown[]> = T[number];

/** 非空值类型 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/** 异步返回类型 */
export type PromiseType<T extends Promise<unknown>> = T extends Promise<infer U> ? U : never;