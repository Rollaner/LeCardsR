import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton } from '@ionic/react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";


const Login: React.FC = () => {
    
    const [correo, setCorreo] = useState<string>();
    const [contraseña, setContraseña] = useState<string>();

    function handleSubmit(e:any){
        e.preventDefault()
        const auth = getAuth();
        signInWithEmailAndPassword(auth, correo!, contraseña!)
        .then((userCredential) => {
            // Signed in
            // const user = userCredential.user;
            // const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                alert("Has iniciado sesión \n User id :  " + uid);
                // ...
                //TODO 
                // mandarlo a home con uid, o el objeto user, no se aún.
                // luego en home armar la pagina con el uid, onda el listado de los mazos
            } else {
                // User is signed out
            }
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("ERROR \n " + errorCode + "\n" + errorMessage);
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
        <IonLabel>Correo</IonLabel>
        <IonItem color="medium">
        <IonInput className='usuario' value={correo} placeholder="Correo" required={true} type="email" autoCapitalize='off' onIonChange={e => setCorreo(e.detail.value!)}></IonInput>    
        </IonItem>       
        <IonLabel>Contraseña</IonLabel>
        <IonInput value={contraseña} placeholder="**********" required={true} type="password" autocapitalize='off' onIonChange={e => setContraseña(e.detail.value!)}></IonInput>        
        <IonButton type="submit">Login</IonButton>
            
    </form>   
    </IonContent> 
    
    </IonPage>

  );
};

export default Login;



