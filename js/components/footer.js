import { FilterType } from '../store.js';

const { mapState, mapGetters, mapMutations } = Vuex;

export default Vue.extend({
  template: '#template-footer',

  computed: {
    ...mapState(['todos', 'filter']),
    ...mapGetters(['activeTodos', 'completeTodos']),

    // This silly-looking mapping is to make "FilterType" visible in the template
    // (and keep it read-only)
    FilterType: () => FilterType,
  },

  methods: {
    ...mapMutations(['removeCompleteTodos']),

    clearComplete() {
      this.removeCompleteTodos();
    },
  }
});
