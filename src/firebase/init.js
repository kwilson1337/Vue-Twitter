// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const initApp = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyAki8jmdWDX19ueOq98TquF9ZLK_AYUUj4",
        authDomain: "twitter-clone-8b632.firebaseapp.com",
        projectId: "twitter-clone-8b632",
        storageBucket: "twitter-clone-8b632.appspot.com",
        messagingSenderId: "772853969825",
        appId: "1:772853969825:web:4a0194176d1aa5ddb551e0"
      };
      
      // Initialize Firebase
      initializeApp(firebaseConfig);
}

export const firebaseStorage = getStorage(initApp());