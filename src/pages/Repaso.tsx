import { IonBackButton, IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonGrid,IonCard,IonButton,IonCol,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle, IonButtons} from '@ionic/react';
import { useState } from 'react';
import '../../src/theme/Repaso.css';
import firebaseapp from '../firebase/firebaseconfig';
import { arrayUnion, doc, getFirestore, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom'
import CartaComponent from '../components/CartaComponent';


const Repaso: React.FC = () => {
    const [dificultad, setDificultad] = useState(0);
    const [cartaRespondida, setRespondida] = useState(false);
    const handleSubmit = (event:any) => {
      event.preventDefault();
      alert(`The name you entered was: ${dificultad}`)}
    type mazoLoad = {mazo: string}
    const { mazo } = useParams<mazoLoad>()
    var cartas:any[]
    var props = {
      pregunta: "p",
      respuesta: "r",
      respondida: cartaRespondida  
    }
    function mostrarRespuesta(){
      setRespondida(true)
      props.respondida = true
    }
    function resetarCarta(aux:number){ //esta tambien tiene que mover el array y cargar los datos de la nueva carta a los props
      setRespondida(false)
      props.respondida = false;
      setDificultad(aux)
    }
    return (
        <IonPage color="dark">
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle size="large" color={'primary'}>Repaso</IonTitle>
                    <IonButtons slot="start" color='medium'>
                    <IonBackButton/>
                  </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen color={'medium'}>
              {/* Convendria hacer un componente funcional aqui para las cartas, no se me ocurre el layout de momento eso si, un simple parrafo quizas? */}
        <CartaComponent {...props}></CartaComponent> 
        <IonButton color="medium" onClick={ () => mostrarRespuesta()}>
          Mostrar respuesta
        </IonButton>
        { cartaRespondida &&      
        <><form onSubmit={handleSubmit}><IonGrid>
              <IonCol><IonButton color={"success"} onClick={() => resetarCarta(1)}>Facil</IonButton></IonCol>
              <IonCol><IonButton color={"secondary"} onClick={() => resetarCarta(2)}>Bueno</IonButton></IonCol>
              <IonCol><IonButton color={"warning"} onClick={() => resetarCarta(3)}>Dificil</IonButton></IonCol>
              <IonCol><IonButton color={"danger"} onClick={() => resetarCarta(4)}>Errado</IonButton></IonCol>
            </IonGrid>
        </form> </>} 
        </IonContent>
        </IonPage>
    );
};
export default Repaso;