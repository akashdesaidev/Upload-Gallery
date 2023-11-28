import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsqNsiAYy3DT11fUedAdsxeZOnqAcFevE",
  authDomain: "upload-gallery-6dc1d.firebaseapp.com",
  projectId: "upload-gallery-6dc1d",
  storageBucket: "upload-gallery-6dc1d.appspot.com",
  messagingSenderId: "1021168099323",
  appId: "1:1021168099323:web:43ad52a29ce42847f8f55e",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
