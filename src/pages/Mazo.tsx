import { IonBackButton,IonList,IonInput, IonButton,IonButtons ,IonContent,IonHeader,IonPage,IonTitle,IonToolbar} from '@ionic/react';
import { useState } from 'react';
import '..theme/Mazo.css';
const Mazo: React.FC = () => {
    const [nombreMazo, setNombreMazo] = useState("");
    const handleSubmit = (event:any) => {
        event.preventDefault();
        alert(`The name you entered was: ${nombreMazo}`)}
    return (
        <IonPage color="dark">
            <IonHeader>
                <IonToolbar>
                    <IonTitle size="large">Nuevo Mazo</IonTitle>
                    <IonButtons slot="start" color='medium'>
                    <IonBackButton/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <form onSubmit={handleSubmit}>
            <IonList>
                <IonInput required={true} spellCheck={true} autocapitalize="Sentences" type="text" placeholder="Nombre del mazo" 
                onIonChange={(e) => setNombreMazo(e.target.value as string)}> </IonInput>
                <IonButton color={"primary"} routerLink='/home' type="submit" expand="block">Crear mazo</IonButton>
            </IonList>
            </form>
            </IonContent>
        </IonPage>
    );
};
function MazoForm(){

}
export default Mazo;