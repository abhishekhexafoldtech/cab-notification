import ShareRouteUc from "@/share_route/use_cases/shareRouteUc";
import ShareRouteRepository from "@/share_route/models/shareRouteRepository";
import ShareRoute from "@/share_route/models/shareRoute";
import notifications from "@/shared/notifications";

const repository = new  ShareRouteRepository()
const uc = new ShareRouteUc(repository)

export default {
  namespaced: true,

  state: {
    loading: true,
    taxi: '',
    service_id: '',
    subscription: null,
    timer: null,
    shareRoute: new ShareRoute()
  },

  mutations: {
    setLoading(state, value) {
      state.loading = value
    },

    setServiceId (state, value) {
      state.service_id = value
    },

    setTaxi (state, value) {
      state.taxi = value
    },

    setTimer (state, value) {
      state.timer = value
    },
    setSubscription(state, value) {
      state.subscription = value;
    },
    setSharedRoute(state, value){
      state.shareRoute = value
    }
  },

  actions: {
      async captureRoute({ state }) {
        try {
          state.timer = setTimeout(function() {
            state.loading = false
            notifications.notify('No existe ruta');
          }, 20000);
          await repository.receivedRoute(state.shareRoute, state.timer)

        } catch (error) {
          throw new Error(error);
        }
      },


    async subscribeToken () {
      try {
         await uc.subscribeToken("token", "topic")

      } catch (error) {
        throw new Error(error)
      }
    },
  }
}
