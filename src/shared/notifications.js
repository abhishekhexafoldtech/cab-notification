import Vue from 'vue'

function confirmation (message, type = 'success') {
  Vue.prototype.$swal({
    icon: type,
    title: message,
    confirmButtonText: 'Aceptar',
    showCancelButton: false,
    focusCancel: false,
    reverseButtons: false,
    customClass: {
      confirmButton: 'button button--yellow',
      title: 'text-strong text-big text-black pb-4 pt-3'
    }
  })
}

function notify (message) {
  Vue.prototype.$swal({
    icon: 'warning',
    title: message,
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    focusCancel: false,
    customClass: {

    }
  })
}

export const notifications = {
  notify,
  confirmation
}

export default notifications
