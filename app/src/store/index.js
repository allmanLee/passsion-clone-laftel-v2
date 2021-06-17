import { createStore } from "vuex";
import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getter.js";

export default createStore({
  state: {
    registerObject: [],
  },
  mutations,
  actions,
  getters,
});
