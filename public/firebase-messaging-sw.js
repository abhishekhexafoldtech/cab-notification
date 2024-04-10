importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyAjTmFubeMhSBzCttOUAwIHl-N0EhOlbRY",
  authDomain: "notification-test-one.firebaseapp.com",
  projectId: "notification-test-one",
  storageBucket: "notification-test-one.appspot.com",
  messagingSenderId: "981459976768",
  appId: "1:981459976768:web:a9d28ae89e5cc1b65595a5",
  measurementId: "G-2MQ57XH7GZ"
};
firebase.initializeApp(firebaseConfig);
firebase.messaging();
