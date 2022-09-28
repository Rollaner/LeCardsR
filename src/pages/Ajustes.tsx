import { IonContent,IonBackButton,IonHeader,IonPage,IonTitle,IonToolbar, IonButton,IonButtons, IonList, IonLabel, IonItem, IonRadioGroup, IonToggle, IonRadio, IonListHeader} from '@ionic/react';
import { useState } from 'react';
import '..theme/Ajustes.css';
const Ajustes: React.FC = () => {
    const [tiempo, setTiempo] = useState("");
    const [activarTiempo, setActivarTiempo] = useState(false);
    const handleSubmit = (event:any) => {
        event.preventDefault();
        alert(`The name you entered was: ${tiempo}`)} //reconstruccion del cdigo del repo local, no resetea valores.
  
        const activarTiempoLimite = () => {
          setActivarTiempo(!activarTiempo);
        }

    return (
        <IonPage color='dark'>
            <IonHeader>
        <IonToolbar>
          <IonButtons color="medium" slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle slot="secondary" size="large">Ajustes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <form onChange={handleSubmit}>
      <IonItem>
            <IonLabel>Activar tiempo limite</IonLabel>
            <IonToggle color={"primary"} checked={activarTiempo} onIonChange={(e)=> activarTiempoLimite} slot="end"></IonToggle> 
            {/* el setActivarTiempo a !AT es lo que cambia el valor, deberiamos moverlo a otra funcion para permitir cambios al DOM */}
      </IonItem>
      <IonList inset={true} lines="full">
        <IonListHeader>
          <h2>Tiempo limite</h2>
        </IonListHeader>
        <IonRadioGroup color={"primary"} value="25s" onIonChange={(e) => setTiempo(e.target.value as string)}>
            <IonLabel>20 segundos</IonLabel>
            <IonRadio name="20s" value="20s" slot="start"></IonRadio>
            <IonLabel>25 segundos</IonLabel>
            <IonRadio name="25s" value="25s" slot="secondary"></IonRadio>
            <IonLabel>30 segundos</IonLabel>
            <IonRadio name="30s" value="30s" slot="end"></IonRadio>
        </IonRadioGroup>
      </IonList>
      </form>
      </IonContent>
        </IonPage>
    );
};
export default Ajustes;