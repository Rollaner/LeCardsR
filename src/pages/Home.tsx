import { add } from "ionicons/icons";
import { IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonList,IonFabButton,IonFab,IonIcon,IonButtons,IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import '../../src/theme/Home.css';
import '../../src/components/MazoComponent.tsx'
import MazoComponent from "../components/MazoComponent";
import { getAuth, setPersistence } from "firebase/auth";
import firebaseapp from '../firebase/firebaseconfig';
import { arrayUnion, doc, getFirestore, getDoc, updateDoc, query, collection, where, getDocs, Query } from "firebase/firestore";
import MazoClass from "../class/MazoClass";
import React, { useContext, useEffect, useState } from "react";
import {AuthContext} from "../context/AuthContext";
interface IMazos {
  nombre:string
  id:string
}


const Home: React.FC =  () => {
  const [mazos, setMazos] = useState([])
  const [logged, setLogged] = useState(false);
  const [propsState,setPropsState] = useState<IMazos>({
    nombre: "",
    id:""
  })
  const user = useContext(AuthContext)
  // const auth = getAuth();
  // let user = auth.currentUser;
  const db = getFirestore(firebaseapp);
  
  /*if (user) { 
    console.log(user.uid);
    setLogged(true)
    //getMazosDesdeFirebase(user.uid);
  } else {
    console.log("inicia sesión fallido");
  }*/
  var props = {
    mazo: "",
    id: ""
  }

//   useEffect(() => {  (async () => { 
//     user = auth.currentUser;
//     if(user){ 
//       console.log(user);
//       setLogged(true) 
//     }else{console.log("inicia sesión fallido");}
//   })();
// }, []);

//   useEffect(() => {  (async () => { 
//       user = auth.currentUser;
//       if(user){ 
//         console.log(user);
//         setLogged(true)
//       const q = query(collection(db,"ColeccionMazos"),where("uuid","==",user.uid));
//       getDocs(q).then((querySnapshot) => {
//         const data:any = querySnapshot.docs.map( (doc:any) => ({ ...doc.data(), id: doc.id }))
//             setMazos(data);
//             if(data){
//               setPropsState({
//                 nombre: data[0]['nombre'],
//                 id: data[0]['id']
//               })
//             }
//       })}else{console.log("inicia sesión fallido");}
//     })();
//   }, [user]);

 /* async function getMazosDesdeFirebase(uid:String){
      const q = query(collection(db,"ColeccionMazos"),where("uuid","==",user?.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>{
        console.log(doc.id + " =  " + doc.get("nombre") );
        Mazos.push(new MazoClass(doc.get("nombre"),doc.id));
      })
  }*/
  return (
    <IonPage color="dark">
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle size="large" color={'primary'}>LeCards</IonTitle>
            <IonButtons slot="end">
              { !logged &&
              <><IonButton color={"primary"} routerLink="/registro">Registrarse</IonButton><IonButton color={"primary"} routerLink="/login">Entrar</IonButton></>  
              }
            <IonButton color={"primary"} routerLink="/preferences">Ajustes</IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color={'medium'}>
      { logged &&      
        <><IonFab vertical="bottom" horizontal="start" slot="fixed">
            <IonFabButton color={"primary"} routerLink="/ndeck" title="Nuevo Mazo">
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab><IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton routerLink="/ncard" href="" title="Nueva carta">
                <IonIcon icon={add}></IonIcon>
              </IonFabButton>
            </IonFab>
            <IonList inset={false}>
                    {mazos.map((mazo,i) => (
                      
                    <React.Fragment key={i}><MazoComponent {...mazo as IMazos}></MazoComponent></React.Fragment>))}
            </IonList> 
        </>
      }
      {!logged && <> 
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Porvafor ingrese o registrese</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Es necesario que ingrese un usuario valido antes de utilizar la aplicación, utilize los botones que estan arriba para comenzar.
          </IonCardContent>
        </IonCard> </>} 

      </IonContent>
    </IonPage>
  );
};

export default Home;
