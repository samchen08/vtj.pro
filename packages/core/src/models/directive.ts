import type {
  NodeDirective,
  JSExpression,
  NodeModifiers,
  NodeDirectiveIterator
} from '../protocols';
import { uid } from '@vtj/base';

export class DirectiveModel {
  /**
   * 标识
   */
  public readonly id: string;
  /**
   * 指令名称
   */
  public name: string = '';
  /**
   * 参数
   */
  public arg?: string | JSExpression;
  /**
   * 修饰符
   */
  public modifiers?: NodeModifiers;
  /**
   * 指令值
   */
  public value?: JSExpression;
  /**
   *  v-for 迭代器
   */
  public iterator?: NodeDirectiveIterator;

  constructor(private schema: NodeDirective) {
    this.id = schema.id || uid();
    this.update(schema);
  }
  update(schema: NodeDirective) {
    Object.assign(this.schema, schema);
    const { name, arg, modifiers, value, iterator } = this.schema;
    this.name = name;
    this.arg = arg;
    this.modifiers = modifiers;
    this.value = value;
    this.iterator = iterator;
  }
  static parse(directives: NodeDirective[] = []) {
    return directives.map((value) => new DirectiveModel(value));
  }
  static toDsl(directives: DirectiveModel[] = []): NodeDirective[] {
    return directives.map((directive) => {
      const { name, arg, modifiers, value, iterator, id } = directive;
      return {
        id,
        name,
        arg,
        modifiers,
        value,
        iterator
      };
    });
  }
}
