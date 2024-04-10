const pako = require('pako')

function keyBase64 (ShareRoute) {
  const strData = atob(ShareRoute)
  const charData = strData.split('').map(function (value) {
    return value.charCodeAt(0)
  })
  const binData = new Uint8Array(charData)

  const data = pako.inflate(binData)

  return  String.fromCharCode.apply(null, new Uint16Array(data))
}

export const utils = {
  keyBase64
}
