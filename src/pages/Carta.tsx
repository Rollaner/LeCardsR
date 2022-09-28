import { IonBackButton,IonButton,IonButtons,IonInput, IonList, IonContent,IonHeader,IonPage,IonTitle,IonToolbar} from '@ionic/react';
import { useState } from 'react';
import '..theme/Carta.css';
const Carta: React.FC = () => {
    const [Pregunta, setPregunta] = useState("");
    const [Respuesta, setRespuesta] = useState("");
    const [nombreMazo, setNombreMazo] = useState("");
    const handleSubmit = (event:any) => {
        event.preventDefault();
        alert(`The name you entered was: ${nombreMazo}`)}
    
    return (
        <IonPage color='dark'>
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle size="large">Nueva Carta</IonTitle>
                    <IonButtons color='medium' slot="start">
                        <IonBackButton/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form onSubmit={handleSubmit}>
            <IonList>
        <IonInput required={true} spellCheck={true} clearInput={true} autocapitalize="sentences" type="text" name="Pregunta" placeholder="Pregunta" 
        onIonChange={(e) => setPregunta(e.target.value as string)}> </IonInput>
        <IonInput required={true} spellCheck={true} clearInput={true} autocapitalize="sentences" type="text" name="Respuesta" placeholder="Respuesta" 
        onIonChange={(e) => setRespuesta(e.target.value as string)}> </IonInput>
        <IonInput required={true} clearInput={true} autocapitalize="sentences" type="text" name="Nombremazo" placeholder="Mazo" 
        onIonChange={(e) => setNombreMazo(e.target.value as string)}> </IonInput>
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