import { IonBackButton,IonButton,IonButtons,IonInput, IonList, IonContent,IonHeader,IonPage,IonTitle,IonToolbar, useIonViewDidLeave, IonItem, IonSelect, IonSelectOption, IonToast} from '@ionic/react';
import { collection, getDocs, getFirestore, where, query, addDoc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import '../../src/theme/Carta.css';
import { AuthContext } from '../context/AuthContext';
import firebaseapp from '../firebase/firebaseconfig';
import IMazos from '../interfaces/Imazo';


  const options = {
    cssClass: 'mazoSelect'
  };
const Carta: React.FC = () => {
    let data:any = []
    let indexer:any = [] //para guardar los ID de las cartas, asi no reescribo el codigo, al no ser un 
    //query snapshot map no funciona
    const [showMazoInput, setShowMazoInput] = useState(false)
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
    var time:any  
    useIonViewDidLeave(() =>{
        setPregunta("Placeholder")
        setMazo("Placeholder")
        setRespuesta("Placeholder")
    });

        //cargar mazos
    useEffect(() => {  (async () => { 
        if(user){ 
        const qpref = query(collection(getFirestore(firebaseapp),"ColeccionMazos",user!.uid,"Preferencias",));
        const q = query(collection(db,"ColeccionMazos"),where("uuid","==",user.uid));
        getDocs(qpref).then((prefSnapshot)=> {
            const prefs:any = prefSnapshot.docs.map( (doc:any) => ({...doc.data()}))
            setLimCartas(parseInt(prefs['limCartas']))
          })
        const unsub = onSnapshot(q, (querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              indexer = [...indexer, change.doc.id]
              data = [...data,change.doc.data()]
              setMazos(data)
              setId(indexer)
            }
          });
        });
        }else{console.log("Sin suario valido");}
      })();
    }, [user]);
    
    const handleSubmit = (event:any) => {
        event.preventDefault();
        if(showMazoInput){
            const mazoRef = addDoc(collection(db,"ColeccionMazos"),{
                nombre: mazo,
                uuid: user!.uid
            })}
        console.log(pregunta, respuesta)
        //alert(`La pregunta es ${pregunta}, La respuesta es ${respuesta} y el mazo es ${mazo}`)
        time = Date.now()
        const cartaRef = addDoc(collection(db,"ColeccionMazos", mazo,"Cartas"),{ //cambiar handle submit para que trabaje con nombre de mazo
            pregunta : pregunta,
            respuesta : respuesta,
            tiempo : time, //fecha de cracion
            cooldown: 15000 //timer 
        })
        let auxLim = limCartas
        auxLim--
        setLimCartas(auxLim)
        let auxString = "Puede agregar " + limCartas + " cartas hoy"
        setStateMsg(auxString)
        setShowMazoInput(false)
        setShowToast(true)
        event.target.reset();
      }
    const cambiarMazo = (event: any) => {
        if(event === true){
            setShowMazoInput(event)
            
        }else{setMazo(event)}
    } 
    const crearMazo = async (event:any) => {
        setMazo(event)
        event.target.reset();
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
                {!showMazoInput && <IonSelect cancelText='Cancelar' interface='action-sheet' placeholder="Seleccione mazo" interfaceOptions={options}  onIonChange={(e) => cambiarMazo(e.detail.value)}>
                { mazos.map((mazo: IMazos,i: number) => (
                    <IonSelectOption key={i} value={MId[i]} class="mazo-option">{mazo.nombre}</IonSelectOption>
                    ))}
                    <IonSelectOption key={"NuevoMazo"} value={true} class="mazo-option">Crear nuevo mazo</IonSelectOption>
                </IonSelect>}
                {showMazoInput && <>
                    <IonInput className='añadirItem' required={true} spellCheck={true} autocapitalize="Sentences" type="text" placeholder="Nombre del mazo" 
                    onIonChange={(e) => crearMazo(e.target.value as string)}></IonInput>
                </>}
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