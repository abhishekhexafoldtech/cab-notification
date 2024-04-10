import Coord from "@/share_route/models/coord";

export default class ShareRoute {
    taxi = 0
    service_id = ''
    plate = ''
    name = ''
    phone = ''
    photo = ''
    originLat = 0
    originLon = 0
    route = []
    isSharingRoute =  false


    fromJsonResponse (json) {
        this.setTaxi(json.taxi)
        this.setServiceId(json.service_id)
        this.setPlate(json.plate)
        this.setName(json.name)
        this.setPhone(json.phone)
        this.setPhoto(json.photo)
        this.setOriginLat(json.originLat)
        this.setOriginLon(json.originLon)
        this.setIsSharingRoute(json.isSharingRoute)
        this.setRoute(json.route.map(
            (point)  => {
                return new Coord(
                    point.latitude,
                    point.longitude,
                    point.time,
                )
            })
        )
    }

    getTaxi () {
        return this.taxi
    }
    getName () {
        return this.name
    }
    getPlate () {
        return this.plate
    }

    getPhone () {
        return this.phone
    }

    getPhoto () {
        return this.photo
    }
    getRoute () {
        return this.route
    }

    getServiceId() {
        return this.service_id
    }

    getOriginLat(){
        return this.originLat
    }
    getOriginLon(){
      return this.originLon
    }

    getIsSharingRoute () {
        return  this.isSharingRoute
    }

    setTaxi (value) {
        this.taxi = value
    }
    setServiceId (value) {
        this.service_id = value
    }
    setPlate (value) {
        this.plate = value
    }

    setName (value) {
        this.name = value
    }
    setPhone (value) {
        this.phone = value
    }
    setPhoto (value) {
        this.photo = value
    }

    setOriginLat(value){
        this.originLat = value
    }
    setOriginLon(value){
        this.originLon = value
    }

    setRoute (value) {
        this.route = value
    }

    setIsSharingRoute (value) {
        this.isSharingRoute = value
    }

}