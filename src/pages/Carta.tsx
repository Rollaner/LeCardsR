import { IonBackButton,IonButton,IonButtons,IonInput, IonList, IonContent,IonHeader,IonPage,IonTitle,IonToolbar, useIonViewDidLeave, IonItem} from '@ionic/react';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore, where, query, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import '../../src/theme/Carta.css';
import firebaseapp from '../firebase/firebaseconfig';

const Carta: React.FC = () => {
    const [mazo, DefinirMazo] = useState("");
    const [pregunta, DefinirPregunta] = useState("");
    const [respuesta, DefinirRespuesta] = useState("");
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore(firebaseapp);

    useIonViewDidLeave(() =>{
        DefinirPregunta("Placeholder")
        DefinirMazo("Placeholder")
        DefinirRespuesta("Placeholder")
    });


    // async function getMazos(){
    //     const q = query(collection(db,"ColeccionMazos"), where("uuid","==",user?.uid) ); 
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((mazo) =>{
    //         console.log(mazo.id + " =  " + mazo.get("nombre") );
    //         mazos.push(new mazoClase(mazo.get("nombre"),mazo.id ));
    //     });
        
    // }

    const idMazoPlaceholder = "1l6J4ud2K0ieomigEu7Q"
    
    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(pregunta, respuesta)
        alert(`La pregunta es ${pregunta}, La respuesta es ${respuesta} y el mazo es ${mazo}`)
        const cartaRef = addDoc(collection(db,"ColeccionMazos", idMazoPlaceholder,"Cartas"),{
            pregunta : pregunta,
            respuesta : respuesta
        }).then( () =>{
            console.log("yep yep " );
        });
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
        onIonChange={(e) => DefinirPregunta(e.target.value as string)}> </IonInput>
        </IonItem>
        <IonItem color="medium">
        <IonInput className='añadirItem'  required={true} spellCheck={true} clearInput={true} autocapitalize="sentences" type="text" name="Respuesta" placeholder="Respuesta" 
        onIonChange={(e) => DefinirRespuesta(e.target.value as string)}> </IonInput>
        </IonItem>
        <IonItem color="medium">
        <IonInput className='añadirItem' required={true} clearInput={true} autocapitalize="sentences" type="text" name="Nombremazo" placeholder="Mazo" 
        onIonChange={(e) => DefinirMazo(e.target.value as string)}> </IonInput>
        </IonItem>
        <IonButton color={"primary"} type="submit" expand="block"> Crear carta</IonButton>
            </IonList>
            </form>
            </IonContent>
        </IonPage>
    );
};

function CartaForm(){

}
export default Carta;