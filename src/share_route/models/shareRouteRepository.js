import axios from "axios";
import { messaging, firebaseToken } from "@/shared/firebase";
import { onMessage } from "firebase/messaging";
import { utils } from "@/shared/utils";

export default class ShareRouteRepository {
  async sendToken() {
    const url = "https://drivers.api.losmoviles.xyz/subscribe_topic/v1";
    const token = await firebaseToken();
    const data = {
      token: token,
      topic: "SharedRoute",
    };
    return axios.post(url, data, { redirect: "follow" });
  }

  receivedRoute(sharedRoute, timer) {
    const params = new URLSearchParams(document.location.search);
    const serviceId = params.get("serviceId");
    onMessage(messaging, (payload) => {
      console.log(payload);
      if (payload.data.service_id === serviceId) {
        if (timer) {
          clearTimeout(timer);
        }

        payload.data.route = JSON.parse(
          utils.keyBase64(payload.data.SharedRoute)
        );
        sharedRoute.fromJsonResponse(payload.data);
      }
    });
  }
}
