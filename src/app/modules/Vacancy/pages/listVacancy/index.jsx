import React, { useState, useEffect } from 'react';
import { findAllVacancy, deleteVacancyById } from '../../redux/board/actions';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './index.scss';

function ListVacancy() {
    const [data, setData] = useState([]);

    useEffect(() => {
        findAllVacancy().then(data => setData(data));
    }, [])

    const deleteVacancy = (vacancyId) => {
        deleteVacancyById(vacancyId).then( console.log('Deletado com sucesso'));
    }

    return (
        <div className="container">
            <div className="col-12 generalStyle">
                {(data.length > 0) ? (<>
                    <div>
                        <h1>Vagas disponíveis</h1>
                    </div>
                    <div className="backgroundStyle">
                        {data.map(vacancy => (
                            <div className="cardVacancy row" key={vacancy.id}>
                                <div className="content col-10">
                                    <h2>{vacancy.titulo}</h2>
                                    <p><strong>{`${vacancy.empresa} - R$ ${vacancy.salario},00`}</strong></p>
                                    <p>{vacancy.descricao}</p>
                                    <span>{vacancy.desejavel}</span>
                                </div>
                                <div className="delete col-2">
                                    <IconButton>
                                        <EditIcon color="primary">edit</EditIcon>
                                    </IconButton>
                                    <IconButton onClick={() => {deleteVacancy(vacancy.id)}}>
                                        <DeleteForeverIcon color="secondary">delete</DeleteForeverIcon>
                                    </IconButton>
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