import router from '@/router'

export const sharedMixin = {
  methods: {
    addClass (option, classIfTrue, classIfFalse = '') {
      return option ? classIfTrue : classIfFalse
    },

    async goTo (to, callback) {
      await router.push(to)
      if (callback) callback()
    },

    openModal (idModal) {
      this.$bvModal.show(idModal)
    },

    closeModal (idModal) {
      this.$bvModal.hide(idModal)
    }
  }
}
