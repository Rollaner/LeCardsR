import { add } from "ionicons/icons";
import { IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonList,IonItem,IonFabButton,IonFab,IonIcon,IonButtons,IonButton } from '@ionic/react';
import '../../src/theme/Home.css';
import '../../src/components/MazoComponent.tsx'
import MazoComponent from "../components/MazoComponent";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";



const Home: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  //si el usuario existe, armarle la pagina
  //TODO
  if (user) {
    console.log( "ID del usuario actual : " + user.uid);
    MazoView();
  }

  
  function MazoView(){
    
  }


  return (
    <IonPage color="dark">
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle size="large" color={'primary'}>LeCards</IonTitle>
            <IonButtons slot="end">
              <IonButton color={"primary"} routerLink="/registro">Registrarse</IonButton>
              <IonButton color={"primary"} routerLink="/login">Entrar</IonButton>  
            <IonButton color={"primary"} routerLink="/preferences">Ajustes</IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color={'medium'}>

        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton color={"primary"} routerLink="/ndeck" title="Nuevo Mazo">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton routerLink="/ncard" href="" title="Nueva carta" >
        <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonList inset={false}>
        <IonItem color={'primary'} lines='inset' button={true}>
          <MazoComponent mazo={"placeholder"}></MazoComponent>
        </IonItem>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Home;
