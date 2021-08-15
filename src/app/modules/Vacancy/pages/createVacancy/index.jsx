import { TextField, MenuItem, Button, FormGroup } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import "./index.scss";

function CreateVacancy() {
    const [vacancy, setVacancy] = useState({});


    const handleSubmit = (event) => {
        console.log(vacancy);
        event.preventDefault();
    }

    const TagsInput = props => {
        const [tags, setTags] = React.useState(props.tags);
        const removeTags = indexToRemove => {
            setTags([...tags.filter((_, index) => index !== indexToRemove)]);
        };
        const addTags = event => {
            if (event.target.value !== "") {
                setTags([...tags, event.target.value]);
                event.target.value = "";
            }
        };
        return (
            <div className="tags-input">
                <ul id="tags">
                    {tags.map((tag, index) => (
                        <li key={index} className="tag">
                            <span className='tag-title'>{tag}</span>
                            <span className='tag-close-icon'
                                onClick={() => removeTags(index)}
                            >
                                x
                            </span>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                    placeholder="Adicione um novo beneficio"
                />
            </div>
        );
    };

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
                                    name="interestArea"
                                    label="Área de atuação"

                                // value={currency}
                                // onChange={handleChange}
                                >
                                    {/* {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))} */}
                                    <MenuItem>
                                        Developer
                                    </MenuItem>
                                    <MenuItem>
                                        Quality Assurance
                                    </MenuItem>
                                    <MenuItem>
                                        Designer
                                    </MenuItem>
                                </TextField>
                                <TagsInput id="benefit" label="Beneficios" name="benefit"
                                    onChange={(event) => setVacancy({ ...vacancy, benefit: [event.target.value] })} tags={['Nodejs', 'MongoDB']} />
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

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <TextField required id="requiredKnowledge" label="Conhecimentos requeridos"
                                    multiline rows={4} name="requiredKnowledge"
                                    onChange={(event) => setVacancy({ ...vacancy, requiredKnowledge: [event.target.value] })} />
                            </div>
                            <div className="col-5">
                                <TextField required id="differentialKnowledge" label="Conhecimentos desejáveis"
                                    multiline rows={4} name="differentialKnowledge"
                                    onChange={(event) => setVacancy({ ...vacancy, differentialKnowledge: [event.target.value] })} />
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