import { IonAlert, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { collection, getDocs, getFirestore, where, query, addDoc, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { options } from 'ionicons/icons';
import '../../src/theme/CartaEdit.css';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import firebaseapp from '../firebase/firebaseconfig';
import IMazos from '../interfaces/Imazo';
import { useHistory } from 'react-router-dom';

interface ICartas {
    pregunta : string,
    respuesta : string,
    id : string
}

const CartaEdit: React.FC = () => {
    let indexer:any = [] //para guardar los ID de los mazos, asi no reescribo el codigo, al no ser un 
    //query snapshot map no funciona
    let data:any = []
    const history = useHistory();
    const [selected,setSelected] = useState(false)
    const [del, setDel] = useState(false)
    const [mazos, setMazos] = useState([])
    //const [mazo, setMazo] = useState("");
    const [cartas, setCartas] = useState([])
    const [carta, setCarta] = useState("");
    const [pregunta, setPregunta] = useState("");
    const [respuesta, setRespuesta] = useState("");
    const user = useContext(AuthContext)
    const [MId,setId] = useState([])
    const [CId,setCId] = useState([])
    const db = getFirestore(firebaseapp);
    let mazo = ''

    //Cargar datos mazos usuario loggeado
    useEffect(() => {  (async () => { 
        if(user){ 
        const q = query(collection(db,"ColeccionMazos"),where("uuid","==",user.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                if(indexer.indexOf(change.doc.id) === -1){ 
                  indexer = [...indexer, change.doc.id]
                  data = [...data,change.doc.data()]
                  setMazos(data)
                  setId(indexer)
                }
            }
          });
        });
        }else{console.log("Sin usario valido");}
      })();
    }, [user]);

    //agarra mazos para poblar select de cartas
    const handleMazoSelect = async (event:any) => {
       mazo = event
        if(user){ 
            const q = query(collection(db,"ColeccionMazos",event,"Cartas",));
            const unsub = onSnapshot(q, (querySnapshot) => {
              querySnapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    if(indexer.indexOf(change.doc.id) === -1){ 
                      indexer = [...indexer, change.doc.id]
                      data = [...data,change.doc.data()]
                      setCartas(data)
                      console.log(cartas)
                      setCId(indexer)
                      console.log(indexer)
                    }
                }
              });
            });
            }else{console.log("Sin usario valido");}
    } 
    //agarra carta individual
    const handleCardSelect = (event:any) => {
        setCarta(event)
        console.log(carta)
        setSelected(true)
    } 
    //Aplica cambios a carta individual
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        var aux = doc(db,"ColeccionMazos",mazo,"Cartas",carta);
        await updateDoc(aux, {
          pregunta: pregunta,
          respuesta: respuesta
        });
        history.push('/home')
        setSelected(false)
        
    } 

    const handleDelete = async () => {
        await deleteDoc(doc(db,"ColeccionMazos", mazo));
    }
    
    return(
        <IonPage color="dark">
      <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle size="large" color={'primary'}>Administrar cartas</IonTitle>
                    <IonButtons slot="start" color='medium'>
                    <IonBackButton/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
      
      <IonContent fullscreen color={'medium'}>
        <IonItem className='mazoSelectContainer'>
            <IonSelect cancelText='Cancelar' interface='action-sheet' placeholder="Seleccione mazo para comenzar" interfaceOptions={options}  onIonChange={(e) => handleMazoSelect(e.detail.value)}>
            { mazos.map((mazo: IMazos,i: number) => (
                <IonSelectOption key={i} value={MId[i]} class="mazo-option">{mazo.nombre}</IonSelectOption>
                ))}
            </IonSelect>
        </IonItem>
        <IonItem className='mazoSelectContainer'>
            <IonSelect cancelText='Cancelar' interface='action-sheet' placeholder="Seleccione una carta" interfaceOptions={options}  onIonChange={(e) => handleCardSelect(e.detail.value)}>
            { cartas.map((carta: ICartas,i: number) => (
                <IonSelectOption key={i} value={CId[i]} class="mazo-option">{carta.pregunta}</IonSelectOption>
                ))}
            </IonSelect>
        </IonItem>    
        {selected && <>
        <form  onSubmit={handleSubmit}>
            <IonList lines="full">
                <IonItem color="medium">
                    <IonInput  className='añadirItem' required={true} spellCheck={true} clearInput={true} autocapitalize="sentences" type="text" name="Pregunta" placeholder="Pregunta" 
                    onIonChange={(e) => setPregunta(e.target.value as string)}> </IonInput>Respuesta
                </IonItem>
                <IonItem color="medium">
                    <IonInput  className='añadirItem' required={true} spellCheck={true} clearInput={true} autocapitalize="sentences" type="text" name="Respuesta" placeholder="Respuesta" 
                    onIonChange={(e) => setRespuesta(e.target.value as string)}> </IonInput>
                </IonItem>
            </IonList>
            <IonButton color={"primary"} type="submit" expand="block"> Editar Carta </IonButton>
            <div className="delete-Button">
            <IonButton color={"danger"} type="button" onClick={() => setDel(true)} expand="block"> Eliminar carta </IonButton>
            </div>
            <IonAlert
                isOpen={del}
                onDidDismiss={() => setDel(false)}
                header="Alert"
                subHeader="Important message"
                backdropDismiss = {false}
                message="Esta accion es permanente, ¿esta seguro que desea continuar?"
                buttons={[{
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'alert-button-cancel',
                  },
                  {
                    text: 'Si',
                    role: 'confirm',
                    cssClass: 'alert-button-confirm',
                    handler: () => {
                        handleDelete();
                      },
                  },]}
            />
        </form>
        </>}
      </IonContent>
      </IonPage>
        
    );
};


export default CartaEdit;