import { IonContent,IonBackButton,IonHeader,IonPage,IonTitle,IonToolbar,IonButtons, IonList, IonLabel, IonItem, IonRadioGroup, IonToggle, IonRadio, IonListHeader} from '@ionic/react';
import { SetStateAction, useRef, useState } from 'react';
import '../../src/theme/Ajustes.css';
const Ajustes: React.FC = () => {
    const [tiempo, setTiempo] = useState("");
    const [limCartas, setLimCartas] = useState("");
    const [activarTiempo, setActivarTiempo] = useState(false);
    const selectForm = useRef< null | any >(null)

    function handleSubmit(event:any){
        event.preventDefault();
        selectForm.current.submit();
        alert(`El nombre del mazo es: ${tiempo}`);
        } //reconstruccion del cdigo del repo local, no resetea valores.
  

    function handleTimeRadio(value:any){
      console.clear()    //esta un input atrasado, funcionaba bien pero se rompio magicamente
      setTiempo(value)
      console.log(tiempo)
    }

    function handleCardRadio(value:any){
      console.clear()    //esta un input atrasado, funcionaba bien pero se rompio magicamente
      setLimCartas(value)
      console.log(limCartas)
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
        <IonRadioGroup onIonChange={({ detail }) => handleTimeRadio(detail.value)}> {/*reparar hook para tiempo limite*/}
            <IonLabel  >20 segundos</IonLabel>
            <IonRadio  name="20s" value="20" slot="start" onIonFocus={() => setTiempo("20")}></IonRadio>
            <IonLabel  >25 segundos</IonLabel>
            <IonRadio name="25s" value="25" slot="secondary" onIonFocus={() => setTiempo("25")}></IonRadio>
            <IonLabel  >30 segundos</IonLabel>
            <IonRadio name="30s" value="30" slot="end" onIonFocus={() => setTiempo("30")}></IonRadio>
        </IonRadioGroup>
        </div>
      </IonList>
      </form>
      </div>
      }
      <IonItem>
        <IonLabel>Limite diario de cartas nuevas</IonLabel>
        <div  className='tiempoLimRadio'>
      <form onClick={()=>handleSubmit}>
      <IonList inset={true} lines="full">
        <IonListHeader>
          <h2>Tiempo limite</h2>
        </IonListHeader>
        <div  className='RadioTL'>
        <IonRadioGroup onIonChange={({ detail }) => handleCardRadio(detail.value)}> {/*reparar hook para tiempo limite*/}
            <IonLabel  >20</IonLabel>
            <IonRadio  name="20c" value="20" slot="start" onIonFocus={() => setLimCartas("20")}></IonRadio>
            <IonLabel  >25</IonLabel>
            <IonRadio name="25c" value="25" slot="secondary" onIonFocus={() => setLimCartas("25")}></IonRadio>
            <IonLabel  >30</IonLabel>
            <IonRadio name="30c" value="30" slot="end" onIonFocus={() => setLimCartas("30")}></IonRadio>
        </IonRadioGroup>
        </div>
      </IonList>
      </form>
      </div>
      </IonItem>
      </IonContent>
        </IonPage>
    );
};
export default Ajustes;