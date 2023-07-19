import React, {useEffect, useState} from 'react';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavbarApp from './components/Navbar/NavbarApp';
import RouteLinks from './components/RouteLinks/RouteLinks';

import 'bootstrap/dist/css/bootstrap.css';

import "primeicons/primeicons.css";

export default function App() {
  const [isLoaded, setLoading] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
  }, []);

  return (
    <div className="App">
      {/* <React.StrictMode> */}
        <BrowserRouter>
        <div className='app-header'>
          <NavbarApp loaded={isLoaded} setLoading={setLoading}/>
        </div>
        <div className="app-body" >
          <RouteLinks loaded={isLoaded}/>
        </div>
        </BrowserRouter>
      {/* </React.StrictMode> */}
    </div>
  );
}