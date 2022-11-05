import { IonBackButton, IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonGrid,IonCard,IonButton,IonCol,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle, IonButtons, IonRow} from '@ionic/react';
import { useState } from 'react';
import '../../src/theme/Repaso.css';
import firebaseapp from '../firebase/firebaseconfig';
import { arrayUnion, doc, getFirestore, getDoc, updateDoc, query, collection, getDocs } from "firebase/firestore";
import { useParams } from 'react-router-dom'
import CartaComponent from '../components/CartaComponent';

import MazoClass from '../class/MazoClass';


const Repaso: React.FC = () => {
    const [dificultad, setDificultad] = useState(0);
    const [cartaRespondida, setRespondida] = useState(false);
    const handleSubmit = (event:any) => {
      event.preventDefault();
      alert(`The name you entered was: ${dificultad}`)}
    type mazoLoad = {id: string}
    const { id } = useParams<mazoLoad>()

    class CartaClass {
      constructor(public pregunta:string, public respuesta:string){}
    }
    class MazoRepaso extends MazoClass {
        public  cartas:CartaClass[] = []
    }

    var mazoRepaso:MazoRepaso;

    async function getDatosMazo(mazo:MazoRepaso){
      
      const q = query(collection(getFirestore(firebaseapp),"ColeccionMazos",mazo.id,"Cartas",));
      const querySnapshot = await getDocs(q);    
      querySnapshot.forEach( (carta) =>{
        mazo.cartas.push(new CartaClass(carta.get("pregunta"),carta.get("respuesta)")))
      });
    }

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
              <div className='RepasoDiv'>
              {/* Convendria hacer un componente funcional aqui para las cartas, no se me ocurre el layout de momento eso si, un simple parrafo quizas? */}
        <CartaComponent {...props}></CartaComponent> 
        { !cartaRespondida &&  <> <IonButton color="medium" onClick={ () => mostrarRespuesta()}>
          Mostrar respuesta
        </IonButton></> }
        </div>
        <div>
        { cartaRespondida &&      
        <><form className='autoeval' onSubmit={handleSubmit}>
              <IonButton className='autoevalButton'fill="solid" color={"success"} onClick={() => resetarCarta(1)}>Facil</IonButton>
              <IonButton className='autoevalButton'fill="solid" color={"secondary"} onClick={() => resetarCarta(2)}>Bueno</IonButton>
              <IonButton className='autoevalButton'fill="solid" color={"warning"} onClick={() => resetarCarta(3)}>Dificil</IonButton>
              <IonButton className='autoevalButton'fill="solid" color={"danger"} onClick={() => resetarCarta(4)}>Errado</IonButton>
          
        </form> </>} 
        </div>
        </IonContent>
        </IonPage>
    );
};
export default Repaso;