import { add } from "ionicons/icons";
import { IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonList,IonItem,IonFabButton,IonFab,IonIcon,IonButtons,IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import '../../src/theme/Home.css';
import '../../src/components/MazoComponent.tsx'
import MazoComponent from "../components/MazoComponent";
import { getAuth } from "firebase/auth";
import firebaseapp from '../firebase/firebaseconfig';
import { arrayUnion, doc, getFirestore, getDoc, updateDoc, query, collection, where, getDocs, Query } from "firebase/firestore";



const Home: React.FC =  () => {
  const auth = getAuth();
  const user = auth.currentUser;
  //si el usuario existe, armarle la pagina
  //TODO
  const db = getFirestore(firebaseapp);
  
  if (user) { 
    console.log(user.uid);
    getMazosDesdeFirebase(user.uid);
  } else {
    console.log("inicia sesión");
  }

  async function getMazosDesdeFirebase(uid:String){
      const q = query(collection(db,"ColeccionMazos"),where("uuid","==",user?.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>{
        console.log(doc.id + " =  " + doc.get("nombre") );
      })
  }
  

  function MazoView(){

  }


  return (
    <IonPage color="dark">
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle size="large" color={'primary'}>LeCards</IonTitle>
            <IonButtons slot="end">
              { !auth &&
              <><IonButton color={"primary"} routerLink="/registro">Registrarse</IonButton><IonButton color={"primary"} routerLink="/login">Entrar</IonButton></>  
              }
            <IonButton color={"primary"} routerLink="/preferences">Ajustes</IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color={'medium'}>
      { auth &&      
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
                <MazoComponent mazo={"placeholder"}></MazoComponent>
            </IonList>
            </>
      }
      {!auth && <> 
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
