import React, { useState, useEffect } from 'react';
import DevItem from './components/DevItem';
import DevForm  from './components/DevForm';

import './global.css';
import './App.css';
import './aside.css';
import './main.css';

import api from './services/api';


function App() {

  const [devs, setDevs] = useState([])

 

  async function handleSubmit(data) {

    const response = await api.post('/devs', data); 

    setDevs([...devs, response.data])
  }


  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')

      setDevs(response.data);
    }

    loadDevs();
  }, []);


  return (
    <div className="App">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (           
            <DevItem key={dev._id} dev={dev}/>
          ))}


        </ul>
      </main>
    </div>
  );
}

export default App;
