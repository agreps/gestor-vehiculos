import React from 'react';
import CarMap from './components/CarMap';
import CarTable from './components/CarTable';

const App = () => {
  return (
    <div>
      <h1>Gestor de Vehículos</h1>
      <CarTable />
      <CarMap />
    </div>
  );
};

export default App;
