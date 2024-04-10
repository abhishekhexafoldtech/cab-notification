export const refreshPageMixin = {
  async created () {
    const version = localStorage.getItem('SavedVersion')
    const savedVersion = version === null ? '' : version

    const changed = localStorage.getItem('HasChanged')
    this.$store.state.hasChanged = changed === null ? false : changed === 'true'

    const resp = await fetch('/version.checksum')
    const currentVersion = await resp.text()

    if (savedVersion === '') {
      localStorage.setItem('SavedVersion', currentVersion)
      return
    }

    const hasChanged = savedVersion !== currentVersion

    this.$store.state.hasChanged = hasChanged
    this.$store.state.currentVersion = currentVersion
    this.$store.state.savedVersion = savedVersion

    localStorage.setItem('HasChanged', hasChanged.toString())
  },

  methods: {
    reloadApp () {
      this.$store.state.hasChanged = false
      this.$store.state.savedVersion = this.$store.state.currentVersion

      localStorage.setItem('SavedVersion', this.$store.state.currentVersion)
      localStorage.setItem('HasChanged', 'false')

      window.location.reload()
    }
  }
}
