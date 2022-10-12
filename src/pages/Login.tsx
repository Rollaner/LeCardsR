import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../../src/theme/Login.css';


const Login: React.FC = () => {
    
    const [correo, setCorreo] = useState<string>();
    const [contraseña, setContraseña] = useState<string>();

    function handleSubmit(e:any){
        e.preventDefault()
        const auth = getAuth();
        signInWithEmailAndPassword(auth, correo!, contraseña!)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert("Has iniciado sesión\n" + user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
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
        <IonList className='usuario' lines='none'>
        <IonLabel>Usuario</IonLabel>
        <IonItem color="medium">
        <IonInput className='usuario' value={correo} placeholder="Usuario" required={true} type="text" autoCapitalize='off' onIonChange={e => setCorreo(e.detail.value!)}></IonInput>    
        </IonItem>       
        <IonLabel>Contraseña</IonLabel>
        <IonItem color="medium">
        <IonInput className='usuario' value={contraseña} placeholder="**********" required={true} type="password" autoCapitalize='off' onIonChange={e => setContraseña(e.detail.value!)}></IonInput>  
        </IonItem>      
        <IonButton type="submit">Login</IonButton>
        </IonList>
        </form>   
    </div>
    </IonContent> 
    
    </IonPage>

  );
};

export default Login;



