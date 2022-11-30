import { add } from "ionicons/icons";
import { IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonList,IonFabButton,IonFab,IonIcon,IonButtons,IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonFabList, IonCardSubtitle } from '@ionic/react';
import '../../src/theme/Home.css';
import '../../src/components/MazoComponent.tsx'
import MazoComponent from "../components/MazoComponent";
import { getAuth, setPersistence } from "firebase/auth";
import firebaseapp, { auth } from '../firebase/firebaseconfig';
import { arrayUnion, doc, getFirestore, getDoc, updateDoc, query, collection, where, getDocs, Query, onSnapshot } from "firebase/firestore";
import MazoClass from "../class/MazoClass";
import React, { useContext, useEffect, useState } from "react";
import {AuthContext} from "../context/AuthContext";
import IMazos from "../interfaces/Imazo";



const Home: React.FC =  () => {
  let data:any = []
  let indexer:any = [] //para guardar los ID de los mazos, asi no reescribo el codigo, al no ser un 
  //query snapshot map no funciona
  let propAux:IMazos 
  const [MId,setId] = useState([])
  const [mazos, setMazos] = useState([])
  const [logged, setLogged] = useState(false);
  const user = useContext(AuthContext)
  const db = getFirestore(firebaseapp);
  const [racha,setRacha] = useState(0)
  const [userRecord,setUserRecord] = useState(5)
  let faltantes = racha - userRecord
 
  useEffect(() => {  (async () => { 
      if(user){ 
       //console.log(user);
        setLogged(true)
      const q = query(collection(db,"ColeccionMazos"),where("uuid","==",user.uid));
      const unsub = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            if(indexer.indexOf(change.doc.id) === -1){
              indexer = [...indexer, change.doc.id]
              data = [...data,change.doc.data()]
              setMazos(data)
              setId(indexer)
            }  
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

        {racha >= 3 && <>
        <div className="rachaDiv">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>¡Felicitaciones, tiene una racha de {racha} repasos consecutivos!</IonCardTitle>
            <IonCardSubtitle>¡Le quedan {faltantes} para superar su record de {userRecord} repasos!</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        </div>
        </>}
      { user &&      
        <>
            <IonList inset={false}>
                    { mazos.map((mazo: IMazos,i:number ) => (
                    <React.Fragment key={i}><MazoComponent {...propAux = {nombre: mazo.nombre, id: MId[i]}}></MazoComponent></React.Fragment>))}
            </IonList>
            <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton routerLink="/edeck" title="Editar Mazo">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab> 

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton title="Nuevo">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton className="popover-button" routerLink="/ncard">
              <IonIcon icon={add} color="dark"></IonIcon>
            </IonFabButton>
            <IonFabButton className="popover-button" routerLink="/ndeck">
              <IonIcon icon={add} color="dark"></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab> 
        </>
      }

      {!user && <> 
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Porfavor ingrese o registrese</IonCardTitle>
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
