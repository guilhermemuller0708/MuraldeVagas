import React, { useState, useEffect, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { findAllVacancy, deleteVacancyById } from '../../redux/board/actions';
import VacancyContext from '../../context/vacancyContext';
import './index.scss';

function ListVacancy() {
    const [data, setData] = useState([]);
    const { setVacancyID } = useContext(VacancyContext)
    const history = useHistory();
    useEffect(() => {
        findAllVacancy().then(data => setData(data));

        setVacancyID(0);
    }, [setVacancyID]);

    const handleClickVacancy = (vacancyId) => {
        history.push(`/vacancy/${vacancyId}/view`);
    };

    const deleteVacancy = async (vacancyId) => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Você quer apagar essa vaga?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim!',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteVacancyById(vacancyId)
                    .then(() => {
                        Swal.fire(
                            'Sua vaga foi deletada!!.'
                        )
                        setData(data.filter(vacancy => vacancy.id !== vacancyId));
                    }).catch((err) => {
                        console.log(err)
                    });
            } else {
                Swal.close();
            }
        })
    }

    return (
        <div className="container">
            <div className="col-12 generalStyle">
                {(data.length > 0) ? (<>
                    <div className="headerListVacancy">
                        <h1>Vagas disponíveis</h1>
                        <Button variant="contained">
                            <Link to="/vacancy/new">Cadastrar vaga</Link>
                        </Button>
                    </div>
                    <div className="backgroundStyle">
                        {data.map(vacancy => (
                            <div className="cardVacancy row" key={vacancy.id} >
                                <div className="content col-10" onClick={() => handleClickVacancy(vacancy.id)}>
                                    <h2>{vacancy.titulo}</h2>
                                    <p><strong>{`${vacancy.empresa} - R$ ${vacancy.salario},00`}</strong></p>
                                    <p>{vacancy.descricao}</p>
                                    {vacancy.requisitos.map((required, index) => <span key={index}>{required}</span>)}
                                </div>
                                <div className="delete col-2">
                                    <IconButton onClick={() => setVacancyID(vacancy.id)}>
                                        <Link to="/vacancy/edit">
                                            <EditIcon color="primary">
                                                edit
                                            </EditIcon>
                                        </Link>
                                    </IconButton>
                                    <IconButton onClick={() => { deleteVacancy(vacancy.id) }}>
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