export const test_27 = `
<template>
  <XMenu
    :data="[]"
    mode="horizontal"
    :ellipsis="false"
    @select="select_97wvz2gj"></XMenu>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { XMenu } from '@vtj/ui';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Menu',
    components: { XMenu },
    setup(props) {
      const provider = useProvider({ id: '17vvawza', version: '1752886898236' });
      const state = reactive({});
      return { state, props, provider };
    },
    methods: {
      async getUser(...args) {
        // DataSource: eyJyZWYiOiI0N2x0eWI1biIsIm5hbWUiOiJnZXRVc2VyIiwidGVzdCI6eyJ0eXBlIjoiSlNGdW5jdGlvbiIsInZhbHVlIjoiKCkgPT5cbiAgdGhpcy5ydW5BcGkoe1xuICAgIC8qIOWcqOi/memHjOWPr+i+k+WFpeaOpeWPo+WPguaVsCAgKi9cbiAgfSkifSwidHlwZSI6ImFwaSIsImxhYmVsIjoi6I635Y+W55So5oi35L+h5oGvIiwidHJhbnNmb3JtIjp7InR5cGUiOiJKU0Z1bmN0aW9uIiwidmFsdWUiOiIocmVzKSA9PiB7XG4gIHJldHVybiByZXM7XG59In0sIm1vY2tUZW1wbGF0ZSI6eyJ0eXBlIjoiSlNGdW5jdGlvbiIsInZhbHVlIjoiKHJlcSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGNvZGU6IDAsXG4gICAgZGF0YToge1xuICAgICAgdGl0bGU6ICdAY3RpdGxlJ1xuICAgIH1cbiAgfTtcbn0ifX0=
        return await this.provider.apis['47ltyb5n']
          .apply(this, args)
          .then((res) => {
            return res;
          });
      },
      select_97wvz2gj(item) {
        console.log('selected', item);
      }
    }
  })
</script>
<style lang="css" scoped>
  .XMenu_97wvz2gj {
    margin-top: 10px;
  }
</style>

`;
