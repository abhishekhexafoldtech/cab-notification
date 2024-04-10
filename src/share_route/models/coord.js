export default class Coord {
    latitude = ''
    longitude = ''
    time = ''

    constructor(latitude, longitude, time) {
        this.latitude = latitude
        this.longitude = longitude
        this.time = time
    }

    getLatitude () {
        return this.latitude
    }

    getLongitude () {
        return this.longitude
    }

    getTime() {
        return this.time
    }

    setLatitude(value) {
        this.latitude = value
    }

    setLongitude(value) {
        this.longitude = value
    }

    setTime(value){
        this.time = value
    }
}