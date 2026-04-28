export const test_2 = {
  id: '123',
  name: 'Test',
  nodes: [
    {
      name: 'div',
      children: [
        {
          name: 'button',
          children: {
            type: 'JSExpression',
            value: '`按钮_${this.context.item}`'
          },
          events: {
            click: {
              name: 'click',
              handler: {
                type: 'JSFunction',
                value:
                  '() => this.say(this.context.item, this.context.index, $event)'
              }
            }
          },
          directives: [
            {
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value: '3'
              }
            }
          ]
        }
      ]
    }
  ],
  methods: {
    say: {
      type: 'JSFunction',
      value: '(a, i, e)=>{ console.log(a,i, e)}'
    }
  }
};
