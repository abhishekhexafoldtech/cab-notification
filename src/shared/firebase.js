import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFirebaseConfig } from "@/shared/env";
import { utils } from "@/shared/utils";

const app = initializeApp(getFirebaseConfig());

/* const auth = getAuth();
signInWithEmailAndPassword(
  auth,
  "chatwd@losmoviles.com.co",
  "aWBGsA25Ofvn2ZLeJLoA"
)
  .then((userCredential) => {})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  }); */

export const messaging = getMessaging(app);

export const firebaseToken = async () => {
  Notification.requestPermission()
    .then((permission) => {
      if (permission == "granted") {
        // messaging.getToken().then(currentToken => {
        //     console.log(currentToken);
        // });
      } else {
        console.log("permission denied");
      }
    })
    .catch((e) => {
      console.log(e);
    });

  const token = await getToken(messaging);
  return token.toString();
};
