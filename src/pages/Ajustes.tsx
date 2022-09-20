import { IonContent,IonBackButton,IonHeader,IonPage,IonTitle,IonToolbar, IonButton,IonButtons, IonList, IonLabel, IonItem, IonRadioGroup, IonToggle, IonRadio} from '@ionic/react';
import './Ajustes.css';
const Ajustes: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
        <IonToolbar>
          <IonTitle size="large">LeCards</IonTitle>
          <IonBackButton defaultHref="/Home" />
            <IonButtons slot="end">
            <IonButton>Ajustes</IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonList>
      <IonItem>
            <IonLabel>Activar tiempo limte</IonLabel>
            <IonToggle slot="end"></IonToggle>
        </IonItem>
        <IonRadioGroup >
            <IonLabel>20 segundos</IonLabel>
            <IonRadio name="20s" value="20s" slot="end"></IonRadio>
            <IonLabel>25 segundos</IonLabel>
            <IonRadio name="25s" value="25s" slot="end"></IonRadio>
            <IonLabel>30 segundos</IonLabel>
            <IonRadio name="30s" value="30s " slot="end"></IonRadio>
        </IonRadioGroup>
      </IonList>
      </IonContent>
        </IonPage>
    );
};
export default Ajustes;