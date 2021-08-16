import React, { useState, useEffect, useContext } from 'react';
import { findAllVacancy, deleteVacancyById } from '../../redux/board/actions';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './index.scss';
import VacancyContext from '../../context/vacancyContext';
import { Link } from 'react-router-dom';

function ListVacancy() {
    const [data, setData] = useState([]);
    const { setVacancyID } = useContext(VacancyContext)


    useEffect(() => {
        findAllVacancy().then(data => setData(data));
    }, [])

    const deleteVacancy = async (vacancyId) => {

        await deleteVacancyById(vacancyId).then(alert('Deletado com sucesso!'))
            .catch((err) => {
                console.log(err)
            });
        setData(data.filter(vacancy => vacancy.id !== vacancyId));
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
                                    {vacancy.requisitos.map(required => <span>{required}</span>)}
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