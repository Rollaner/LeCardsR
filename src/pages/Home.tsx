import { add } from "ionicons/icons";
import { IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonList,IonItem,IonFabButton,IonFab,IonIcon,IonButtons,IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import '../../src/theme/Home.css';
import '../../src/components/MazoComponent.tsx'
import MazoComponent from "../components/MazoComponent";
import { getAuth } from "firebase/auth";
import firebaseapp from '../firebase/firebaseconfig';
import { arrayUnion, doc, getFirestore, getDoc, updateDoc, query, collection, where, getDocs } from "firebase/firestore";



const Home: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  //si el usuario existe, armarle la pagina
  //TODO
  const db = getFirestore(firebaseapp);
  if (user) {
    const mazos = query(collection(db, "Datos"), where("capital", "==", user.uid));

    const qsnap = async () => { return await getDocs(mazos) };
    const querySnapshot = qsnap()
  }

  

  function MazoView(){
    <IonList inset={false}>
              <IonItem color={'primary'} lines='inset' button={true}>
                <MazoComponent mazo={"placeholder"}></MazoComponent>
              </IonItem>
            </IonList>
  }


  return (
    <IonPage color="dark">
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle size="large" color={'primary'}>LeCards</IonTitle>
            <IonButtons slot="end">
              { true &&
              <><IonButton color={"primary"} routerLink="/registro">Registrarse</IonButton><IonButton color={"primary"} routerLink="/login">Entrar</IonButton></>  
              }
            <IonButton color={"primary"} routerLink="/preferences">Ajustes</IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color={'medium'}>
      { true &&      
        <><IonFab vertical="bottom" horizontal="start" slot="fixed">
            <IonFabButton color={"primary"} routerLink="/ndeck" title="Nuevo Mazo">
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab><IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton routerLink="/ncard" href="" title="Nueva carta">
                <IonIcon icon={add}></IonIcon>
              </IonFabButton>
            </IonFab>
            {MazoView()}
            </>
      }
      {false && <> 
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
