import { IonContent,IonBackButton,IonHeader,IonPage,IonTitle,IonToolbar, IonButton,IonButtons, IonList, IonLabel, IonItem, IonRadioGroup, IonToggle, IonRadio, IonListHeader} from '@ionic/react';
import './Ajustes.css';
const Ajustes: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle slot="secondary" size="large">Ajustes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonItem>
            <IonLabel>Activar tiempo limite</IonLabel>
            <IonToggle slot="end"></IonToggle>
      </IonItem>
      <IonList inset={true} lines="full">
        <IonListHeader>
          <h2>Tiempo limite</h2>
        </IonListHeader>
        <IonRadioGroup value="25s">
            <IonLabel>20 segundos</IonLabel>
            <IonRadio name="20s" value="20s" slot="start"></IonRadio>
            <IonLabel>25 segundos</IonLabel>
            <IonRadio name="25s" value="25s" slot="secondary"></IonRadio>
            <IonLabel>30 segundos</IonLabel>
            <IonRadio name="30s" value="30s" slot="end"></IonRadio>
        </IonRadioGroup>
      </IonList>
      </IonContent>
        </IonPage>
    );
};
export default Ajustes;