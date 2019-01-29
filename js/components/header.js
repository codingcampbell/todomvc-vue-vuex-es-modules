const { mapMutations } = Vuex;

export default Vue.extend({
  template: '#template-header',

  data: () => ({
    todoInput: '',
  }),

  methods: {
    ...mapMutations(['addTodo']),

    onSubmit() {
      const todo = this.todoInput.trim();
      this.todoInput = '';

      if (todo.length) {
        this.addTodo(todo);
      }
    },
  },
});
