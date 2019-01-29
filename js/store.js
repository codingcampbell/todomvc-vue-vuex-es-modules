const storageKey = 'todomvc-vue-data';

const generateID = () => String(Math.random()).slice(2);

const saveToStorage = store => {
  store.subscribe((_, state) => {
    localStorage.setItem(storageKey, JSON.stringify({ todos: state.todos }));
  });
};

const loadFromStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem(storageKey));
    return data.todos || [];
  } catch (err) {
    return [];
  }
};

export const FilterType = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETE: 'complete',
};

export default new Vuex.Store({
  state: {
    filter: FilterType.ALL,
    todos: loadFromStorage(),
  },

  plugins: [saveToStorage],

  getters: {
    activeTodos: ({ todos }) => todos.filter(t => !t.complete),

    completeTodos: ({ todos }) => todos.filter(t => t.complete),

    visibleTodos: ({ filter, todos }) => todos.filter(t => {
      if (filter === FilterType.ACTIVE) {
        return !t.complete;
      }

      if (filter === FilterType.COMPLETE) {
        return t.complete;
      }

      return true;
    }),
  },

  mutations: {
    addTodo: ({ todos }, text) => todos.push({
      id: generateID(),
      complete: false,
      text,
    }),

    editTodo: ({ todos }, todo = {}) => {
      const t = todos.find(t => t.id === todo.id);
      if (t) {
        Object.assign(t, todo);
      }
    },

    editAllTodos: ({ todos }, todo = {}) => todos.forEach(t => Object.assign(t, todo)),

    removeTodo: ({ todos }, todoId) => {
      const index = todos.findIndex(t => t.id === todoId);
      if (index === -1) {
        return;
      }

      todos.splice(index, 1);
    },

    removeCompleteTodos: state => {
      state.todos = state.todos.filter(t => !t.complete);
    },

    setFilter: (state, filterType) => {
      state.filter = filterType;
    },
  },
});
