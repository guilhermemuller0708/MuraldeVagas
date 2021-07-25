import React, { useState, useEffect } from 'react';
import { findAllVacancy } from '../../redux/board/actions';
import './index.scss';

function ListVacancy() {
    const [data, setData] = useState([]);

    useEffect(() => {
        findAllVacancy().then(data => setData(data));
    }, [])

    return (
        <div className="container">
            <div className="col-12 generalStyle">
                <div>
                    <h1>Vagas disponíveis</h1>
                </div>
                <div className="backgroundStyle">
                    <div className="cardVacancy">
                        {data.map(vacancy => (
                            <div className="content" key={vacancy.id}>
                                <h2>{vacancy.titulo}</h2>
                                <p><strong>{`${vacancy.empresa} - R$ ${vacancy.salario},00`}</strong></p>
                                <p>{vacancy.descricao}</p>
                                <span>{vacancy.desejavel}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ListVacancy;