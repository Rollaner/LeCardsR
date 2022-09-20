import { IonBackButton,IonList,IonInput, IonButton, IonContent,IonHeader,IonPage,IonTitle,IonToolbar} from '@ionic/react';
import './Mazo.css';
const Mazo: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle size="large">Nuevo Mazo</IonTitle>
                    <IonBackButton defaultHref="/Home" />
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonList>
                <IonInput type="text" name="nombremazo" placeholder="Nombre del mazo" v-model="nombre"> </IonInput>
                <IonButton  type="submit" expand="block">Crear mazo</IonButton>
            </IonList>
            </IonContent>
        </IonPage>
    );
};
function MazoForm(){

}
export default Mazo;