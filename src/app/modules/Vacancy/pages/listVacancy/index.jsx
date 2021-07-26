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
                {(data.length > 0) ? (<>
                    <div>
                        <h1>Vagas disponíveis</h1>
                    </div>
                    <div className="backgroundStyle">
                        {data.map(vacancy => (
                            <div className="cardVacancy"  key={vacancy.id}>
                                <div className="content">
                                    <h2>{vacancy.titulo}</h2>
                                    <p><strong>{`${vacancy.empresa} - R$ ${vacancy.salario},00`}</strong></p>
                                    <p>{vacancy.descricao}</p>
                                    <span>{vacancy.desejavel}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
                ) : <div className="noContent"><h2>Nenhuma vaga cadastrada!!!</h2></div>}
            </div>
        </div >
    );
}

export default ListVacancy;