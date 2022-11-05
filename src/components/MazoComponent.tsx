
import { IonButton, IonItem, IonLabel } from '@ionic/react';
import './MazoComponent.css';


const MazoComponent: React.FC<{mazo: string, id:string}> = ({ mazo, id }) => {
    
    return(

        <div className='MazoComponent'>
            
                {/* Tenemos que definir como se veran los mazos dentro de la lista de mazos (Home) */}
                <IonItem color={'primary'} lines='inset' button={true} routerLink={'/review/' + id}>
                <IonLabel class="ion-text-center"><h4 className='mazoH4'>{mazo}</h4></IonLabel>
               </IonItem>
            
        </div>
    );
};


export default MazoComponent;