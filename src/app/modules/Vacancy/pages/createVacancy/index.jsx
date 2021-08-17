import { TextField, MenuItem, Button, FormGroup } from '@material-ui/core';
import React from 'react';
import { useState, useContext } from 'react';
import ReactTagInput from "@pathofdev/react-tag-input";
import "./index.scss";
import "@pathofdev/react-tag-input/build/index.css";
import { useEffect } from 'react';
import { createVacancy, findAllAreas, findOneVacancy, editVacancy } from '../../redux/board/actions';
import VacancyContext from '../../context/vacancyContext';
import { Redirect } from 'react-router-dom';

function CreateVacancy() {
    const [areas, setAreas] = useState([]);
    const [areaOfVacancy, setAreaOfVacancy] = useState({ areaDaVaga: '' });
    const [vacancy, setVacancy] = useState({});
    const [benefits, setBenefits] = useState([])
    const [requiredKnowledge, setRequiredKnowledge] = useState([])
    const [differentialKnowledge, setDifferentialKnowledge] = useState([])

    const { vacancyID } = useContext(VacancyContext)

    // console.log(vacancyID);
    useEffect(() => {
        findAllAreas().then(data => setAreas(data));

        if (vacancyID !== 0) {
            findOneVacancy(vacancyID)
                .then(data => {
                    // console.log(data);
                    setVacancy({
                        description: data.descricao,
                        education: data.desejavel,
                        companyName: data.empresa,
                        address: data.enderecoEmpresa,
                        salary: data.salario,
                        title: data.titulo,
                    });
                    setRequiredKnowledge(data.requisitos);
                    setDifferentialKnowledge(data.diferenciais);
                    setBenefits(data.beneficios);
                    setAreaOfVacancy({ areaDaVaga: data.areaDaVaga.id })
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [vacancyID])



    const handleSubmit = (event) => {
        event.preventDefault();
        const areaOfVacancyChoosed = areas.find((area) => area.id === areaOfVacancy.areaDaVaga);
        const vacancyToAdd = { ...vacancy, benefits, requiredKnowledge, differentialKnowledge, areaOfVacancyChoosed }

        if (Object.keys(vacancyToAdd).length >= 10) {
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
            if (vacancyID !== 0) {

                editVacancy(vacancyID, convertVacancy).then(data => {


                    alert("Vaga editada com sucesso");
                    return (<Redirect to="/vacancy/all" />)
                }).catch(err => {
                    console.log(err);
                })
            } else {
                createVacancy(convertVacancy).then(data => {
                    console.log(data);
                    return alert("Vaga criada com sucesso");
                }).catch(err => {
                    console.log(err);
                })
            }
        } else {
            return alert('Preencha os campos com obrigatórios (*)')
        }
    }

    return (
        <>
            <div className="container">
                <div className="col-12 generalAddStyle">
                    <h1 className="titleStyle">Formulário para cadastro de vaga</h1>
                    <FormGroup className="backgroundStyle" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-4">
                                <TextField required id="title" variant="filled" label="Titulo" name="title" value={vacancy.title}
                                    onChange={(event) => setVacancy({ ...vacancy, title: event.target.value })} />
                            </div>
                            <div className="col-4 offset-col">
                                <TextField required variant="filled" id="companyName" label="Empresa" name="companyName" value={vacancy.companyName}
                                    onChange={(event) => setVacancy({ ...vacancy, companyName: event.target.value })} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <TextField required id="description" variant="filled" label="Descrição"
                                    multiline rows={4} name="description" value={vacancy.description}
                                    onChange={(event) => setVacancy({ ...vacancy, description: event.target.value })} />
                            </div>
                            <div className="col-4 offset-col">
                                <TextField
                                    id="interestArea"
                                    select
                                    variant="filled"
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
                                    placeholder="Adicione um beneficio *"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <TextField required id="address" variant="filled" label="Endereço" name="address" value={vacancy.address}
                                    onChange={(event) => setVacancy({ ...vacancy, address: event.target.value })} />
                            </div>
                            <div className="col-3">
                                <TextField required id="education" variant="filled" label="Nível de escolaridade" name="education" value={vacancy.education}
                                    onChange={(event) => setVacancy({ ...vacancy, education: event.target.value })} />
                            </div>
                            <div className="col-3 offset-col">
                                <TextField required id="salary" variant="filled" label="Salário" name="salary" value={vacancy.salary}
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
                                    placeholder="Adicione um conhecimento requerido *"
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
                                    placeholder="Adicione um conhecimento desejável *"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Button className="buttonStyle" type="submit" variant="contained" color="primary"
                                    onClick={handleSubmit} >
                                    {vacancyID !== 0 ? 'Salvar' : 'Cadastrar'}
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