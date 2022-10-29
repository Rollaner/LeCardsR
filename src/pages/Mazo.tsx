import { IonBackButton,IonList,IonInput, IonButton,IonButtons ,IonContent,IonHeader,IonPage,IonTitle,IonToolbar, useIonViewDidLeave, IonItem} from '@ionic/react';
import { useState } from 'react';
import '../../src/theme/Mazo.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseapp from '../firebase/firebaseconfig';
import { arrayUnion, getFirestore, updateDoc } from 'firebase/firestore';
import { doc, getDoc } from "firebase/firestore";



const Mazo: React.FC = () => {
    
    const [nombre, DefinirNombre] = useState("");
    useIonViewDidLeave(() =>{
        DefinirNombre("Placeholder")
    });

    const auth = getAuth();
    let uid:String;
    
    onAuthStateChanged(auth, (user) => {
        if(user){
            uid = user.uid;
            // console.log(uid);
        }
    });

    const db = getFirestore(firebaseapp);    
    const mazosRef = doc(db, "Datos", "Mazos");
    
    const handleSubmit = (event:any) => {
        event.preventDefault();
        // console.log(nombre);
        // alert(`El nombre del mazo es: ${nombre}  el usuario es : ${uid}`);
        updateDoc(mazosRef, {
            Mazos : arrayUnion({
                "nombre" : nombre,
                "uuid" : uid,
            })
        });
        alert(`mazo de nombre : ${nombre} agregado al usuario de id : ${uid}`);
        event.target.reset();
    }


    return (
        <IonPage color="dark">
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle size="large" color={'primary'}>Nuevo Mazo</IonTitle>
                    <IonButtons slot="start" color='medium'>
                    <IonBackButton/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent color={'medium'}>
            <form onSubmit={handleSubmit}>
            <IonList lines="full">
                <IonItem color="medium">
                <IonInput className='añadirItem' required={true} spellCheck={true} autocapitalize="Sentences" type="text" placeholder="Nombre del mazo" 
                onIonChange={(e) => DefinirNombre(e.target.value as string)}> </IonInput>
                <IonButton color={"primary"} routerLink='/home' type="submit" expand="block">Crear mazo</IonButton>
                </IonItem>
            </IonList>
            </form>
            </IonContent>
        </IonPage>
    );
};
function MazoForm(){

}
export default Mazo;