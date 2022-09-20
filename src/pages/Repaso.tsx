import { IonBackButton, IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonGrid,IonCard,IonButton,IonCol,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle} from '@ionic/react';
import './Repaso.css';
const Repaso: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle size="large">Repaso</IonTitle>
                    <IonBackButton defaultHref="/Home" />
                </IonToolbar>
            </IonHeader>
            <IonContent>

            <IonCard >
          <IonCardHeader>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              <IonCardTitle>Card Title</IonCardTitle>
          </IonCardHeader>
        </IonCard>
        <IonCard >
          <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in awhile,
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
          </IonCardContent>
        </IonCard>
        <IonButton >
          Mostrar respuesta
        </IonButton>
        <IonGrid ><IonCol><IonButton >Facil</IonButton></IonCol><IonCol><IonButton >Bueno</IonButton></IonCol>
        <IonCol><IonButton >Dificil</IonButton></IonCol><IonCol><IonButton >Errado</IonButton></IonCol></IonGrid>

            </IonContent>
        </IonPage>
    );
};
export default Repaso;