<template>
  <div>
    <div id="googleMap" class="l-container__map"></div>
  </div>

</template>

<script>
import {mapMutations, mapState} from "vuex";
import notifications from "@/shared/notifications";

export default {
  name: "MapRoute",
  data() {
    return {
      map: '',
      userMarker: null,
      movingMarker: null,
      markerIndex: 0,

    }
  },
  computed:{
    ...mapState('fcmStore', ['shareRoute', 'loading'])
  },
  watch: {
    shareRoute: {
      handler(value) {
        if (value.isSharingRoute === 'false') {
          notifications.notify('La ruta ya no se comparte.')
          return
        }
        const coordinates = value.getRoute().map(point => ({ lat: point.latitude, lng: point.longitude }))
        this.updateRoute(coordinates)
        this.setLoading(false)
      },
      deep: true,
    }
  },
  methods: {
    updateRoute(coordinates) {
      if (coordinates.length === 0) return;
      if (!this.userMarker) {
        this.userMarker = new google.maps.Marker({
          position: new google.maps.LatLng( parseFloat(this.shareRoute.getOriginLat()), parseFloat(this.shareRoute.getOriginLon())),
          map: this.map,
          icon: 'https://firebasestorage.googleapis.com/v0/b/los-moviles-743fb.appspot.com/o/places-icons-map%2Fmarker.png?alt=media&token=20ddc5a7-ee14-4dd6-b16d-1d48403c3ab4'
        })
      }

      this.drawRoute(coordinates);
      this.fitZoomBounds(coordinates);
    },

    drawRoute(coordinates) {
      if (this.movingMarker) {
        this.movingMarker.setMap(null)
        this.movingMarker = null
      }

      this.movingMarker = new google.maps.Marker({
        position:new google.maps.LatLng(coordinates[coordinates.length - 1].lat, coordinates[coordinates.length - 1].lng),
        map: this.map,
        icon: 'https://firebasestorage.googleapis.com/v0/b/los-moviles-743fb.appspot.com/o/places-icons-map%2Ftaxi.svg?alt=media&token=97109cc5-4581-4ed6-9afd-4ce8750354bd'
      })

      let route = new google.maps.Polyline({
        path: coordinates,
        geodesic: true,
        strokeColor: '#023484',
        strokeOpacity: 0.7,
        strokeWeight: 5
      });
      route.setMap(this.map);
    },

    fitZoomBounds(coordinates) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(new google.maps.LatLng( parseFloat(this.shareRoute.getOriginLat()), parseFloat(this.shareRoute.getOriginLon())));
      bounds.extend(new google.maps.LatLng(coordinates[coordinates.length - 1].lat, coordinates[coordinates.length - 1].lng));
      this.map.fitBounds(bounds);
    },
    ...mapMutations('fcmStore', ['setLoading'])

  },

  mounted() {
    const mapProperties = {
      zoom: 19,
      center: { lat: 7.112581, lng: -73.126112 },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      fullscreenControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      navigationControl: false,
      zoomControl: true,
    }

    this.map = new google.maps.Map(document.getElementById('googleMap'), mapProperties)
  }
}
</script>


