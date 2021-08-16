import { TextField, MenuItem, Button, FormGroup } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import ReactTagInput from "@pathofdev/react-tag-input";
import "./index.scss";
import "@pathofdev/react-tag-input/build/index.css";
import { useEffect } from 'react';
import { createVacancy, findAllAreas } from '../../redux/board/actions';

function CreateVacancy() {
    const [areas, setAreas] = useState([]);
    const [areaOfVacancy, setAreaOfVacancy] = useState({ areaDaVaga: '' });
    const [vacancy, setVacancy] = useState({});
    const [benefits, setBenefits] = useState([])
    const [requiredKnowledge, setRequiredKnowledge] = useState([])
    const [differentialKnowledge, setDifferentialKnowledge] = useState([])


    useEffect(() => {
        findAllAreas().then(data => setAreas(data));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const areaOfVacancyChoosed = areas.find((area) => area.id === areaOfVacancy.areaDaVaga);
        const vacancyToAdd = { ...vacancy, benefits, requiredKnowledge, differentialKnowledge, areaOfVacancyChoosed }

        console.log(vacancyToAdd);

        const convertVacancy = {
            areaDaVaga: areaOfVacancyChoosed,
            beneficios: vacancyToAdd.benefits,
            descricao: vacancyToAdd.description,
            desejavel: vacancyToAdd.education,
            diferenciais: vacancyToAdd.differentialKnowledge,
            requisitos: vacancyToAdd.requiredKnowledge,
            empresa: vacancyToAdd.companyName,
            enderecoEmpresa: vacancyToAdd.address,
            salario: vacancyToAdd.salary,
            titulo: vacancyToAdd.title,
        }

        createVacancy(convertVacancy).then(data => {
            console.log(data);
            return alert("Vaga criada com sucesso");
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <>
            <div className="container">
                <div className="col-12 generalAddStyle">
                    <h1 className="titleStyle">Formulário para cadastro de vaga</h1>
                    <FormGroup className="backgroundStyle" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-4">
                                <TextField required id="title" label="Titulo" name="title"
                                    onChange={(event) => setVacancy({ ...vacancy, title: event.target.value })} />
                            </div>
                            <div className="col-4 offset-col">
                                <TextField required id="companyName" label="Empresa" name="companyName"
                                    onChange={(event) => setVacancy({ ...vacancy, companyName: event.target.value })} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <TextField required id="description" label="Descrição"
                                    multiline rows={4} name="description"
                                    onChange={(event) => setVacancy({ ...vacancy, description: event.target.value })} />
                            </div>
                            <div className="col-4 offset-col">
                                <TextField
                                    id="interestArea"
                                    select
                                    label="Área de atuação"
                                    value={areaOfVacancy.areaDaVaga}
                                    onChange={(event) => { setAreaOfVacancy({ areaDaVaga: event.target.value }) }}
                                >
                                    {areas.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.areaDaVaga}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <ReactTagInput
                                    tags={benefits}
                                    required
                                    id="benefit"
                                    name="benefit"
                                    onChange={(newTags) => setBenefits(newTags)}
                                    removeOnBackspace={true}
                                    placeholder="Adicione um beneficio"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <TextField required id="address" label="Endereço" name="address"
                                    onChange={(event) => setVacancy({ ...vacancy, address: event.target.value })} />
                            </div>
                            <div className="col-3">
                                <TextField required id="education" label="Nível de escolaridade" name="education"
                                    onChange={(event) => setVacancy({ ...vacancy, education: event.target.value })} />
                            </div>
                            <div className="col-3 offset-col">
                                <TextField required id="salary" label="Salário" name="salary"
                                    onChange={(event) => setVacancy({ ...vacancy, salary: event.target.value })} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <ReactTagInput
                                    tags={requiredKnowledge}
                                    required
                                    id="requiredKnowledge"
                                    name="requiredKnowledge"
                                    onChange={(newRequired) => setRequiredKnowledge(newRequired)}
                                    removeOnBackspace={true}
                                    placeholder="Adicione um conhecimento requerido"
                                />
                            </div>
                            <div className="col-5">
                                <ReactTagInput
                                    tags={differentialKnowledge}
                                    required
                                    id="differentialKnowledge"
                                    name="differentialKnowledge"
                                    onChange={(newDifferential) => setDifferentialKnowledge(newDifferential)}
                                    removeOnBackspace={true}
                                    placeholder="Adicione um conhecimento desejável"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Button className="buttonStyle" type="submit" variant="contained" color="primary"
                                    onClick={handleSubmit} >
                                    Cadastrar
                                </Button>
                            </div>
                        </div>
                    </FormGroup>
                </div>
            </div>
        </>
    );
};

export default CreateVacancy;