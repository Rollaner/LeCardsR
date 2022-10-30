import './CartaComponent.css';


const CartaComponent: React.FC<{pregunta: string, respuesta:string, respondida:boolean}> = ({pregunta,respuesta,respondida }) => {
    
    return(

        <div className='CartaComponent'>    
        {!respondida && <> <p>{pregunta}</p> </>}
        {respondida && <> <p>{respuesta}</p>  </>}
        </div>

        
    );
};


export default CartaComponent;