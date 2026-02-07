// import type { Engine } from './engine';
/**
 * 工具参数类型定义
 */
export type ToolParameterType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array';

/**
 * 工具参数定义
 */
export interface ToolParameter {
  /**
   * 参数名称
   */
  name: string;
  /**
   * 参数类型
   */
  type: ToolParameterType;
  /**
   * 参数描述
   */
  description?: string;
  /**
   * 是否必需
   */
  required?: boolean;
  /**
   * 枚举值（仅适用于string类型）
   */
  enum?: string[];
  /**
   * 对象属性定义（仅在type为'object'时使用）
   */
  properties?: Record<string, Omit<ToolParameter, 'name'>>;
  /**
   * 数组元素类型定义（仅在type为'array'时使用）
   */
  items?: Omit<ToolParameter, 'name'>;
}

/**
 * 工具定义接口
 */
export interface Tool {
  /**
   * 工具名称（唯一标识）
   */
  name: string;
  /**
   * 工具描述，供大模型理解用途
   */
  description: string;
  /**
   * 工具参数定义
   */
  parameters: ToolParameter[];
  /**
   * 工具异步执行函数
   */
  handler: (...args: any[]) => Promise<any>;
}

/**
 * 工具描述（用于大模型调用）
 */
export interface ToolDescription {
  name: string;
  description: string;
  parameters: ToolParameter[];
}

/**
 * 工具注册器类，提供工具注册、查找、执行和描述生成功能
 */
export class ToolRegistry {
  /**
   * 工具存储
   */
  private tools: Record<string, Tool> = {};

  constructor() {}

  /**
   * 注册一个工具
   * @param tool 工具定义
   */
  register(tool: Tool): void {
    if (this.tools[tool.name]) {
      console.warn(
        `Tool '${tool.name}' already exists and will be overwritten`
      );
    }
    this.tools[tool.name] = tool;
  }

  /**
   * 根据名称获取工具
   * @param name 工具名称
   * @returns 工具定义或undefined
   */
  get(name: string): Tool | undefined {
    return this.tools[name];
  }

  /**
   * 修改工具配置
   * @param name 工具名称
   * @param tool 工具部分配置
   */
  set(name: string, tool: Partial<Tool>): void {
    const match = this.tools[name];
    if (!match) {
      console.warn(`Tool '${name}' is not found`);
      return;
    }
    Object.assign(match, tool);
  }

  /**
   * 注销工具
   * @param name 工具名称
   */
  unregister(name: string): void {
    delete this.tools[name];
  }

  /**
   * 获取所有工具
   * @returns 所有已注册的工具数组
   */
  getAll(): Tool[] {
    return Object.values(this.tools);
  }

  /**
   * 检查工具是否存在且可执行
   * @param name 工具名称
   * @returns 是否存在
   */
  has(name: string): boolean {
    return !!this.tools[name];
  }

  /**
   * 异步执行工具
   * @param name 工具名称
   * @param args 参数数组
   * @returns 工具执行结果
   * @throws 当工具不存在或执行出错时抛出异常
   */
  async execute(name: string, args: any[] = []): Promise<any> {
    const tool = this.tools[name];
    if (!tool) {
      throw new Error(`Tool '${name}' not found`);
    }

    try {
      return await tool.handler(...args);
    } catch (error) {
      console.error(`Error executing tool '${name}':`, error);
      throw new Error(
        `Failed to execute tool '${name}': ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * 生成工具描述列表，供大模型使用
   * @returns 工具描述数组
   */
  generateToolDescriptions(): ToolDescription[] {
    // 递归处理参数，确保嵌套结构被正确包含
    const processParameter = (param: ToolParameter): ToolParameter => {
      const result: ToolParameter = {
        name: param.name,
        type: param.type,
        ...(param.description && { description: param.description }),
        ...(param.required !== undefined && { required: param.required }),
        ...(param.enum && { enum: param.enum })
      };

      // 处理对象属性
      if (param.type === 'object' && param.properties) {
        const processedProperties: Record<
          string,
          Omit<ToolParameter, 'name'>
        > = {};
        for (const [propName, propDef] of Object.entries(param.properties)) {
          // 为属性添加名称并递归处理
          const processedProp = processParameter({
            name: propName,
            ...propDef
          });
          // 移除name字段，因为属性名已作为键
          const { name, ...rest } = processedProp;
          processedProperties[propName] = rest;
        }
        result.properties = processedProperties;
      }

      // 处理数组元素类型
      if (param.type === 'array' && param.items) {
        const processedItem = processParameter({
          name: 'item',
          ...param.items
        });
        const { name, ...rest } = processedItem;
        result.items = rest;
      }

      return result;
    };

    return Object.values(this.tools).map((tool) => ({
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters.map(processParameter)
    }));
  }

  /**
   * 清除所有工具
   */
  clear(): void {
    this.tools = {};
  }
}
