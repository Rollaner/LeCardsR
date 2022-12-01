import { IonBackButton, IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonButton, IonButtons, useIonViewDidEnter} from '@ionic/react';
import {useContext, useEffect, useState } from 'react';
import '../../src/theme/Repaso.css';
import firebaseapp from '../firebase/firebaseconfig';
import { arrayUnion, doc, getFirestore, getDoc, updateDoc, query, collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { useParams } from 'react-router-dom'
import CartaComponent from '../components/CartaComponent';

import MazoClass from '../class/MazoClass';
import { AuthContext } from '../context/AuthContext';

interface Iprops {
  pregunta: string;  
  respuesta: string; 
  respondida: boolean;  
}
type mazoLoad = {id: string}
class MazoRepaso extends MazoClass {
  public  cartas:any[] = []
}

interface repasoList {
  data:any;
  tiempo: number;
  siguiente: repasoList | null 
}

function addToRepaso(data:any, tiempo:number, head:repasoList | null ):repasoList {
  if(!head){
    let newHead:repasoList = {
      data:data,
      tiempo: tiempo,
      siguiente: null 
    }
    return newHead
  }
  if(head.tiempo < tiempo){
  let newHead:repasoList = {
      data:data,
      tiempo: tiempo,
      siguiente: head 
    }
    return newHead
  }else{
    let node:repasoList = {
      data:data,
      tiempo: tiempo,
      siguiente: null
    }
    if(head.siguiente == null){
      head.siguiente = node
    }else{
      let aux = head.siguiente
      head.siguiente = addToRepaso(data,tiempo,aux)
    }
    return head
  }  
  
}

const Repaso: React.FC = () => {
    const { id } = useParams<mazoLoad>()
    let repasoActual:repasoList //head del struct
    const [datosCartas, setDatosCartas] = useState([])
    const [cartaRespondida, setRespondida] = useState(false); 
    const [cartaActual, setCartaActual] = useState(0); //index de la carta actual
    const [activarTiempo, setActivarTiempo] = useState(false);
    const [tiempoLimite, setTiempoLimite] = useState(20);
    const user = useContext(AuthContext)
    const [terminado, setTerminado] = useState(false);
    const [currentTime, setCurrentTime] = useState(Date.now())
    const [propsState, setPropsState] = useState<Iprops>({
      pregunta: "P",
      respuesta: "R",
      respondida: false
    });
    const handleSubmit = (event:any) => {
      event.preventDefault();
    console.log("Error de lógica, porfavor reinicie la aplicación")}
    useEffect(() => {  //esto llama a la funcion apenas se carga el componente
      (async () => {
        if(id){
          const q = query(collection(getFirestore(firebaseapp),"ColeccionMazos",id,"Cartas",));
          const qpref = await getDoc(doc(getFirestore(firebaseapp),"ColeccionMazos",user!.uid));
          const docSnap = qpref.data();
            setActivarTiempo(docSnap!['limTiempoActivo'])
            if(activarTiempo){setTiempoLimite(docSnap!['limTiempo'])}
          getDocs(q).then((querySnapshot) => {
            const data:any = querySnapshot.docs.map( (doc:any) => ({ ...doc.data(), id: doc.id }))
            setDatosCartas(data);
            let i = 0
            datosCartas.forEach(carta => {
              if(i == 0){repasoActual = addToRepaso(carta, carta[i]['cooldown'],null)}
              else {repasoActual = addToRepaso(carta, carta[i]['cooldown'],repasoActual)}
            });
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

    useIonViewDidEnter(() => {
      if(activarTiempo){
        setTimeout(mostrarRespuesta,tiempoLimite*1000);
      console.log('tiempo limite activo');
      }
    });

    function mostrarRespuesta(){
      setRespondida(true)
      console.log(datosCartas)
      setPropsState({
        pregunta: datosCartas[cartaActual]['pregunta'],
        respuesta: datosCartas[cartaActual]['respuesta'],
        respondida: true
      })
    }

    async function resetarCarta(aux:number){ //esta tambien tiene que mover el array y cargar los datos de la nueva carta a los props
      setRespondida(false)
      let i = cartaActual
      while (i < datosCartas.length){
      let espaciado = datosCartas[cartaActual]['cooldown']*aux
      var updater = doc(getFirestore(firebaseapp),"ColeccionMazos",id,"Cartas",datosCartas[cartaActual][id]);
        await updateDoc(updater, {
          cooldown: espaciado
        });  
      setCartaActual( i++)
      setCurrentTime(Date.now) //conseguir tiempo actual
      //comparar t actual con t de creacion de la carta + cooldown
      if(datosCartas[cartaActual]['cooldown'] + datosCartas[cartaActual]['tiempo'] > currentTime){
        setPropsState({
          pregunta: "",
          respuesta: "",
          respondida: false})
          setTerminado(true)
          break
      }
      setPropsState({
        pregunta: datosCartas[cartaActual]['pregunta'],
        respuesta: datosCartas[cartaActual]['respuesta'],
        respondida: false
      })
      if(activarTiempo){
        setTimeout(mostrarRespuesta,tiempoLimite*1000);
      console.log('tiempo limite activo');
      }
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
              <IonButton className='autoevalButton'fill="solid" color={"success"} onClick={() => resetarCarta(3)}>Facil</IonButton>
              <IonButton className='autoevalButton'fill="solid" color={"secondary"} onClick={() => resetarCarta(2)}>Bueno</IonButton>
              <IonButton className='autoevalButton'fill="solid" color={"warning"} onClick={() => resetarCarta(1)}>Dificil</IonButton>
              <IonButton className='autoevalButton'fill="solid" color={"danger"} onClick={() => resetarCarta(0.5)}>Errado</IonButton>
          
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