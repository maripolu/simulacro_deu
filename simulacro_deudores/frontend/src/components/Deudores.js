import React, {  useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import ListadoDeudores from './ListadoDeudores.js'

const Deudores = () => {
  const { register, handleSubmit } = useForm();
  
  const [lista, setLista] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.get('http://localhost:4000/api/deudores', {
        params: data
      });
      
      console.log(response.data)

      setLista(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
     <h1>Deudores</h1>
     <hr />
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Descripcion:</label>
              <input type="text" className="form-control" {...register('DeudorDescripcion')} />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio:</label>
              <select className="form-select" {...register('MontoAdeudado')}>
                <option value="">Todos</option>
                <option value="5320">5320</option>
                <option value="97853">97853</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>
      {lista && <ListadoDeudores lista={lista} />}
    </div>
  );
};

export default Deudores;
