import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../fuctions';

function ShowAlumnos() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
                show_alerta('Error al cargar datos', 'error', ''); // Mostrar alerta al usuario en caso de error
            }
        };
        fetchData();
    }, []);

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-12 col-lg-12 offset-lg-12'>
                        <div className='table-responsive'>
                            <table className='table table-condensed'>
                                <thead>
                                    <tr>
                                        <th>N°</th>
                                        <th>Nombre</th>
                                        <th>Alias</th>
                                        <th>Email</th>
                                        <th>Telefono</th>
                                        <th>URL</th>
                                        <th>Direccion</th>
                                        <th>Empresa</th>
                                    </tr>
                                </thead>
                                <tbody className='Table-group-divider'>
                                    {data.length === 0 ? (
                                        <tr>
                                            <td colSpan="8">Cargando...</td>
                                        </tr>
                                    ) : (
                                        data.map(dato => (
                                            <tr key={dato.id}>
                                                <td>{dato.id}</td>
                                                <td>{dato.name}</td>
                                                <td>{dato.username}</td>
                                                <td>{dato.email}</td>
                                                <td>{dato.phone}</td>
                                                <td>{dato.website}</td>
                                                <td>{`${dato.address.street}, ${dato.address.suite}, CP ${dato.address.zipcode}, ${dato.address.city}`}</td>
                                                <td>{dato.company.name}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowAlumnos;
