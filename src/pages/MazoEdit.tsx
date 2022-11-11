import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { collection, getDocs, getFirestore, where, query, addDoc, onSnapshot } from 'firebase/firestore';
import { options } from 'ionicons/icons';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import firebaseapp from '../firebase/firebaseconfig';
import IMazos from '../interfaces/Imazo';
import './MazoComponent.css';


const MazoEdit: React.FC = () => {
    let indexer:any = []
    let data:any = []
    const [mazos, setMazos] = useState([])
    const [mazo, setMazo] = useState("");
    const [nombre, setNombre] = useState("");
    const user = useContext(AuthContext)
    const [MId,setId] = useState([])
    const db = getFirestore(firebaseapp);


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
        
    } 
    
    return(
        <IonPage color="dark">
      <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle size="large" color={'primary'}>Nuevo Mazo</IonTitle>
                    <IonButtons slot="start" color='medium'>
                    <IonBackButton/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
      
      <IonContent fullscreen color={'medium'}>
      <IonItem className='mazoSelectContainer'>

                <IonSelect cancelText='Cancelar' interface='action-sheet' placeholder="Seleccione mazo para editar" interfaceOptions={options}  onIonChange={(e) => setMazo(e.detail.value)}>
                { mazos.map((mazo: IMazos,i: number) => (
                    <IonSelectOption key={i} value={MId[i]} class="mazo-option">{mazo.nombre}</IonSelectOption>
                    ))}
                </IonSelect>
            </IonItem>
      <form  onSubmit={handleSubmit}>
            <IonList lines="full">
        <IonItem color="medium">
        <IonInput  className='añadirItem' required={true} spellCheck={true} clearInput={true} autocapitalize="sentences" type="text" name="Pregunta" placeholder="Pregunta" 
        onIonChange={(e) => setNombre(e.target.value as string)}> </IonInput>
        </IonItem>
        </IonList>
        </form>
        
      </IonContent>
      </IonPage>
        
    );
};


export default MazoEdit;