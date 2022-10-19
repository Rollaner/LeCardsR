import { IonBackButton, IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonGrid,IonCard,IonButton,IonCol,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle} from '@ionic/react';
import { useState } from 'react';
import '../../src/theme/Repaso.css';
const Repaso: React.FC = () => {
    const [dificultad, setDificultad] = useState(0);
    const handleSubmit = (event:any) => {
      event.preventDefault();
      alert(`The name you entered was: ${dificultad}`)}

    return (
        <IonPage color="dark">
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle size="large">Repaso</IonTitle>
                    <IonBackButton color="medium" defaultHref="/Home" />
                </IonToolbar>
            </IonHeader>
            <IonContent>
              {/* Convendria hacer un componente funcional aqui para las cartas, no se me ocurre el layout de momento eso si, un simple parrafo quizas? */}
          <IonCard >
          <IonCardHeader>
            <IonCardContent>
              Keep close to Nature's heart... and break clear away, once in awhile, {/*Requiere prop */}
              and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </IonCardContent>
          </IonCardHeader>
        </IonCard>
        <IonCard >
          <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in awhile, {/*Requiere prop */}
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
          </IonCardContent>
        </IonCard>
        <form onSubmit={handleSubmit}>
        <IonButton color="medium" >
          Mostrar respuesta
        </IonButton>
        <IonGrid >
          <IonCol><IonButton color={"success"} onClick={() => setDificultad(1)}>Facil</IonButton></IonCol>
          <IonCol><IonButton color={"secondary"} onClick={() => setDificultad(2)}>Bueno</IonButton></IonCol>
          <IonCol><IonButton color={"warning"} onClick={() => setDificultad(3)}>Dificil</IonButton></IonCol>
          <IonCol><IonButton color={"danger"} onClick={() => setDificultad(4)}>Errado</IonButton></IonCol>
        </IonGrid>
        </form>
            </IonContent>
        </IonPage>
    );
};
export default Repaso;