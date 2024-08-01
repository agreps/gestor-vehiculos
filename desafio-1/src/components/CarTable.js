import React, { useEffect, useState } from 'react';
import './CarTable.css';

// Función para generar datos ficticios
const generateDummyCars = () => {
  const dummyCars = [];
  for (let i = 0; i < 100; i++) {
    dummyCars.push({
      class: 'midsize car',
      fuel_type: 'gas',
      make: 'toyota',
      model: `camry ${i}`,
      year: 1993 + (i % 10),
      transmission: i % 2 === 0 ? 'a' : 'm',
      city_mpg: 16 + (i % 10),
      highway_mpg: 22 + (i % 10),
      combination_mpg: 18 + (i % 10)
    });
  }
  return dummyCars;
};

const CarTable = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  const itemsPerPage = 20;

  useEffect(() => {
    const getCars = async () => {
      const carData = generateDummyCars();
      setCars(carData);
      setLoading(false);
    };
    getCars();
  }, []);

  const sortedCars = React.useMemo(() => {
    let sortableCars = [...cars];
    if (sortConfig.key !== '') {
      sortableCars.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Convertir a números si el campo es 'model'
        if (sortConfig.key === 'model') {
          aValue = parseInt(aValue.replace(/\D/g, ''));
          bValue = parseInt(bValue.replace(/\D/g, ''));
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCars;
  }, [cars, sortConfig]);

  const paginatedCars = sortedCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = name => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(cars.length / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = Math.ceil(cars.length / itemsPerPage);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <table className="car-table">
        <thead>
          <tr>
            <th onClick={() => requestSort('class')} className={getClassNamesFor('class')}>Tipo de Auto</th>
            <th onClick={() => requestSort('fuel_type')} className={getClassNamesFor('fuel_type')}>Tipo de Combustible</th>
            <th onClick={() => requestSort('make')} className={getClassNamesFor('make')}>Marca</th>
            <th onClick={() => requestSort('model')} className={getClassNamesFor('model')}>Modelo</th>
            <th onClick={() => requestSort('year')} className={getClassNamesFor('year')}>Año</th>
            <th onClick={() => requestSort('transmission')} className={getClassNamesFor('transmission')}>Tipo de Transmisión</th>
            <th onClick={() => requestSort('city_mpg')} className={getClassNamesFor('city_mpg')}>Consumo en Ciudad</th>
            <th onClick={() => requestSort('highway_mpg')} className={getClassNamesFor('highway_mpg')}>Consumo en Carretera</th>
            <th onClick={() => requestSort('combination_mpg')} className={getClassNamesFor('combination_mpg')}>Consumo Mixto</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCars.map((car, index) => (
            <tr key={index}>
              <td>{car.class}</td>
              <td>{car.fuel_type}</td>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.transmission}</td>
              <td>{car.city_mpg}</td>
              <td>{car.highway_mpg}</td>
              <td>{car.combination_mpg}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        <span>{currentPage} de {totalPages}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default CarTable;
