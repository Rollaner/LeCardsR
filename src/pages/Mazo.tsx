import { IonBackButton,IonList,IonInput, IonButton,IonButtons ,IonContent,IonHeader,IonPage,IonTitle,IonToolbar, useIonViewDidLeave} from '@ionic/react';
import { useState } from 'react';
import '../../src/theme/Mazo.css';
const Mazo: React.FC = () => {
    const [nombre, DefinirNombre] = useState("");
    useIonViewDidLeave(() =>{
        DefinirNombre("Placeholder")
    });

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(nombre)
        alert(`El nombre del mazo es: ${nombre}`)
        event.target.reset();
      }
    return (
        <IonPage color="dark">
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle size="large" color={'primary'}>Nuevo Mazo</IonTitle>
                    <IonButtons slot="start" color='medium'>
                    <IonBackButton/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent color={'medium'}>
            <form onSubmit={handleSubmit}>
            <IonList>
                <IonInput required={true} spellCheck={true} autocapitalize="Sentences" type="text" placeholder="Nombre del mazo" 
                onIonChange={(e) => DefinirNombre(e.target.value as string)}> </IonInput>
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