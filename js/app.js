import store, { FilterType } from './store.js';
import HeaderView from './components/header.js';
import TodoList from './components/todo-list.js';
import FooterView from './components/footer.js';

const { mapState, mapMutations } = Vuex;

new Vue({
  el: '#app',

  store,

  components: {
    HeaderView,
    TodoList,
    FooterView,
  },

  computed: {
    ...mapState(['todos', 'filter']),
  },

  methods: {
    ...mapMutations(['setFilter']),

    decodeRouteToFilter() {
      const route = window.location.hash.replace(/^#/, '');
      if (route === '/active') {
        return FilterType.ACTIVE;
      }

      if (route === '/completed') {
        return FilterType.COMPLETE;
      }

      return FilterType.ALL;
    },
  },

  watch: {
    filter(value) {
      if (value === this.decodeRouteToFilter()) {
        return;
      }

      if (value === FilterType.ACTIVE) {
        location.hash = '/active';
      } else if (value === FilterType.COMPLETE) {
        location.hash = '/completed';
      } else {
        // Simply setting `location.hash = ''` does not remove the `#` character :|
        window.history.pushState({}, '', window.location.pathname + window.location.search);
      }
    }
  },

  mounted() {
    this.setFilter(this.decodeRouteToFilter());

    window.addEventListener('hashchange', () => {
      const filter = this.decodeRouteToFilter();
      if (filter !== this.filter) {
        this.setFilter(filter);
      }
    });
  },
});
