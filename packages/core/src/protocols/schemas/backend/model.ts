/**
 * 可持久化的 JSON 值。与现有 JSONValue 不同，不包含 undefined。
 * 有限数字、对象深度等约束仍须由服务端验证。
 */
export type BackendJSONValue =
  | string
  | number
  | boolean
  | null
  | BackendJSONValue[]
  | { [key: string]: BackendJSONValue };

/** 模型对外开放的 CRUD 操作。未声明的操作不可调用。 */
export type BackendOperation = 'list' | 'get' | 'create' | 'update' | 'delete';

/** 字段公共信息，不包含数据库物理映射。 */
interface BackendFieldBase {
  /** 模型内唯一、不可变的逻辑标识。 */
  id: string;
  /** 模型内唯一的逻辑名称；应用到数据库后不可修改。 */
  name: string;
  /** 展示标题。省略时由消费者使用 name。 */
  label?: string;
  /** 创建时是否必须提供值；缺失时先应用 default。默认 false。 */
  required?: boolean;
}

/**
 * nullable 默认 false；显式 null 默认值必须声明 nullable: true。
 * required/default/nullable 的组合及默认值范围由服务端验证。
 * PATCH 中字段缺失表示不修改，不触发默认值。
 */
type BackendFieldDefault<T> =
  | { nullable?: false; default?: T }
  | { nullable: true; default?: T | null };

export type BackendStringFieldSchema = BackendFieldBase &
  BackendFieldDefault<string> & {
    type: 'string';
    maxLength: number;
    minLength?: number;
  };

export type BackendTextFieldSchema = BackendFieldBase &
  BackendFieldDefault<string> & {
    type: 'text';
    maxLength?: number;
  };

export type BackendIntegerFieldSchema = BackendFieldBase &
  BackendFieldDefault<number> & {
    type: 'integer';
    /** 首期为有符号 INT，运行时拒绝浮点数和隐式转换。 */
    minimum?: number;
    maximum?: number;
  };

export type BackendDecimalFieldSchema = BackendFieldBase &
  BackendFieldDefault<string> & {
    type: 'decimal';
    precision: number;
    scale: number;
    /** 十进制字符串，禁止指数形式与隐式舍入。 */
    minimum?: string;
    maximum?: string;
  };

export type BackendBooleanFieldSchema = BackendFieldBase &
  BackendFieldDefault<boolean> & {
    type: 'boolean';
  };

export type BackendDateFieldSchema = BackendFieldBase &
  BackendFieldDefault<string> & {
    /** YYYY-MM-DD，真实日期合法性由服务端验证。 */
    type: 'date';
  };

export type BackendDatetimeFieldSchema = BackendFieldBase &
  BackendFieldDefault<string> & {
    /** 带时区的 ISO 输入，统一使用 UTC。 */
    type: 'datetime';
  };

export type BackendEnumFieldSchema = BackendFieldBase &
  BackendFieldDefault<string> & {
    type: 'enum';
    /** 非空、无重复字符串集合，default 必须属于该集合。 */
    values: string[];
  };

export type BackendJsonFieldSchema = BackendFieldBase &
  BackendFieldDefault<Exclude<BackendJSONValue, null>> & {
    type: 'json';
  };

export type BackendReferenceFieldSchema = BackendFieldBase & {
  type: 'reference';
  nullable?: boolean;
  /** 同应用目标模型的 id，引用其系统主键。不支持级联写入。 */
  targetModelId: string;
  /** 首期不允许引用字段声明默认值。 */
  default?: never;
};

/** 以 type 区分字段属性；不支持代码、SQL 或表达式类型。 */
export type BackendFieldSchema =
  | BackendStringFieldSchema
  | BackendTextFieldSchema
  | BackendIntegerFieldSchema
  | BackendDecimalFieldSchema
  | BackendBooleanFieldSchema
  | BackendDateFieldSchema
  | BackendDatetimeFieldSchema
  | BackendEnumFieldSchema
  | BackendJsonFieldSchema
  | BackendReferenceFieldSchema;

export interface BackendIndexSchema {
  /** 模型内唯一标识。 */
  id: string;
  /** 有序的字段 id 列表，不是字段名或 SQL 列名。 */
  fields: string[];
  /** 默认 false。nullable 字段的唯一约束允许多个 NULL。 */
  unique?: boolean;
}

/**
 * 正向授权策略。无匹配策略时拒绝；不能突破模型 operations。
 * 首期同一操作的策略字段集合须一致，由服务端校验。
 */
export interface BackendPolicySchema {
  role: string;
  actions: BackendOperation[];
  /** owner 由服务端注入的 createdBy 判定。 */
  scope: 'all' | 'owner';
  /** 可读取的自定义字段 id。系统字段投影由运行时控制。 */
  readFields: string[];
  /** 可写入的自定义字段 id，不包含系统字段。 */
  writeFields: string[];
}

export interface BackendModelSchema {
  /** 应用内唯一、不可变的模型逻辑标识。 */
  id: string;
  /** 应用内唯一逻辑名称，应用到数据库后不可修改。 */
  name: string;
  label: string;
  /** 系统字段由运行时维护，不在此声明。 */
  fields: BackendFieldSchema[];
  indexes?: BackendIndexSchema[];
  operations: BackendOperation[];
  policies: BackendPolicySchema[];
}
