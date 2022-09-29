import { IonContent,IonBackButton,IonHeader,IonPage,IonTitle,IonToolbar, IonButton,IonButtons, IonList, IonLabel, IonItem, IonRadioGroup, IonToggle, IonRadio, IonListHeader} from '@ionic/react';
import { useRef, useState } from 'react';
import '../../src/theme/Ajustes.css';
const Ajustes: React.FC = () => {
    const [tiempo, setTiempo] = useState("");
    const [activarTiempo, setActivarTiempo] = useState(false);
    const selectForm = useRef< null | any >(null)

    const handleSubmit = (event:any) => {
        event.preventDefault();
        selectForm.current.submit();
        alert(`El nombre del mazo es: ${tiempo}`);
        } //reconstruccion del cdigo del repo local, no resetea valores.
  
    const activarTiempoLimite = (event:any) => {
          event.preventDefault();
          setActivarTiempo(!activarTiempo);
          console.log(activarTiempo)
          alert(`Tiempo Limite es ${activarTiempo}`);
        }

    return (
        <IonPage color='dark'>
            <IonHeader>
        <IonToolbar color="dark">
          <IonButtons color="medium" slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle slot="secondary" size="large" color={'primary'}>Ajustes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color={'medium'}>
      <IonItem color={'medium'}>  
            <IonLabel color={'light'}>Activar tiempo limite</IonLabel>
            <IonToggle color={"primary"} checked={activarTiempo} onClickCapture={(e)=> activarTiempoLimite} slot="end"></IonToggle> 
            {/* el setActivarTiempo a !AT es lo que cambia el valor, deberiamos moverlo a otra funcion para permitir cambios al DOM */}
      </IonItem>
      <form onClickCapture={()=>handleSubmit} color='medium'>
      <IonList inset={true} lines="full" color='medium'>
        <IonListHeader>
          <h2>Tiempo limite</h2>
        </IonListHeader>
        <IonRadioGroup value="25s" onIonChange={(e)=> setTiempo} >
            <IonLabel color={'light'} >20 segundos</IonLabel>
            <IonRadio  name="20s" value="20s" slot="start"></IonRadio>
            <IonLabel color={'light'} >25 segundos</IonLabel>
            <IonRadio name="25s" value="25s" slot="secondary"></IonRadio>
            <IonLabel  color={'light'}>30 segundos</IonLabel>
            <IonRadio name="30s" value="30s" slot="end"></IonRadio>
        </IonRadioGroup>
      </IonList>
      </form>
      </IonContent>
        </IonPage>
    );
};
export default Ajustes;