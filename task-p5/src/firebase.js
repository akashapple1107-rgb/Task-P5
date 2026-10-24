// Public web-app settings connect React to our Firebase project.
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseSettings = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseSettings)
export const auth = getAuth(app)
