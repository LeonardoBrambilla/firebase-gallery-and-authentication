# About 
- This project is gallery and authentication with firebase

# Setups of Project
- React for build frontend
- React-router-dom for create routes between project
- Vite for devepoment the project
- Bootstrap for stylize some components
- Firebase for storage and authentication
- Phosphor-react for use some icons
- Uuid for create random keys

# How to run this projects
```sh
git clone 
npm install
npm run server
```

# Project structure
- `./src/App.jsx`: Is the configuration of the routes
- `./src/components`: Are the components of the project
- `./src/context`: Are the function and Context of the project 
- `./src/services`: Is the setup of Firebase

# Firebase explanation
- Auth
```js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
const signup = (email,password) => {
  return createUserWithEmailAndPassword(auth,email,password)
}
function login(email, password) {
  return signInWithEmailAndPassword(auth,email, password)
}
```
- Google Auth, you need use npm run server -- --host and configuration your project in `./src/services/firebase.js` with your settings
```js
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
const [currentUser,setCurrentUser] = useState("")
function googleAuth(){
  const google = new GoogleAuthProvider()
  signInWithPopup(auth,google).then((res)=> setCurrentUser(res))
}
```
- Create and listAllStorage
```js
import {storage} from '../services/firebase'
import { listAll ,ref, uploadBytes ,getDownloadURL} from "firebase/storage";
import { v4 } from "uuid";
function createStorage (folder,imageUpload) {
  if (folder===null) return folder = ""
  if (imageUpload == null) return;
  const imageRef = ref(storage, `${folder}/${imageUpload.name + v4()}`);
  uploadBytes(imageRef, imageUpload).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
      setImageUrls((prev) => [...prev, url]);
    });
  });
}  

async function listAllStorage (redirect) {
  setImageUrls([])
  setPath([])
  const listRef = ref(storage, `${redirect}/`);      
  const listPath = ref(storage, `/`);
  await listAll(listRef).then((response) => {
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  })
  await listAll(listPath).then((response) => {
    response.prefixes.forEach((item) => {
      setPath((prev)=>[...prev,item._location.path])
    })
  })
}
```








