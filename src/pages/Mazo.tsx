import { IonBackButton,IonList,IonInput, IonButton,IonButtons ,IonContent,IonHeader,IonPage,IonTitle,IonToolbar} from '@ionic/react';
import './Mazo.css';
const Mazo: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle size="large">Nuevo Mazo</IonTitle>
                    <IonButtons slot="start">
                    <IonBackButton/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonList>
                <IonInput required={true} spellCheck={true} autocapitalize="Sentences" type="text" name="nombremazo" placeholder="Nombre del mazo"> </IonInput>
                <IonButton routerLink='/home' type="submit" expand="block">Crear mazo</IonButton>
            </IonList>
            </IonContent>
        </IonPage>
    );
};
function MazoForm(){

}
export default Mazo;