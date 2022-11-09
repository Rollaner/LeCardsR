import { IonBackButton, IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonButton, IonButtons} from '@ionic/react';
import {useEffect, useState } from 'react';
import '../../src/theme/Repaso.css';
import firebaseapp from '../firebase/firebaseconfig';
import { arrayUnion, doc, getFirestore, getDoc, updateDoc, query, collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { useParams } from 'react-router-dom'
import CartaComponent from '../components/CartaComponent';

import MazoClass from '../class/MazoClass';

interface Iprops {
  pregunta: string;  
  respuesta: string; 
  respondida: boolean;  
}
type mazoLoad = {id: string}
class MazoRepaso extends MazoClass {
  public  cartas:any[] = []
}

///interfaz carta: tiene que sedr un finger tree o zipper

const Repaso: React.FC = () => {
    const { id } = useParams<mazoLoad>()
    //let mrepaso = new MazoRepaso("activo",id)
    const [datosCartas, setDatosCartas] = useState([])
    const [dificultad, setDificultad] = useState(0);
    const [cartaRespondida, setRespondida] = useState(false); 
    const [cartaActual, setCartaActual] = useState(0);
    const [terminado, setTerminado] = useState(false);
    const [propsState, setPropsState] = useState<Iprops>({
      pregunta: "P",
      respuesta: "R",
      respondida: false
    });
    const handleSubmit = (event:any) => {
      event.preventDefault();
      alert(`The name you entered was: ${dificultad}`)}
    useEffect(() => {  //esto llama a la funcion apenas se carga el componente
      (async () => {
        if(id){
          const q = query(collection(getFirestore(firebaseapp),"ColeccionMazos",id,"Cartas",));
          getDocs(q).then((querySnapshot) => {
            const data:any = querySnapshot.docs.map( (doc:any) => ({ ...doc.data(), id: doc.id }))
            setDatosCartas(data);
            if(data[cartaActual]){
              setPropsState({
                pregunta: data[cartaActual]['pregunta'],
                respuesta: data[cartaActual]['respuesta'],
                respondida: cartaRespondida
              })
            } 
          })
        }
      })();
      return () => {
        
      };    
    }, []);

    function mostrarRespuesta(){
      setRespondida(true)
      console.log(datosCartas)
      setPropsState({
        pregunta: datosCartas[cartaActual]['pregunta'],
        respuesta: datosCartas[cartaActual]['respuesta'],
        respondida: true
      })
    }
    function resetarCarta(aux:number){ //esta tambien tiene que mover el array y cargar los datos de la nueva carta a los props
      setRespondida(false)
      let i = cartaActual
      while (i < datosCartas.length){
      setPropsState({
        pregunta: datosCartas[cartaActual]['pregunta'],
        respuesta: datosCartas[cartaActual]['respuesta'],
        respondida: false
      })
      setDificultad(aux)
      setCartaActual( i++)
      }
      if(i == datosCartas.length){
        setPropsState({
        pregunta: "",
        respuesta: "",
        respondida: false})
        setTerminado(true)
      }
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
            {!terminado && <>
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
        </>}
        {terminado && 
        <>
          <div>
            <h2> Repaso terminado!</h2>
          </div>
        </>
        }
        </IonContent>
        </IonPage>
    );
};
export default Repaso;