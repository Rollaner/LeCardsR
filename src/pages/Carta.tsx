import { IonBackButton,IonButton,IonButtons,IonInput, IonList, IonContent,IonHeader,IonPage,IonTitle,IonToolbar, useIonViewDidLeave, IonItem, IonSelect, IonSelectOption, IonToast} from '@ionic/react';
import { collection, getDocs, getFirestore, where, query, addDoc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import '../../src/theme/Carta.css';
import { AuthContext } from '../context/AuthContext';
import firebaseapp from '../firebase/firebaseconfig';
interface IMazos {
    nombre:string;
    id:string;
  }
  const options = {
    cssClass: 'mazoSelect'
  };
const Carta: React.FC = () => {
    let data:any = []
    let indexer:any = []
    const [limCartas,setLimCartas] = useState(20)
    const [stateMsg, setStateMsg] = useState("")
    const [showToast, setShowToast] = useState(false);
    const [MId,setId] = useState([])
    const [mazos, setMazos] = useState([])
    const [mazo, setMazo] = useState("");
    const [pregunta, setPregunta] = useState("");
    const [respuesta, setRespuesta] = useState("");
    const user = useContext(AuthContext)
    const db = getFirestore(firebaseapp);
    const time:number = 15
    useIonViewDidLeave(() =>{
        setPregunta("Placeholder")
        setMazo("Placeholder")
        setRespuesta("Placeholder")
    });

        //cargar mazos
    useEffect(() => {  (async () => { 
        if(user){ 
        const q = query(collection(db,"ColeccionMazos"),where("uuid","==",user.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              indexer = [...indexer, change.doc.id]
              data = [...data,change.doc.data()]
              setMazos(data)
              setId(indexer)
              console.log(data)
            }
          });
        });
        }else{console.log("Sin suario valido");}
      })();
    }, [user]);
    
    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(pregunta, respuesta)
        //alert(`La pregunta es ${pregunta}, La respuesta es ${respuesta} y el mazo es ${mazo}`)
        const cartaRef = addDoc(collection(db,"ColeccionMazos", mazo,"Cartas"),{ //cambiar handle submit para que trabaje con nombre de mazo
            pregunta : pregunta,
            respuesta : respuesta,
            tiempo : time
        })
        let auxLim = limCartas
        auxLim--
        setLimCartas(auxLim)
        let auxString = "Puede agregar " + limCartas + " cartas hoy"
        setStateMsg(auxString)
        setShowToast(true)
        event.target.reset();
      }
    const cambiarMazo = (event: any) => {
        setMazo(event)
    } 
    
    return (
        <IonPage color='dark'>
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle size="large" color={'primary'}>Nueva Carta</IonTitle>
                    <IonButtons color='medium' slot="start">
                        <IonBackButton/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent color={'medium'}>
                <form  onSubmit={handleSubmit}>
            <IonList lines="full">
        <IonItem color="medium">
        <IonInput  className='añadirItem' required={true} spellCheck={true} clearInput={true} autocapitalize="sentences" type="text" name="Pregunta" placeholder="Pregunta" 
        onIonChange={(e) => setPregunta(e.target.value as string)}> </IonInput>
        </IonItem>
        <IonItem color="medium">
        <IonInput className='añadirItem'  required={true} spellCheck={true} clearInput={true} autocapitalize="sentences" type="text" name="Respuesta" placeholder="Respuesta" 
        onIonChange={(e) => setRespuesta(e.target.value as string)}> </IonInput>
        </IonItem>
            <IonItem className='mazoSelectContainer'>
                <IonSelect cancelText='Cancelar' interface='action-sheet' placeholder="Seleccione mazo" interfaceOptions={options}  onIonChange={(e) => cambiarMazo(e.detail.value)}>
                { mazos.map((mazo: IMazos,i: number) => (
                    <IonSelectOption key={i} value={MId[i]} class="mazo-option">{mazo.nombre}</IonSelectOption>
                    ))}
                </IonSelect>
            </IonItem>
            {limCartas > 0 && <>
                <IonButton color={"primary"} type="submit" expand="block"> Crear carta</IonButton>
                <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message= {stateMsg}
                duration={1500}
                />
            </>}
            {limCartas <= 0 && <>
                <IonButton color={"primary"} disabled={true} type="submit" expand="block"> Crear carta </IonButton>
                <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Ha alcanzado el limite de cartas nuevas por hoy, vuelva mañana"
                duration={1500}
                />
            </>}
            </IonList>
            </form>
            </IonContent>
        </IonPage>
    );
}
export default Carta;