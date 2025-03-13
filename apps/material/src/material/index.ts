import type { Material, MaterialCategory } from '@vtj/core';
import { setPackageName } from '../shared';
import { name, version, material, label } from '../../vtj.config';
import { descriptions } from './description';

const categories: MaterialCategory[] = [
  {
    id: 'base',
    category: '基础'
  }
];

export default {
  name,
  version,
  label,
  library: material,
  order: 0,
  categories,
  components: setPackageName(descriptions, name)
} as Material;
