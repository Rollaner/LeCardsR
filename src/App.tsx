import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Carta from './pages/Carta';
import Mazo from './pages/Mazo';
import Ajustes from './pages/Ajustes';
import Repaso from './pages/Repaso';
import Login from './pages/Login';
import Registro from './pages/registro';
import { useState } from 'react';
import MazoEdit from './pages/MazoEdit';
import CartaEdit from './pages/CartaEdit';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/registro">
          <Registro />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/ncard">
          <Carta />
        </Route>
        <Route exact path="/ndeck">
          <Mazo />
        </Route>
        <Route exact path="/edeck">
          <MazoEdit/>
        </Route>
        <Route exact path="/ecard">
          <CartaEdit/>
        </Route>
        <Route exact path="/preferences">
          <Ajustes />
        </Route>
        <Route exact path="/review/:id">
          <Repaso />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
          <Home />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
