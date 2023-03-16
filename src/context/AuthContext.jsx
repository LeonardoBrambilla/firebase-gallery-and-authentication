import React, {useContext,useState,useEffect,createContext} from 'react'
import {auth,storage} from '../services/firebase'
import { listAll ,ref, uploadBytes ,getDownloadURL} from "firebase/storage";
import { v4 } from "uuid";

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";

export const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
  const [currentUser,setCurrentUser] = useState("")
  const [loading,setLoading] = useState(true)
  const [imageUrls, setImageUrls] = useState([]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signup = (email,password) => {
    return createUserWithEmailAndPassword(auth,email,password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth,email, password)
  }
  
  function googleAuth(){
    const google = new GoogleAuthProvider()
    signInWithPopup(auth,google)
      .then((res)=>
      setCurrentUser(res))
  }

  function logout() {
    return signOut(auth)
  }

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

 
  return (
    <AuthContext.Provider value={{
      currentUser,
      path,
      imageUrls,
      loading,
      listAllStorage,
      login,
      googleAuth,
      signup,
      logout,
      createStorage
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

