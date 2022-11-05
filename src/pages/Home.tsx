import { add } from "ionicons/icons";
import { IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonList,IonFabButton,IonFab,IonIcon,IonButtons,IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import '../../src/theme/Home.css';
import '../../src/components/MazoComponent.tsx'
import MazoComponent from "../components/MazoComponent";
import { getAuth } from "firebase/auth";
import firebaseapp from '../firebase/firebaseconfig';
import { arrayUnion, doc, getFirestore, getDoc, updateDoc, query, collection, where, getDocs, Query } from "firebase/firestore";
import MazoClass from "../class/MazoClass";
import React, { useState } from "react";



const Home: React.FC =  () => {
  const [logged, setLogged] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore(firebaseapp);
  var Mazos:MazoClass[] = []
  
  if (user) { 
    console.log(user.uid);
    setLogged(true)
    getMazosDesdeFirebase(user.uid);
  } else {
    console.log("inicia sesión fallido");
  }
  var props = {
    mazo: "",
    id: ""
  }
  async function getMazosDesdeFirebase(uid:String){
      const q = query(collection(db,"ColeccionMazos"),where("uuid","==",user?.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>{
        console.log(doc.id + " =  " + doc.get("nombre") );
        Mazos.push(new MazoClass(doc.get("nombre"),doc.id));
      })
  }
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
              {Mazos.map((mazo) => (<React.Fragment key={mazo.id}>
                  {props.id = mazo.id} {props.mazo = mazo.nombre}
                  <MazoComponent {...props}></MazoComponent>
                </React.Fragment>))}
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
