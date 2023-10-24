import Icon from './ui/Icon';
import Container from './ui/Container';
import Header from './ui/Header';
import Action from './ui/Action';
import Panel from './ui/Panel';
import Dialog from './ui/Dialog';
import Form from './ui/Form';
import Field from './ui/Field';
import DialogForm from './ui/DialogForm';
import Tabs from './ui/Tabs';
import DataItem from './ui/DataItem';
import Chart from './ui/Chart';

import { AssetsCategory } from '@vtj/engine';
const categories: AssetsCategory[] = [
  {
    id: 'base',
    category: '元件'
  },
  {
    id: 'form',
    category: '表单'
  }
];
const components = [
  Icon,
  Container,
  Header,
  Action,
  Panel,
  Dialog,
  Form,
  Field,
  DialogForm,
  Tabs,
  DataItem,
  Chart
];
export default {
  name: 'vtj-ui',
  label: 'UI',
  categories,
  components,
  order: 0
};
