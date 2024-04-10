<template>
  <div class="l-container">
    <div class="spinner-container">
      <div v-if="loading" class="spinner" @click="preventClick">
        <div class="loader"></div>
      </div>
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span @click="closeModal" class="close">&times;</span>
          <p>¿Nos permite enviar notificaciones para mantenerlo informado sobre nuevos mensajes?</p>
          <button @click="requestNotificationPermission" class="notification-button">Permitir notificaciones</button>
        </div>
      </div>
      <map-route/>
      <information-card/>
      <button class="notification-button" @click="forceRequestNotificationPermission">Solicitar permiso de
        notificación
      </button>
    </div>
  </div>
</template>

<style>
.spinner-container {
  position: relative;
}

.spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Evita que el spinner capture eventos de clic */
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

<script>
import MapRoute from "@/share_route/context/components/MapRoute.vue"
import {utils} from "@/shared/utils"
import {mapActions, mapMutations, mapState} from "vuex"
import 'firebase/messaging'
import InformationCard from "@/share_route/context/components/InformationCard.vue";

export default {
  name: "ShareRoutes",
  components: {InformationCard, MapRoute},
  data() {
    return {
      token: '',
      taxi: '',
      serviceId: '',
      mfcmtaxi: this.message,
      route: [],
      showModal: false
    }
  },
  watch: {
    taxi(value) {
      this.taxi = utils.keyBase64(value)
    },
    refresh(value) {
      this.refresh = utils.keyBase64(value)
    },
    mfcmtaxi(value) {
      this.mfcmtaxi(value)
    }
  },
  computed: {
    ...mapState('fcmStore', ['message', 'timer', 'shareRoute', 'loading'])
  },
  methods: {
    ...mapMutations('fcmStore', ['setTimer', "setLoading"]),
    ...mapActions('fcmStore', ['subscribeToken', 'captureRoute']),
    async requestNotificationPermission() {
      if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('Permiso de notificación concedido desde share route')
            window.location.reload()
          } else {
            console.log('Permiso de notificación denegado.')
          }
        })
      } else {
        console.log('Las notificaciones no son compatibles con este navegador.');
      }
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    preventClick() {

    },
    forceRequestNotificationPermission() {
      this.requestNotificationPermission();
    },
    guideUserToUnblockPermissions() {
    alert("Permissions required \nTo unblock permissions, please follow these steps:\n1. Open your browser settings.\n2. Navigate to the 'Privacy & Security' or 'Site Settings' section.\n3. Find the permissions related to the feature you want to unblock (e.g., Camera, Microphone, Location).\n4. Enable permissions for the website you're trying to use.\n5. Refresh the page.");
    }
  },
  async mounted() {
    const value = window.location.search
    const urlParams = new URLSearchParams(value)
    this.serviceId = urlParams.get('serviceId')
    this.guideUserToUnblockPermissions()
    await this.subscribeToken()
    await this.captureRoute()
  }
}
</script>