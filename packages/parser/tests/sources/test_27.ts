export const test_27 = `
<template>
  <div class="container">
    <div class="row">
      <IndexComp id="bca6658afa69dba91905213e341486e6" src="http://192.168.1.8:30100/jcomponent/bComponent?regid=bca6658afa69dba91905213e341486e6&bo=EB-1" style="width: 100%; height: 601px;"></IndexComp>
      <IndexComp id="f9a84987e172f798882c51826d6f4311" src="http://192.168.1.8:30100/jcomponent/bComponent?regid=f9a84987e172f798882c51826d6f4311&bo=EB-1" style="width: 100%; height: 601px;"></IndexComp>
    </div>
    <div class="row">
      <IndexComp id="5b8461f60e66326e1c1b3dfb0de5bd8b" src="http://192.168.1.8:30100/jcomponent/bComponent?regid=5b8461f60e66326e1c1b3dfb0de5bd8b&bo=EB-1" style="width: 100%; height: 450px;"></IndexComp>
      <IndexComp id="06dca7b081fa74fb6ad20c194084fbaf" src="http://192.168.1.8:30100/jcomponent/bComponent?regid=06dca7b081fa74fb6ad20c194084fbaf&bo=EB-1" style="width: 100%; height: 450px;"></IndexComp>
    </div>
    <div class="row">
      <IndexComp id="5d6675d332e6de4d1354f26fe5caa479" src="http://192.168.1.8:30100/jcomponent/bComponent?regid=5d6675d332e6de4d1354f26fe5caa479&bo=EB-1" style="width: 100%; height: 601px;"></IndexComp>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useProvider } from '@vtj/renderer';

export default defineComponent({
  name: 'SingleWellProduction',
  setup(props) {
    const provider = useProvider({ id: 'singleWellProductionId', version: '' });
    const state = reactive({});
    return { state, props, provider };
  }
});
</script>

<style lang="css" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(180deg, #0c2461, #4a69bd);
  color: white;
}

.row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }

  .container {
    padding: 10px;
  }
}
</style>
`;
