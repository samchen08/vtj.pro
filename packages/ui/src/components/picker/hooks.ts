import { computed, ref, watch, toRaw } from 'vue';
import { toArray, isEqual } from '@vtj/utils';
import type { Emits } from '../shared';
import type {
  PickerProps,
  PickerEmits,
  PickerColumns,
  PickerOption
} from './types';

export function useOptions(props: PickerProps, emit: Emits<PickerEmits>) {
  const { multiple, raw, valueKey = 'value', labelKey = 'label' } = props;
  const current = ref();
  const options = ref<PickerOption[]>([]);

  const setOptions = (rows: any, append?: boolean) => {
    const array = toArray(rows).map((row) => {
      return {
        label: row[labelKey],
        value: row[valueKey] ?? JSON.stringify(row)
      };
    });
    options.value = append ? [...options.value, ...array] : array;
    if (multiple) {
      current.value = options.value.map((n) => n.value);
    } else {
      current.value = options.value[0]?.value;
    }
  };

  const getRawData = (values: any) => {
    const rawData = options.value.map((n) => {
      const data = toRaw(n);
      return {
        [labelKey]: data.label,
        [valueKey]: data.value
      };
    });
    if (Array.isArray(values)) {
      return values.map((v: any) => {
        return rawData.find((n) => n[valueKey] === v);
      });
    } else {
      rawData.find((n) => n[valueKey] === values);
    }
    return rawData;
  };

  watch(
    () => props.modelValue,
    (v) => {
      if (raw && v && typeof v === 'object') {
        setOptions(v);
      } else {
        current.value = multiple ? toArray(v) : v;
      }
    },
    {
      immediate: true
    }
  );

  watch(current, (v, o) => {
    if (!isEqual(v, o)) {
      const data = raw ? getRawData(v) : v;
      emit('update:modelValue', data);
      emit('change', data);
    }
  });

  return {
    current,
    options,
    setOptions
  };
}

export function useGridColumns(props: PickerProps) {
  const { multiple, columns = [] } = props;
  return computed(() => {
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
