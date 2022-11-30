import { IonAlert, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { cleanup } from '@testing-library/react';
import { SlowBuffer } from 'buffer';
import { collection, getDocs, getFirestore, where, query, addDoc, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { options } from 'ionicons/icons';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import firebaseapp from '../firebase/firebaseconfig';
import IMazos from '../interfaces/Imazo';


const MazoEdit: React.FC = () => {
    let indexer:any = [] //para guardar los ID de los mazos, asi no reescribo el codigo, al no ser un 
    //query snapshot map no funciona
    let data:any = []
    const [selected,setSelected] = useState(false)
    const [del, setDel] = useState(false)
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
                if(indexer.indexOf(change.doc.id) === -1){ 
                  indexer = [...indexer, change.doc.id]
                  data = [...data,change.doc.data()]
                  setMazos(data)
                  setId(indexer)
                }
            }
          });
        });
        }else{console.log("Sin suario valido");}
      })();
    }, [user]);


    const handleSelect = (event:any) => {
        setMazo(event)
        setSelected(true)
    } 

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        var aux = doc(db,"ColeccionMazos", mazo);
        await updateDoc(aux, {
          nombre: nombre
        });
        setSelected(false)
    } 

    const handleDelete = async () => {
        await deleteDoc(doc(db,"ColeccionMazos", mazo));
    }
    
    return(
        <IonPage color="dark">
      <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle size="large" color={'primary'}>Administrar Mazos</IonTitle>
                    <IonButtons slot="start" color='medium'>
                    <IonBackButton/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
      
      <IonContent fullscreen color={'medium'}>
      <IonItem className='mazoSelectContainer'>
                <IonSelect cancelText='Cancelar' interface='action-sheet' placeholder="Seleccione mazo para editar" interfaceOptions={options}  onIonChange={(e) => handleSelect(e.detail.value)}>
                { mazos.map((mazo: IMazos,i: number) => (
                    <IonSelectOption key={i} value={MId[i]} class="mazo-option">{mazo.nombre}</IonSelectOption>
                    ))}
                </IonSelect>
            </IonItem>
        {selected && <>
        <form  onSubmit={handleSubmit}>
            <IonList lines="full">
        <IonItem color="medium">
        <IonInput  className='añadirItem' required={true} spellCheck={true} clearInput={true} autocapitalize="sentences" type="text" name="Nombre" placeholder="Nombre" 
        onIonChange={(e) => setNombre(e.target.value as string)}> </IonInput>
        </IonItem>
        </IonList>
        <IonButton color={"danger"} type="button" onClick={() => setDel(true)} expand="block"> Eliminar mazo </IonButton>
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
        <IonButton color={"primary"} type="submit" expand="block"> Editar mazo </IonButton>
        </form>
        </>}
      </IonContent>
      </IonPage>
        
    );
};


export default MazoEdit;