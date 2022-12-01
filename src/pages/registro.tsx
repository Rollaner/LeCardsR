import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonButtons, IonBackButton, IonAlert } from '@ionic/react';
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
    const [showAlert, setShowAlert] = useState(false);
    const [mensajeError,setMensajeError] = useState<string>();

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
                if(user){
                    const userRef = await addDoc(collection(db,"ColeccionUsuarios"),{
                        username: correo,
                        correo: correo,
                        racha: 0
                    } )
                    setMensajeError("Usuario creado con exito!");
                    setShowAlert(true);
                }
            })
            .catch((error) => {
                    switch(error.code){
                        case "auth/email-already-in-use" : {
                            setMensajeError("email ya esta ocupado");
                            break;
                        }
                        case "auth/invalid-email" : {
                            setMensajeError("E-mail invalido");
                            break;
                        }
                        case "auth/operation-not-allowed" : {
                            setMensajeError("operacion no permitida");
                            break;
                        }
                        case "auth/email-already-in-use" : {
                            setMensajeError("email ya esta ocupado");
                            break;
                        }
                        case "auth/weak-password" : {
                            setMensajeError("Contraseña muy debil");
                            break;
                        }
                    }
                    setShowAlert(true);
            });
        }
        else{
            setMensajeError("contraseñas deben ser iguales");
            setShowAlert(true);
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
    <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="ERROR"
        message={mensajeError}
        buttons={['OK']}
      />        
    </IonContent> 
    </IonPage>
  );
};

export default Registro;