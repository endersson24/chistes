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
                url = `https://api.chucknorris.io/jokes/random?categoria=${categoria}`;
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
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-1 col-sm-3">
                    </div>
                    <div class="col-xs-10 col-sm-6">
                        <div className='imgntext'>
                            <img src="http://www.libertyclick.org/wp-content/uploads/2015/03/Chuck-Norris.jpg" alt="chuck Norris looking cool" className="img-circle img-responsive center-block" />
                            <h1> Chuck Norris dice...</h1>
                        </div>
                        <div class="jumbotron">
                            <div class="jumbotronContent">
                                <h2><i class="fa fa-quote-left"></i><span id="quote"></span><i class="fa fa-quote-right">"{chisteActual}"</i></h2><br /><br />
                                <button class="btn btn-primary btn-lg morequotes" id="button" onClick={obtenerChiste}>Generar chiste</button>
                                <div className="seleccionar">
                                    {categoria.map((cat) => {
                                        return (
                                            <div className="select-controles">
                                                <label for="opcion1" class="boton-radio" htmlFor={cat}>
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        value={cat}
                                                        id={cat}
                                                        onClick={() => setCategoriaActual(cat)}
                                                    />
                                                    {cat}
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col=xs-1 col-sm-3">
                    </div>
                </div>
            </div>
        </>
    )
}