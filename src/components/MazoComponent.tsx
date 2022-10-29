
import { IonButton } from '@ionic/react';
import './MazoComponent.css';


const MazoComponent: React.FC<{mazo: string}> = ({ mazo }) => {
    
    return(

        <div className='MazoComponent'>
            
                {/* Tenemos que definir como se veran los mazos dentro de la lista de mazos (Home) */}
               <IonButton routerLink='/repaso'  ><h4>{mazo}</h4></IonButton>
               
            
        </div>
    );
};


export default MazoComponent;