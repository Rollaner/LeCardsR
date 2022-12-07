import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonButtons, IonBackButton, IonAlert } from '@ionic/react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import '../../src/theme/Login.css';
import { useHistory } from 'react-router-dom';


const Login: React.FC = () => {    
    const [correo, setCorreo] = useState<string>();
    const [contraseña, setContraseña] = useState<string>();
    const [showAlert, setShowAlert] = useState(false);
    const [mensajeError,setMensajeError] = useState<string>();
    const [msjeHeader,setMsjeHeader] = useState<string>();


    const history = useHistory();
    function handleSubmit(e:any){
        e.preventDefault()
        const auth = getAuth();
        signInWithEmailAndPassword(auth, correo!, contraseña!)
        .then((userCredential) => {
            onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                history.push('/home');
            }
            });
        })
        .catch((error) => {
            switch(error.code){
                case "auth/wrong-password" : {
                    setMensajeError("Contraseña incorrecta")
                    break;
                }
                case "auth/invalid-email" : {
                    setMensajeError("Correo incorrecto/no valido")
                    break;
                }
                case "auth/user-disabled" : {
                    setMensajeError("Usuario bloqueado")
                    break;
                }
                case "auth/user-not-found" : {
                    setMensajeError("Usuario no encontrado")
                    break;
                }
            }
            setMsjeHeader("Error!")
            setShowAlert(true)
            limpiarCampos();
        });
    }
    function limpiarCampos(){
        setCorreo("");
        setContraseña("");
    }
    return(
    <IonPage color="dark">
    <IonHeader>
        <IonToolbar color="dark">
            <IonTitle size="large" color={'primary'}>Inicio de sesión</IonTitle>
            <IonButtons slot="start" color='medium'>
                    <IonBackButton/>
            </IonButtons>
        </IonToolbar>
    </IonHeader>
    <IonContent fullscreen color={'medium'}>
    <div className="loginContainer">
        <form onSubmit={handleSubmit}>
        <IonLabel>Correo</IonLabel>
        <IonItem color="medium">
        <IonInput className='usuario' value={correo} placeholder="Correo" required={true} type="text" autoCapitalize='off' onIonChange={e => setCorreo(e.detail.value!)}></IonInput>    
        </IonItem>       
        <IonLabel>Contraseña</IonLabel>
        <IonItem color="medium">
        <IonInput className='usuario' value={contraseña} placeholder="**********" required={true} type="password" autoCapitalize='off' onIonChange={e => setContraseña(e.detail.value!)}></IonInput>  
        </IonItem>  
        <div className='loginSubmit'>   
        <IonButton type="submit">Ingresar</IonButton>
        </div> 
        </form>   
    </div>
    <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={msjeHeader}
        message={mensajeError}
        buttons={['OK']}
      />    
    </IonContent> 
    </IonPage>
  );
};
export default Login;