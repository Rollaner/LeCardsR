import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton } from '@ionic/react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { arrayUnion, doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import firebaseapp from '../firebase/firebaseconfig';


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
            // createUserWithEmailAndPassword(auth, correo!, contraseña1!)
            // .then((userCredential) => {
            //     // Signed in
            //     const user = userCredential.user;
            //     alert("Usuario Creado");
            // })
            // .catch((error) => {
            //     const errorCode = error.code;
            //     const errorMessage = error.message;
            //     alert("No se pudo crear el usuario\n"+ errorCode + " ; " + errorMessage);    
            // });
            //REGISTRO A BASE DE DATOS, SOLO CON UN NOMBRE DE USUARIO PARA PROBAR CLOUD FIRESTORE
            const usuariosRef = doc(db,"Datos","Usuarios");
            await updateDoc(usuariosRef, {
                Usuarios : arrayUnion({ 
                "nombre" : username, 
                "uuid" : Math.random().toString(), 
                "correo" : correo})
            })
            
            alert("usuario creado");
            limpiarCampos();
        }
        else{
            alert("contraseñas deben ser iguales");
        }
    }
    function limpiarCampos(){
        setUsername("");
        setCorreo("");
        setContraseña1("");
        setContraseña2("");
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
            <IonLabel>Usuario</IonLabel>
            <IonInput value={username} placeholder="Usuario" required={true} type="text" autoCapitalize='off' onIonChange={e => setUsername(e.detail.value!)}></IonInput>           
            <IonLabel>Correo</IonLabel>
            <IonInput value={correo} placeholder="Correo" required={true} type="email" autoCapitalize='off' onIonChange={e => setCorreo(e.detail.value!)}></IonInput>           
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