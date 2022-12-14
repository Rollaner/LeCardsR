import { IonContent,IonBackButton,IonHeader,IonPage,IonTitle,IonToolbar,IonButtons, IonList, IonLabel, IonItem, IonRadioGroup, IonToggle, IonRadio, IonListHeader} from '@ionic/react';
import { getFirestore, addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { time } from 'ionicons/icons';
import { SetStateAction, useContext, useRef, useState } from 'react';
import '../../src/theme/Ajustes.css';
import { AuthContext } from '../context/AuthContext';
import firebaseapp from '../firebase/firebaseconfig';
const Ajustes: React.FC = () => {
    const [tiempo, setTiempo] = useState("");
    let tiempoA = ""
    const [limCartas, setLimCartas] = useState("25");
    let limCartasA = "25"
    const user = useContext(AuthContext)
    const db = getFirestore(firebaseapp);
    const [activarTiempo, setActivarTiempo] = useState(false);
    const selectForm = useRef< null | any >(null)

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        selectForm.current.submit();
        } //reconstruccion del cdigo del repo local, no resetea valores.
  

    function handleTimeRadio(value:any){
      console.clear()    //esta un input atrasado, funcionaba bien pero se rompio magicamente
      setTiempo(value)
      tiempoA = value
      if(user){
        let aux = doc(db,"ColeccionUsuarios", user.uid)
        const prefRef = updateDoc(aux,{ //cambiar handle submit para que trabaje con nombre de mazo
          limCartas: limCartasA,
          limTiempoActivo: activarTiempo,
          limTiempo : tiempoA
      })}else
        alert("Porfavor inicie sesion antes de continuar")
    }

    function handleCardRadio(value:any){
      console.clear()    //esta un input atrasado, funcionaba bien pero se rompio magicamente
      setLimCartas(value)
      limCartasA = value
      if(user){
        let aux = doc(db,"ColeccionUsuarios", user.uid)
        const prefRef = updateDoc(aux,{ //cambiar handle submit para que trabaje con nombre de mazo
          limCartas: limCartasA,
          limTiempoActivo: activarTiempo,
          limTiempo : tiempoA
      })}else
        alert("Porfavor inicie sesion antes de continuar")
      console.log(limCartasA)
    }

    function activarTiempoLimite(event:any){
          event.preventDefault();
          setActivarTiempo(!activarTiempo);
          if(user){
            let aux = doc(db,"ColeccionUsuarios", user.uid)
            const prefRef = updateDoc(aux,{ //cambiar handle submit para que trabaje con nombre de mazo
            limCartas: limCartasA,
            limTiempoActivo: activarTiempo,
            limTiempo : tiempoA
        })}else
            alert("Porfavor inicie sesion antes de continuar")
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
      <IonContent color="medium">
      <div className='PrefSpan'>
      <IonItem color={"light"}>  
            <IonLabel >Activar tiempo limite</IonLabel>
            <IonToggle color={"primary"} checked={activarTiempo} onClick={(e) => activarTiempoLimite(e)} slot="end"></IonToggle> 
            {/* el setActivarTiempo a !AT es lo que cambia el valor, deberiamos moverlo a otra funcion para permitir cambios al DOM */}
      </IonItem>
      </div>
      { activarTiempo &&
      <div className='PrefSpan'  style={{right: "20px"}}>  
      <form id="form2" onClick={()=>handleSubmit}>
      <IonList inset={true} lines="full">
        <div  className='RadioTL'>
        <IonListHeader color={"light"}>
          <h2>Tiempo limite</h2>
        </IonListHeader>
        <IonRadioGroup onIonChange={({ detail }) => handleTimeRadio(detail.value)}> {/*reparar hook para tiempo limite*/}
        <span>
            <IonLabel  >20 segundos</IonLabel>
            <IonRadio  name="20s" value="20" slot="start" onIonFocus={() => setTiempo("20")}></IonRadio>
            <IonLabel  >25 segundos</IonLabel>
            <IonRadio name="25s" value="25" slot="secondary" onIonFocus={() => setTiempo("25")}></IonRadio>
            <IonLabel  >30 segundos</IonLabel>
            <IonRadio name="30s" value="30" slot="end" onIonFocus={() => setTiempo("30")}></IonRadio>
          </span>
        </IonRadioGroup>
        </div>
      </IonList>
      </form>
      </div>
      }  
      <div className='limCartas'>
      <form className='LimCartasForm' onClick={()=>handleSubmit}>
      <IonList inset={true} lines="full">
      <span  className='RadioTL'>
        <IonListHeader color="light">
          <h2>Limite diario de cartas nuevas</h2>
        </IonListHeader>
        <IonRadioGroup onIonChange={({ detail }) => handleCardRadio(detail.value)}> {/*reparar hook para tiempo limite*/}
        <span>
            <IonLabel  >20</IonLabel>
            <IonRadio  name="20c" value="20" slot="start" onIonFocus={() => setLimCartas("20")}></IonRadio>
            <IonLabel  >25</IonLabel>
            <IonRadio name="25c" value="25" slot="secondary" onIonFocus={() => setLimCartas("25")}></IonRadio>
            <IonLabel  >30</IonLabel>
            <IonRadio name="30c" value="30" slot="end" onIonFocus={() => setLimCartas("30")}></IonRadio>
        </span>  
        </IonRadioGroup>
        </span>
      </IonList>
      </form>
      </div>
      </IonContent>
        </IonPage>
    );
};
export default Ajustes;