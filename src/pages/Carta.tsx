import { IonBackButton,IonButton,IonInput, IonList, IonContent,IonHeader,IonPage,IonTitle,IonToolbar} from '@ionic/react';
import './Carta.css';
const Carta: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle size="large">Nueva Carta</IonTitle>
                    <IonBackButton defaultHref="/Home" />
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonList>
        <IonInput type="text" name="Pregunta" placeholder="Pregunta" v-model="value1"> </IonInput>
        <IonInput type="text" name="Respuesta" placeholder="Respuesta" v-model="value2"> </IonInput>
        <IonInput type="text" name="Nombremazo" placeholder="Mazo" v-model="mazo"> </IonInput>
        <IonButton type="submit" expand="block"> Crear carta</IonButton>
            </IonList>
            </IonContent>
        </IonPage>
    );
};

function CartaForm(){

}
export default Carta;