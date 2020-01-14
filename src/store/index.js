import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user"
import persist from "./plugins/user"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user
  },
  strict: true,
  // plugins: [persist]
});
