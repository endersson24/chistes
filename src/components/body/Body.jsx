import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imagen from '../../assets/chuck.jpg';

export default function Body() {
    const [categoria, setCategoria] = useState([])
    const [categoriaActual, setCategoriaActual] = useState('')
    const [chisteActual, setChisteActual] = useState('Click that button...')

    const obtenerChiste = async () => {
        try {
            let url = 'https://api.chucknorris.io/jokes/random';
            if (categoriaActual !== "") {
                url = `https://api.chucknorris.io/jokes/random?category=${categoriaActual}`;
            }
            const response = await axios.get(url);
            setChisteActual(response.data.value);
        } catch (error) {
            console.error(error);
        }
    };



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://api.chucknorris.io/jokes/categories');
                setCategoria(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-1 col-sm-3">
                    </div>
                    <div className="col-xs-10 col-sm-6">
                        <div className='imgntext'>
                            <img src={imagen} alt="chuck Norris looking cool" className="imagen-pag" />
                            <h1> Chuck Norris dice...</h1>
                        </div>
                        <div className="jumbotron">
                            <div className="jumbotronContent">
                                <div className='conjunto'>
                                    <div className="seleccionar">
                                        <select className='select-control' value={categoriaActual} onChange={(e) => setCategoriaActual(e.target.value)}>
                                            <option value="">Seleccione una categoría</option>
                                            {categoria.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button className="btn btn-primary btn-lg morequotes" id="button" onClick={obtenerChiste}>Generar chiste</button>
                                </div>
                                <h2><i className="fa fa-quote-left"></i><span id="quote"></span><i className="fa fa-quote-right">"{chisteActual}"</i></h2><br /><br />
                            </div>
                        </div>
                    </div>
                    <div className="col=xs-1 col-sm-3">
                    </div>
                </div>
            </div>
        </>
    )
}