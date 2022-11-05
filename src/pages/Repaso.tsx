import { IonBackButton, IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonGrid,IonCard,IonButton,IonCol,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle, IonButtons, IonRow} from '@ionic/react';
import {useEffect, useState } from 'react';
import '../../src/theme/Repaso.css';
import firebaseapp from '../firebase/firebaseconfig';
import { arrayUnion, doc, getFirestore, getDoc, updateDoc, query, collection, getDocs } from "firebase/firestore";
import { useParams } from 'react-router-dom'
import CartaComponent from '../components/CartaComponent';

import MazoClass from '../class/MazoClass';

interface Iprops {
  pregunta: string;  
  respuesta: string; 
  respondida: boolean;  
}


const Repaso: React.FC = () => {
    const [dificultad, setDificultad] = useState(0);
    const [cartaRespondida, setRespondida] = useState(false); 
    const [cartaActual, setCartaActual] = useState(0);
    const [propsState, setPropsState] = useState<Iprops>({
      pregunta: "P",
      respuesta: "R",
      respondida: cartaRespondida
    });
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
    const mrepaso = new MazoRepaso("activo",id)
    let docStoreP:string 
    let docStoreR:string 
    useEffect(() => {  //esto llama a la funcion apenas se carga el componente
      (async () => {
        if(mrepaso.id){
          const q = query(collection(getFirestore(firebaseapp),"ColeccionMazos",mrepaso.id,"Cartas",));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach( (carta:any) =>{
            docStoreP = carta.get("pregunta"); docStoreR = carta.get("respuesta")  //se convierte en undefined apenas sale del hook, en consecuencia el array de cartas se vacia "magicamente"
            //probablemente no estemos usando firebase de la forma correcta (el query esta bien, solo falta evitar que se borran la data)
            mrepaso.cartas.push(new CartaClass(docStoreP,docStoreR))
          });
            if(mrepaso.cartas[cartaActual]){
              setPropsState({
                pregunta: mrepaso.cartas[cartaActual].pregunta,
                respuesta: mrepaso.cartas[cartaActual].respuesta,
                respondida: cartaRespondida
              })
            } 
        };
      })();
      return () => {
        
      };    
    }, []);

    function mostrarRespuesta(){
      setRespondida(true)
      setPropsState({
        pregunta: propsState.pregunta,
        respuesta: propsState.respuesta,
        respondida: true
      })
    }
    function resetarCarta(aux:number){ //esta tambien tiene que mover el array y cargar los datos de la nueva carta a los props
      setRespondida(false)
      setPropsState({
        pregunta: propsState.pregunta,
        respuesta: propsState.respuesta,
        respondida: false
      })
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
        <CartaComponent {...propsState}></CartaComponent> 
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