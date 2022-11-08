import { add } from "ionicons/icons";
import { IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonList,IonFabButton,IonFab,IonIcon,IonButtons,IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import '../../src/theme/Home.css';
import '../../src/components/MazoComponent.tsx'
import MazoComponent from "../components/MazoComponent";
import { getAuth, setPersistence } from "firebase/auth";
import firebaseapp, { auth } from '../firebase/firebaseconfig';
import { arrayUnion, doc, getFirestore, getDoc, updateDoc, query, collection, where, getDocs, Query, onSnapshot } from "firebase/firestore";
import MazoClass from "../class/MazoClass";
import React, { useContext, useEffect, useState } from "react";
import {AuthContext} from "../context/AuthContext";
interface IMazos {
  nombre:string
  id:string
}


const Home: React.FC =  () => {
  let data:any = []
  const [mazos, setMazos] = useState([])
  const [logged, setLogged] = useState(false);
  const user = useContext(AuthContext)
  const db = getFirestore(firebaseapp);

  useEffect(() => {  (async () => { 
      if(user){ 
       //console.log(user);
        setLogged(true)
      const q = query(collection(db,"ColeccionMazos"),where("uuid","==",user.uid));
      const unsub = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            console.log("New city: ", change.doc.data());
            data = [...data,change.doc.data()]
            setMazos(data);
          }
          if (change.type === "modified") {

              console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
              console.log("Removed city: ", change.doc.data());
          }
        });
      });
      }else{console.log("inicia sesión fallido");}
    })();
  }, [user]);

 /* async function getMazosDesdeFirebase(uid:String){
      const q = query(collection(db,"ColeccionMazos"),where("uuid","==",user?.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>{
        console.log(doc.id + " =  " + doc.get("nombre") );
        Mazos.push(new MazoClass(doc.get("nombre"),doc.id));
      })
  }*/

  function logout(){
    auth.signOut();
  }
  return (
    <IonPage color="dark">
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle size="large" color={'primary'}>LeCards</IonTitle>
            <IonButtons slot="end">
              { !user &&
              <><IonButton color={"primary"} routerLink="/registro">Registrarse</IonButton><IonButton color={"primary"} routerLink="/login">Entrar</IonButton></>  
              }
              { user &&
                <><IonButton color ={"primary"} onClick={() => logout()} >Salir</IonButton></>
              }
            <IonButton color={"primary"} routerLink="/preferences">Ajustes</IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color={'medium'}>
      { user &&      
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
                    { mazos.map((mazo: IMazos,i: React.Key) => (
                      
                    <React.Fragment key={i}><MazoComponent {...mazo as IMazos}></MazoComponent></React.Fragment>))}
            </IonList> 
        </>
      }
      {!user && <> 
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
