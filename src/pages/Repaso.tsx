import { IonBackButton, IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonButton, IonButtons, useIonViewDidEnter} from '@ionic/react';
import {useContext, useEffect, useState } from 'react';
import '../../src/theme/Repaso.css';
import firebaseapp from '../firebase/firebaseconfig';
import { arrayUnion, doc, getFirestore, getDoc, updateDoc, query, collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { useParams } from 'react-router-dom'
import CartaComponent from '../components/CartaComponent';
import { AuthContext } from '../context/AuthContext';

interface Iprops {
  pregunta: string;  
  respuesta: string; 
  respondida: boolean;  
}
type mazoLoad = {id: string}
class MazoRepaso {
  public  cartas:any[] = []
}

interface repasoList {
  data:any;
  tiempo: number;
  id: string,
  siguiente: repasoList | null 
}

function addToRepaso(data:any, tiempo:number, head:repasoList | null,id:string ):repasoList {
  if(!head){
    let newHead:repasoList = {
      data:data,
      tiempo: tiempo,
      id: id,
      siguiente: null 
    }
    return newHead
  }
  if(head.tiempo < tiempo){
  let newHead:repasoList = {
      data:data,
      tiempo: tiempo,
      id: id,
      siguiente: head 
    }
    return newHead
  }else{
    let node:repasoList = {
      data:data,
      tiempo: tiempo,
      id: id,
      siguiente: null
    }
    if(head.siguiente == null){
      head.siguiente = node
    }else{
      let aux = head.siguiente
      head.siguiente = addToRepaso(data,tiempo,aux,id)
    }
    return head
  }  
  
}

interface prefLoader {
  limTiempoActivo:boolean
  limTiempo:string
}

let cartaActual = 0; //index de la carta actual

const Repaso: React.FC = () => {
    const { id } = useParams<mazoLoad>()
    let repasoActual:repasoList //head del struct
    const [datosCartas, setDatosCartas] = useState([])
    const [cartaRespondida, setRespondida] = useState(false); 
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
          const q = query(collection(getFirestore(firebaseapp),"ColeccionMazos",id,"Cartas"));
          const qpref = doc(getFirestore(firebaseapp),"ColeccionMazos",user!.uid);
          const docSnap = await getDoc(qpref);
            setActivarTiempo(docSnap.get("limTiempoActivo"))
            if(activarTiempo){setTiempoLimite(docSnap.get("limTiempo"))}
          getDocs(q).then((querySnapshot) => {
            const data:any = querySnapshot.docs.map( (doc:any) => ({ ...doc.data(), id: doc.id }))
            setDatosCartas(data);
            let i = 0
            datosCartas.forEach(carta => {
              console.log(carta,carta[i],data[i].id)
              if(i == 0){repasoActual = addToRepaso(carta, carta[i]['cooldown'],null,data[i].id)}
              else {repasoActual = addToRepaso(carta, carta[i]['cooldown'],repasoActual,data[i].id)}
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
      setPropsState({
        pregunta: propsState.pregunta,
        respuesta: propsState.respuesta,
        respondida: true
      })
    }

    const resetarCarta = async (aux:number) => { //esta tambien tiene que mover el array y cargar los datos de la nueva carta a los props
      setRespondida(false)
  
      if (cartaActual < datosCartas.length){
      let espaciado = datosCartas[cartaActual]['cooldown']*aux
      var updater = doc(getFirestore(firebaseapp),"ColeccionMazos",id,"Cartas",datosCartas[cartaActual]["id"]);
        await updateDoc(updater, {
          cooldown: espaciado
        });  
      ++cartaActual
      setCurrentTime(Date.now) //conseguir tiempo actual
      //comparar t actual con t de creacion de la carta + cooldown
      if(datosCartas[cartaActual]['cooldown'] + datosCartas[cartaActual]['tiempo'] > currentTime){
        setPropsState({
          pregunta: "",
          respuesta: "",
          respondida: false})
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
      if(cartaActual == datosCartas.length){
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