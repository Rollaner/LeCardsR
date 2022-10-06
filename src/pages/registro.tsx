import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton } from '@ionic/react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const Registro: React.FC = () => {
    
    const auth = getAuth();
    const [correo, setCorreo] = useState<string>();
    const [contraseña1, setContraseña1] = useState<string>();
    const [contraseña2, setContraseña2] = useState<string>();

    function handleSubmit(submition:any){
        submition.preventDefault();
        //comparar contraseña uno con contraseña 2 
        if(contraseña1 === contraseña2){
            createUserWithEmailAndPassword(auth, correo!, contraseña1!)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                alert("Usuario Creado");
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
    }

    return(
    <IonPage>
    <IonHeader>
        <IonToolbar>
            <IonTitle>Crear cuenta</IonTitle>
        </IonToolbar>
    </IonHeader>
    <IonContent>
        <form onSubmit={handleSubmit} >
            <IonLabel>Correo</IonLabel>
            <IonInput value={correo} placeholder="Usuario" required={true} type="email" autoCapitalize='off' onIonChange={e => setCorreo(e.detail.value!)}></IonInput>           
            <IonLabel>Contraseña</IonLabel>
            <IonInput value={contraseña1} placeholder="**********" required={true} type="password" autocapitalize='off' onIonChange={e => setContraseña1(e.detail.value!)}></IonInput>        
            <IonLabel>Confirme Contraseña</IonLabel>
            <IonInput value={contraseña2} placeholder="**********" required={true} type="password" autocapitalize='off' onIonChange={e => setContraseña2(e.detail.value!)}></IonInput>
            <IonButton type="submit">Crear usuario</IonButton>
        </form>
    </IonContent> 
    </IonPage>

  );
};

export default Registro;