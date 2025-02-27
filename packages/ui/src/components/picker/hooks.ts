import { computed, ref, watch, toRaw } from 'vue';
import { toArray, isEqual, dedupArray, delay } from '@vtj/utils';
import type { Emits } from '../shared';
import type {
  PickerProps,
  PickerEmits,
  PickerColumns,
  PickerOption
} from './types';

export function useOptions(props: PickerProps, emit: Emits<PickerEmits>) {
  const {
    multiple,
    raw,
    valueKey = 'value',
    labelKey = 'label',
    formatter,
    valueFormatter
  } = props;
  const current = ref();
  const options = ref<PickerOption[]>([]);

  const setOptions = (rows: any, append?: boolean) => {
    const array = toArray(rows)
      .filter((n) => !!n)
      .map((row) => {
        return typeof row === 'object'
          ? {
              label: row[labelKey],
              value: row[valueKey] ?? JSON.stringify(row)
            }
          : {
              label: row,
              value: row
            };
      });
    const values = append ? [...options.value, ...array] : array;
    options.value = dedupArray(values, 'value');
    let val;
    if (multiple) {
      val = options.value.map((n) => n.value);
    } else {
      val = options.value[0]?.value;
    }
    current.value = val;
  };

  const getRawData = (values: any[]) => {
    const rawData = options.value.map((n) => {
      const data = toRaw(n);
      return {
        [labelKey]: data.label,
        [valueKey]: data.value
      };
    });
    if (Array.isArray(values)) {
      return values
        .map((v: any) => {
          return rawData.find((n) => n[valueKey] === v);
        })
        .filter((n) => !!n);
    }
    return rawData;
  };

  watch(
    () => props.modelValue,
    async (v) => {
      const val = formatter ? formatter(v) : v;
      if (val) {
        const rawData = getRawData(val);
        setOptions(rawData.length ? rawData : val);
        if (!props.multiple) {
          await delay(0);
          options.value = [];
        }
      } else {
        setOptions([]);
      }
    },
    {
      immediate: true
    }
  );

  watch(current, (v, o) => {
    if (!isEqual(v, o)) {
      const rawData = getRawData(v);
      const data = raw ? rawData : v;
      const val = valueFormatter ? valueFormatter(data) : data;
      if (multiple && Array.isArray(data)) {
        options.value = options.value.filter((n) => data.includes(n.value));
      }
      emit('update:modelValue', val);
      emit('change', val, props.data);
    }
  });

  return {
    current,
    options,
    setOptions
  };
}

export function useGridColumns(props: PickerProps) {
  return computed(() => {
    const { multiple, columns = [] } = props;
    if (columns.length === 0) return [];
    const presets: PickerColumns = [
      {
        type: multiple ? 'checkbox' : 'radio',
        width: 41,
        fixed: 'left',
        showOverflow: false,
        resizable: false
      },
      {
        type: 'seq',
        title: '序号',
        width: 60,
        fixed: 'left'
      }
    ];
    return presets.concat(columns);
  });
}

export function useModel(props: PickerProps) {
  const formModel = ref<Record<string, any>>({});

  watch(
    () => props.model,
    (model: any) => {
      formModel.value = model || {};
    },
    {
      immediate: true
    }
  );

  return {
    formModel
  };
}
