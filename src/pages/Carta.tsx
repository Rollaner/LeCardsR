import { IonBackButton,IonButton,IonButtons,IonInput, IonList, IonContent,IonHeader,IonPage,IonTitle,IonToolbar} from '@ionic/react';
import './Carta.css';
const Carta: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle size="large">Nueva Carta</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonList>
        <IonInput required={true} spellCheck={true} clearInput={true} autocapitalize="sentences" type="text" name="Pregunta" placeholder="Pregunta" > </IonInput>
        <IonInput required={true} spellCheck={true} clearInput={true} autocapitalize="sentences" type="text" name="Respuesta" placeholder="Respuesta" > </IonInput>
        <IonInput required={true} clearInput={true} autocapitalize="sentences" type="text" name="Nombremazo" placeholder="Mazo" > </IonInput>
        <IonButton type="submit" expand="block"> Crear carta</IonButton>
            </IonList>
            </IonContent>
        </IonPage>
    );
};

function CartaForm(){

}
export default Carta;