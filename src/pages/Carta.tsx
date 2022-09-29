import { IonBackButton,IonButton,IonButtons,IonInput, IonList, IonContent,IonHeader,IonPage,IonTitle,IonToolbar, useIonViewDidLeave} from '@ionic/react';
import { useState } from 'react';
import '../../src/theme/Carta.css';
const Carta: React.FC = () => {
    const [mazo, DefinirMazo] = useState("");
    const [pregunta, DefinirPregunta] = useState("");
    const [respuesta, DefinirRespuesta] = useState("");
    
    useIonViewDidLeave(() =>{
        DefinirPregunta("Placeholder")
        DefinirMazo("Placeholder")
        DefinirRespuesta("Placeholder")
    });

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(pregunta, respuesta)
        alert(`La pregunta es ${pregunta}, La respuesta es ${respuesta} y el mazo es ${mazo}`)
        event.target.reset();
      }
    
    return (
        <IonPage color='dark'>
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle size="large" color={'primary'}>Nueva Carta</IonTitle>
                    <IonButtons color='medium' slot="start">
                        <IonBackButton/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent color={'medium'}>
                <form onSubmit={handleSubmit}>
            <IonList>
        <IonInput required={true} spellCheck={true} clearInput={true} autocapitalize="sentences" type="text" name="Pregunta" placeholder="Pregunta" 
        onIonChange={(e) => DefinirPregunta(e.target.value as string)}> </IonInput>
        <IonInput required={true} spellCheck={true} clearInput={true} autocapitalize="sentences" type="text" name="Respuesta" placeholder="Respuesta" 
        onIonChange={(e) => DefinirRespuesta(e.target.value as string)}> </IonInput>
        <IonInput required={true} clearInput={true} autocapitalize="sentences" type="text" name="Nombremazo" placeholder="Mazo" 
        onIonChange={(e) => DefinirMazo(e.target.value as string)}> </IonInput>
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