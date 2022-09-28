import { IonButton,IonButtons, IonContent,IonPage, IonCard, IonCardContent} from '@ionic/react';
import './MazoComponent.css';
const CartaComponent: React.FC = () => {
    return(
        <div className='CartaComponent'>
            <IonCard>
             <IonCardContent>
                {/* Tenemos que definir como se veran los mazos dentro de la lista de mazos (Home) */}
                <p>Cartas!</p>
                <p>Y contenido!</p>
            </IonCardContent>
            </IonCard>
        </div>
    );
};


export default CartaComponent;