import React, { useState, useEffect } from "react";
import axios from 'axios';

function App() {
    const [registros, setRegistros] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        matricula: '',
        nombre: '',
        app: '',
        apm: '',
        fn: '',
        sexo: ''
    });

    useEffect(() => {
        fetchRegistros();
    }, []);

    const fetchRegistros = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/registros');
            setRegistros(response.data);
        } catch (error) {
            console.error('Error al obtener registros:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (formData.id) {
                await axios.put(`http://localhost:3000/api/registros/${formData.id}`, formData);
            } else {
                await axios.post('http://localhost:3000/api/registros', formData);
            }
            fetchRegistros();
            clearFormData();
        } catch (error) {
            console.error('Error al crear/editar el registro:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/registros/${id}`);
            fetchRegistros();
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    const handleEdit = (registro) => {
        setFormData({
            id: registro.id,
            matricula: registro.matricula,
            nombre: registro.nombre,
            app: registro.app,
            apm: registro.apm,
            fn: registro.fn,
            sexo: registro.sexo
        });
    };

    const clearFormData = () => {
        setFormData({
            id: null,
            matricula: '',
            nombre: '',
            app: '',
            apm: '',
            fn: '',
            sexo: ''
        });
    };

    return (
        <div class="container">
            <form onSubmit={handleSubmit}>
                <div class="container">
                    <h2>Formulario de {formData.id ? 'Editar' : 'Alta'}</h2>
                    <div class="mb-3">
                        <label lFor="FormImputMatricula" class="form-label">Matricula</label>
                        <input className="form-control" id="FormImputMatricula" placeholder="ejemplo: 0910493" type="text"
                            value={formData.matricula} onChange={(e) => setFormData({ ...formData, matricula: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label For="FormImputNombre" class="form-label">Nombre</label>
                        <input class="form-control" id="FormImputNombre" placeholder="ejemplo: Jorge Antonio" type="text"
                            value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label lFor="FormImputApp" class="form-label">Apellido Paterno</label>
                        <input class="form-control" id="FormImputApp" placeholder="ejemplo: Colin" type="text"
                            value={formData.app} onChange={(e) => setFormData({ ...formData, app: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label For="FormImputApm" class="form-label">Apellido Materno</label>
                        <input class="form-control" id="FormImputApm" placeholder="ejemplo: Gaytan" type="text"
                            value={formData.apm} onChange={(e) => setFormData({ ...formData, apm: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label For="FormImputFn" class="form-label">Fecha de Nacimiento</label>
                        <input class="form-control" id="FormImputFn" type="date"
                            value={formData.fn} onChange={(e) => setFormData({ ...formData, fn: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label For="FormImputSexo" class="form-label">Sexo</label>
                        <input class="form-control" id="FormImputSexo" placeholder="ejemplo: masculino" type="text"
                            value={formData.sexo} onChange={(e) => setFormData({ ...formData, sexo: e.target.value })} />
                    </div>

                    <button type="submit" class="btn btn-primary">
                        {formData.id ? 'Editar Registro' : 'Agregar Registro'}
                    </button>
                    &nbsp; &nbsp;
                    <button type="button" class="btn btn-danger" onClick={clearFormData}>Cancelar</button>
                </div>
            </form>
            <br /><br />
            <br />
            <h2>Lista de Alumnos Registrados</h2>
            <hr />
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Matricula</th>
                        <th scope="col">Alumno</th>
                        <th scope="col">Fecha N.</th>
                        <th scope="col">Sexo</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((registro) => (
                        <tr key={registro.id}>
                            <th scope="row">{registro.id}</th>
                            <td>{registro.matricula}</td>
                            <td>{registro.app + '' + registro.apm + ',' + registro.nombre}</td>
                            <td>{registro.fn}</td>
                            <td>{registro.sexo}</td>
                            <td>
                                <button class="btn btn-warning" onClick={() => handleEdit(registro)}>Editar</button>
                                &nbsp; &nbsp;
                                <button class="btn btn-danger" onClick={() => handleDelete(registro.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul>
                
            </ul>
        </div>
    );
}

export default App;
