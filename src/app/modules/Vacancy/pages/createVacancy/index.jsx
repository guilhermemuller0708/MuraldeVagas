import { Field, Form, Formik } from 'formik';
import React from 'react';

function CreateVacancy() {


    return (
        <>
            <h1>Formulário para cadastro de vaga</h1>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    companyName: '',
                    address: '',
                    interestArea: '',
                    education: '',
                    requiredKnowledge: '',
                    differentialKnowledge: '',
                    benefit: '',
                    
                }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                <Form>


                    <label htmlFor="title">Empresa</label>
                    <Field id="title" name="title" placeholder="Digite um título" />

                    <label htmlFor="description">Descrição</label>
                    <Field id="description" name="description" placeholder="Escreva uma descrição sobre o trabalho a ser feito" />
                    
                    <label htmlFor="companyName">Empresa</label>
                    <Field id="companyName" name="companyName" placeholder="Digite sua empresa" />
                    
                    <label htmlFor="address">Endereço</label>
                    <Field id="address" name="address" placeholder="Avenida dos testes" />

                    <label htmlFor="interestArea">Área</label>
                    <Field
                        component="select"
                        id="interestArea"
                        name="interestArea"
                    >
                        <option value="DEV">Developer</option>
                        <option value="QA">Quality Assurance</option>
                        <option value="DS">Designer</option>
                    </Field>

                    <label htmlFor="education">Nível de escolaridade:</label>
                    <Field id="education" name="education" placeholder="Digite o nível de escolaridade" />

                    <label htmlFor="requiredKnowledge">Conhecimentos desejáveis</label>
                    <Field id="requiredKnowledge" name="requiredKnowledge" placeholder="Digite os conhecimentos requeridos" />

                    <label htmlFor="differentialKnowledge">Conhecimentos desejáveis</label>
                    <Field id="differentialKnowledge" name="differentialKnowledge" placeholder="Digite os conhecimentos diferenciais" />

                    <label htmlFor="benefit">Beneficios</label>
                    <Field id="benefit" name="benefit" placeholder="Benefícios" />

                    <button type="submit">Cadastrar</button>
                </Form>
            </Formik>
        </>
    );
};

export default CreateVacancy;