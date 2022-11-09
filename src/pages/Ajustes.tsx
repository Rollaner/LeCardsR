import { IonContent,IonBackButton,IonHeader,IonPage,IonTitle,IonToolbar,IonButtons, IonList, IonLabel, IonItem, IonRadioGroup, IonToggle, IonRadio, IonListHeader} from '@ionic/react';
import { SetStateAction, useRef, useState } from 'react';
import '../../src/theme/Ajustes.css';
const Ajustes: React.FC = () => {
    const [tiempo, setTiempo] = useState("");
    const [activarTiempo, setActivarTiempo] = useState(false);
    const selectForm = useRef< null | any >(null)

    function handleSubmit(event:any){
        event.preventDefault();
        selectForm.current.submit();
        alert(`El nombre del mazo es: ${tiempo}`);
        } //reconstruccion del cdigo del repo local, no resetea valores.
  

    function handleRadio(value:any){
      console.clear()    //esta un input atrasado, funcionaba bien pero se rompio magicamente
      setTiempo(value)
      console.log(tiempo)
    }

    function activarTiempoLimite(event:any){
          event.preventDefault();
          setActivarTiempo(!activarTiempo);
        }

    return (
        <IonPage>
            <IonHeader>
        <IonToolbar color="dark">
          <IonButtons color="medium" slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle slot="secondary" size="large" color={'primary'}>Ajustes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonItem>  
            <IonLabel>Activar tiempo limite</IonLabel>
            <IonToggle color={"primary"} checked={activarTiempo} onClick={(e) => activarTiempoLimite(e)} slot="end"></IonToggle> 
            {/* el setActivarTiempo a !AT es lo que cambia el valor, deberiamos moverlo a otra funcion para permitir cambios al DOM */}
      </IonItem>
      { activarTiempo &&   
      <div  className='tiempoLimRadio'>
      <form onClick={()=>handleSubmit}>
      <IonList inset={true} lines="full">
        <IonListHeader>
          <h2>Tiempo limite</h2>
        </IonListHeader>
        <div  className='RadioTL'>
        <IonRadioGroup onIonChange={({ detail }) => handleRadio(detail.value)}> {/*reparar hook para tiempo limite*/}
            <IonLabel  >20 segundos</IonLabel>
            <IonRadio  name="20s" value="20s" slot="start" onIonFocus={() => setTiempo("20s")}></IonRadio>
            <IonLabel  >25 segundos</IonLabel>
            <IonRadio name="25s" value="25s" slot="secondary" onIonFocus={() => setTiempo("25s")}></IonRadio>
            <IonLabel  >30 segundos</IonLabel>
            <IonRadio name="30s" value="30s" slot="end" onIonFocus={() => setTiempo("30s")}></IonRadio>
        </IonRadioGroup>
        </div>
      </IonList>
      </form>
      </div>
      }
      </IonContent>
        </IonPage>
    );
};
export default Ajustes;