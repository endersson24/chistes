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
        <div className="body-wrapper">
            <img className="body-img" src={imagen} alt="chuck norris" />
            <div className="body-joke-area">{chisteActual}</div>
            <div className="body-button-wrapper">
                <button className="body-joke-button" onClick={obtenerChiste}>
                    Get Joke
                </button>
            </div>
            <div className="body-radio-wrapper">
                {categoria.map((cat) => {
                    return (
                        <div className="body-radio-button">
                            <input
                                type="radio"
                                name="radio"
                                value={cat}
                                id={cat}
                                onClick={() => setCategoriaActual(cat)}
                            />
                            <label htmlFor={cat}>{cat}</label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}