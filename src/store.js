import Vue from 'vue'
import Vuex from 'vuex'
import fcmStore from "@/share_route/context/store/fcmStore";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    fcmStore
  }
})
