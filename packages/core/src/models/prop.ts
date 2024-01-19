import type {
  JSONValue,
  JSExpression,
  JSFunction,
  NodeProps
} from '../protocols';

export class PropModel {
  /**
   * 标识是否设置了值， 设置的值与默认值一致，表示未设置，在转换成dsl时会排查该属性
   */
  isUnset: boolean = false;
  constructor(
    public name: string,
    public value?: JSONValue | JSExpression | JSFunction,
    public defaultValue?: JSONValue | JSExpression | JSFunction
  ) {
    this.setValue(value);
  }
  setValue(value: JSONValue | JSExpression | JSFunction) {
    this.value = value;
    this.isUnset = this.value === this.defaultValue;
  }
  getValue() {
    return this.value ?? this.defaultValue;
  }
  static toDsl(props: Record<string, PropModel> = {}): NodeProps {
    return Object.entries(props).reduce((result, [name, prop]) => {
      if (!prop.isUnset) {
        result[name] = prop.getValue();
      }
      return result;
    }, {} as NodeProps);
  }

  static parse(props: NodeProps = {}): Record<string, PropModel> {
    return Object.entries(props).reduce((result, [name, value]) => {
      // todo: 处理默认值 defaultValue
      result[name] = new PropModel(name, value);
      return result;
    }, {} as Record<string, PropModel>);
  }
}
