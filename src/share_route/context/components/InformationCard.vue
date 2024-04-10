<template>
  <div class="l-container__card information-card">
    <div>
      <p>Conductor</p>
      <p class="text-name">{{shareRoute.getName()}}</p>
    </div>
    <div class="information-card__container-plate">
      <img class="information-card__img" :src="shareRoute.getPhoto() || require('@/assets/images/personIcon.svg')">
      <p class="information-card__plate">{{shareRoute.getPlate() || '------' }} </p>
    </div>
    <div class="information-card__container-text">
      <p><span class="text-security">¡Pensamos en tu seguridad!</span>  Tienes la opción de compartir el recorrido con un amigo o familiar</p>
    </div>
    <div class="information-card__container-share">
      <button @click="makeCall" class="button-phone">
        <img  src="@/assets/images/phone.svg">
      </button>
      <p class="text-phone" v-if="!showPhoneNumber && phoneNumber">{{ phoneNumber }}</p>
      <button @click="shareURL" class="button-share">Compartir recorrido</button>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  name: "InformationCard",
  data() {
    return {
      phoneNumber:'',
      showPhoneNumber: false,
    }
  },
  computed: {
    ...mapState('fcmStore', ['shareRoute'])
  },
  methods:{
    async shareURL() {
      const shareData = {
        title: "Ruta Servicio",
        text: "Ingresa para ver el recorrido del conductor",
        url: document.location.href,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (error) {
          console.error("Error al compartir la URL:", error);
          window.location.href = document.location.href;
        }
      } else {
        window.location.href = document.location.href;
      }
    },

    makeCall() {
      const phoneNumber = this.shareRoute.getPhone()
      this.phoneNumber = phoneNumber

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = 'tel:' + phoneNumber
      } else {
        this.showPhoneNumber = !this.showPhoneNumber
      }
    }

  }
}
</script>