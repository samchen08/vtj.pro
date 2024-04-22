import { DefineComponent, Ref, ComponentOptionsMixin, ExtractPropTypes, PublicProps } from 'vue';
declare const _default: __VLS_WithTemplateSlots< DefineComponent<{
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
}, {
    click: () => void;
    submit: () => void;
    data: Ref<any>;
    change: (params: any) => void;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    click: (props: Readonly<Partial< ExtractPropTypes<{
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
    }>>>) => void;
    submit: (props: Readonly<Partial< ExtractPropTypes<{
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
    }>>>) => void;
    change: (data: any) => void;
    "update:modelValue": (value?: string | undefined) => void;
    "update:syncProp": (value?: string | undefined) => void;
}, string, PublicProps, Readonly< ExtractPropTypes<{
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
}>> & {
    onClick?: ((props: Readonly<Partial< ExtractPropTypes<{
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
    }>>>) => any) | undefined;
    onSubmit?: ((props: Readonly<Partial< ExtractPropTypes<{
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
    }>>>) => any) | undefined;
    onChange?: ((data: any) => any) | undefined;
    "onUpdate:modelValue"?: ((value?: string | undefined) => any) | undefined;
    "onUpdate:syncProp"?: ((value?: string | undefined) => any) | undefined;
}, {
    booleanProp: boolean;
}, {}>, {
    default?(_: {
        props: {
            readonly booleanProp: boolean;
            readonly stringProp?: string | undefined;
            readonly numberProp?: number | undefined;
            readonly selectProp?: string | undefined;
            readonly objectProp?: Record<string, any> | undefined;
            readonly arrayProp?: unknown[] | undefined;
            readonly iconProp?: string | undefined;
            readonly colorProp?: string | undefined;
            readonly modelValue?: string | undefined;
            readonly syncProp?: string | undefined;
        };
        data: any;
    }): any;
    extra?(_: {
        props: {
            readonly booleanProp: boolean;
            readonly stringProp?: string | undefined;
            readonly numberProp?: number | undefined;
            readonly selectProp?: string | undefined;
            readonly objectProp?: Record<string, any> | undefined;
            readonly arrayProp?: unknown[] | undefined;
            readonly iconProp?: string | undefined;
            readonly colorProp?: string | undefined;
            readonly modelValue?: string | undefined;
            readonly syncProp?: string | undefined;
        };
        data: any;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
