
import { IonButton, IonItem, IonLabel } from '@ionic/react';
import './MazoComponent.css';


const MazoComponent: React.FC<{mazo: string}> = ({ mazo }) => {
    
    return(

        <div className='MazoComponent'>
            
                {/* Tenemos que definir como se veran los mazos dentro de la lista de mazos (Home) */}
                <IonItem color={'primary'} lines='inset' button={true} routerLink={'/review/' + mazo}>
                <IonLabel class="ion-text-center"><h4 className='mazoH4'>{mazo}</h4></IonLabel>
               </IonItem>
            
        </div>
    );
};


export default MazoComponent;