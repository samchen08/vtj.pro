import { ExtractPropTypes } from 'vue';

export type ComponentPropsType<T> = Readonly<Partial<ExtractPropTypes<T>>>;
export declare const exampleProps: {
    stringProp: {
        type: StringConstructor;
    };
    booleanProp: {
        type: BooleanConstructor;
    };
    numberProp: {
        type: NumberConstructor;
    };
    selectProp: {
        type: StringConstructor;
    };
    objectProp: {
        type: ObjectConstructor;
    };
    arrayProp: {
        type: ArrayConstructor;
    };
    iconProp: {
        type: StringConstructor;
    };
    colorProp: {
        type: StringConstructor;
    };
    modelValue: {
        type: StringConstructor;
    };
    syncProp: {
        type: StringConstructor;
    };
};
export type ExamplePropsProps = ComponentPropsType<typeof exampleProps>;
export type ExampleEmits = {
    click: [props: ExamplePropsProps];
    submit: [props: ExamplePropsProps];
    change: [data: any];
    'update:modelValue': [value?: string];
    'update:syncProp': [value?: string];
};
