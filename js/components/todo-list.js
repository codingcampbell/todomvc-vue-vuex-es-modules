const { mapState, mapGetters, mapMutations } = Vuex;

export default Vue.extend({
  template: '#template-todo-list',

  data: () => ({
    editId: -1,
  }),

  computed: {
    ...mapState(['todos']),
    ...mapGetters(['visibleTodos', 'activeTodos', 'completeTodos']),
  },

  methods: {
    ...mapMutations(['editTodo', 'editAllTodos', 'removeTodo']),

    deleteTodo(e) {
      this.removeTodo(e.target.dataset.id);
    },

    cancelEdit() {
      this.editId = -1;
    },

    saveEdit() {
      const id = this.editId;
      this.editId = -1;

      const editField = document.getElementById(`edit-todo-${id}`);
      if (!editField) {
        return;
      }

      const text = editField.value.trim();
      if (!text.length) {
        this.removeTodo(id);
      } else {
        this.editTodo({ id, text: editField.value });
      }
    },

    toggleEdit(e) {
      this.editId = e.target.dataset.id;
      Vue.nextTick(() => document.getElementById(`edit-todo-${this.editId}`).focus());
    },

    toggleAll(e) {
      this.editAllTodos({ complete: e.target.checked });
    },

    toggleComplete(e) {
      this.editTodo({ id: e.target.dataset.id, complete: e.target.checked });
    },
  },
});
