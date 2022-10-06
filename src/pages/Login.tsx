import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton } from '@ionic/react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


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
    <IonPage>
    <IonHeader>
        <IonToolbar>
            <IonTitle>Inicio de sesión</IonTitle>
        </IonToolbar>
    </IonHeader>
    <IonContent>
    <form onSubmit={handleSubmit}>
        <IonLabel>Usuario</IonLabel>
        <IonInput value={correo} placeholder="Usuario" required={true} type="text" autoCapitalize='off' onIonChange={e => setCorreo(e.detail.value!)}></IonInput>           
        <IonLabel>Contraseña</IonLabel>
        <IonInput value={contraseña} placeholder="**********" required={true} type="password" autocapitalize='off' onIonChange={e => setContraseña(e.detail.value!)}></IonInput>        
        <IonButton type="submit">Login</IonButton>
            
    </form>   
    </IonContent> 
    
    </IonPage>

  );
};

export default Login;



