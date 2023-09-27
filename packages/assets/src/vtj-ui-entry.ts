import Icon from './ui/Icon';
import Container from './ui/Container';
import Header from './ui/Header';
import Action from './ui/Action';
import Panel from './ui/Panel';

import { AssetsCategory } from '@vtj/engine';
const categories: AssetsCategory[] = [
  {
    id: 'base',
    category: '元件'
  }
];
const components = [Icon, Container, Header, Action, Panel];
export default { name: 'vtj-ui', label: 'UI', categories, components };
