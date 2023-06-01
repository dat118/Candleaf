import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAymuEW7BFd2XcCAiPVMFBnJrPbrhteajE",
  authDomain: "candleaf-45d43.firebaseapp.com",
  projectId: "candleaf-45d43",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
