import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, arrayUnion, collection, doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import firebaseapp from '../firebase/firebaseconfig';
import '../../src/theme/registro.css';


const Registro: React.FC = () => {    
    const auth = getAuth();
    const [username, setUsername] = useState<string>();
    const [correo, setCorreo] = useState<string>();
    const [contraseña1, setContraseña1] = useState<string>();
    const [contraseña2, setContraseña2] = useState<string>();
    const db = getFirestore(firebaseapp);

    async function handleSubmit(submition:any){
        submition.preventDefault();
        //comparar contraseña uno con contraseña 2 
        if(contraseña1 === contraseña2){
            createUserWithEmailAndPassword(auth, correo!, contraseña1!)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                //agregar usuario al firestore
                const userRef = await addDoc(collection(db,"ColeccionUsuarios"),{
                    username: username,
                    correo: correo,
                } )
                alert("Usuario Creado");
                console.log("id usuario : " + userRef.id);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("No se pudo crear el usuario\n"+ errorCode + " ; " + errorMessage);    
            });
        }
        else{
            alert("contraseñas deben ser iguales");
        }
        limpiarCampos();   
    }
    function limpiarCampos(){
        setUsername("");
        setCorreo("");
        setContraseña1("");
        setContraseña2("");
    }

    return(
    <IonPage color="dark">
    <IonHeader>
        <IonToolbar color="dark">
            <IonTitle size="large" color={'primary'}>Crear cuenta</IonTitle>
            <IonButtons slot="start" color='medium'>
            <IonBackButton/>
            </IonButtons>
        </IonToolbar>
    </IonHeader>
    <IonContent fullscreen color={'medium'}>
    <div className="registroContainer">   
        <form onSubmit={handleSubmit} >
            <IonLabel>Correo</IonLabel>
            <IonItem color="medium" lines='full'>
            <IonInput className='usuario' value={correo} placeholder="Usuario" required={true} type="email" autocapitalize='off' onIonChange={e => setCorreo(e.detail.value!)}></IonInput> 
            </IonItem>          
            <IonLabel>Contraseña</IonLabel>
            <IonItem color="medium">
            <IonInput className='usuario' value={contraseña1} placeholder="**********" required={true} type="password" autocapitalize='off' onIonChange={e => setContraseña1(e.detail.value!)}></IonInput>  
            </IonItem>      
            <IonLabel>Confirme Contraseña</IonLabel>
            <IonItem color="medium">
            <IonInput className='usuario' value={contraseña2} placeholder="**********" required={true} type="password" autocapitalize='off' onIonChange={e => setContraseña2(e.detail.value!)}></IonInput>
            </IonItem>
            <IonButton type="submit">Crear usuario</IonButton>

        </form>
    </div>     
    </IonContent> 
    </IonPage>
  );
};

export default Registro;