import { add } from "ionicons/icons";
import { IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonList,IonItem,IonFabButton,IonFab,IonIcon,IonButtons,IonButton } from '@ionic/react';
import './Home.css';


const Home: React.FC = () => {
  return (
    <IonPage color="dark">
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle size="large">LeCards</IonTitle>
            <IonButtons slot="end">
            <IonButton color={"primary"} routerLink="/preferences">Ajustes</IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton color={"primary"} routerLink="/ndeck" title="Nuevo Mazo">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton routerLink="/ncard" href="" title="Nueva carta" >
        <IonIcon color={"primary"} icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonList>
        <IonItem>

        </IonItem>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

function MazoView(){
  
}

export default Home;
