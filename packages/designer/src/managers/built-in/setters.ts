import { setters } from '../../components/setters';
import { type Setter } from '../../framework';

export const defaultSetter: Setter = {
  name: 'StringSetter',
  component: setters.StringSetter,
  type: 'String'
};

export const builtInSetters: Array<Setter> = [
  {
    name: 'InputSetter',
    component: setters.StringSetter,
    type: 'String'
  },
  {
    name: 'StringSetter',
    component: setters.StringSetter,
    type: 'String'
  },
  {
    name: 'BooleanSetter',
    component: setters.BooleanSetter,
    type: 'Boolean'
  },
  {
    name: 'ExpressionSetter',
    component: setters.ExpressionSetter,
    type: 'Object'
  },
  {
    name: 'SelectSetter',
    component: setters.SelectSetter,
    type: 'String'
  },
  {
    name: 'NumberSetter',
    component: setters.NumberSetter,
    type: 'Number'
  },
  {
    name: 'ColorSetter',
    component: setters.ColorSetter,
    type: 'String'
  },
  {
    name: 'IconSetter',
    component: setters.IconSetter,
    type: 'String'
  },
  {
    name: 'ObjectSetter',
    component: setters.JsonSetter,
    type: 'Object',
    props: {
      type: 'Object'
    }
  },
  {
    name: 'ArraySetter',
    component: setters.JsonSetter,
    type: 'Array',
    props: {
      type: 'Array'
    }
  },
  {
    name: 'JsonSetter',
    component: setters.JsonSetter,
    type: 'Object',
    props: {
      type: 'JSON'
    }
  },
  {
    name: 'JSONSetter',
    component: setters.JsonSetter,
    type: 'Object',
    props: {
      type: 'JSON'
    }
  },
  {
    name: 'FunctionSetter',
    component: setters.FunctionSetter,
    type: 'Function'
  }
];
