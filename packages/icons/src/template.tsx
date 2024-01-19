import { defineComponent, type PropType } from 'vue';

export const __name__ =  defineComponent({
  name: '__name__',
  props: {
    colors: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  setup(props) {
    return () => {
      const paths: any[] = ['__paths__'];
       return (
        <svg viewBox='0 0 1024 1024' width='1em' height="1em">
          {
             paths.map((n: { path: string }, i: number) => {
               return <path d={n.path} fill={props.colors[i] ?? 'currentColor'} />
             })
          }
        </svg>
       ) 
    };
  }
});
