import React, { useEffect, useState } from 'react';
import axios from 'axios';
import imagen from '../../assets/chuck.jpg';

function Body() {
    const [categoria, setCategoria] = useState();
    const [categoriaActual, setCategoriaActual] = useState('');
    const [chisteActual, setChisteActual] = useState('Click');

    useEffect(() => {
        axios.get('https://api.chucknorris.io/jokes/categories').then((res) => {
            setCategoria(res.data);
        });
    }, [chisteActual]);



    return (
        <div>Body</div>
    )
}

export default Body