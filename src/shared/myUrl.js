/**
 * Determina la url de conexion al dispatch
 */
export default function (localPort) {
  const location = document.location
  const hostname = location.hostname

  // se usa cuando se esta desarrollando el proyecto y se lanza con "yarn serve", y el dominio es "localhost"
  if (hostname === 'localhost') {
    return `http://10.100.101.17:${localPort}`
  }

  // se usa cuando se utiliza desde docker, sea en pruebas de aceptacion o en produccion
  let proto = 'http:'
  if (location.protocol === 'https:') {
    proto = 'https:'
  }

  let port = ''
  if (location.port !== '' && location.port !== 80 && location.port !== 443) {
    port = `:${location.port}`
  }

  return `${proto}//${hostname}${port}`
}
