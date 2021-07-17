import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Search } from './components/Filters/Search';
import { SideBar } from './components/Filters/SideBar';
import List from './components/List';

import { actions } from '../../redux/vacancy/slice';

import './index.scss';

const entitie = {
  id: 1,
  isFavorite: true,
  descricao: `Linguagem de Programação: Java 8+ com Spring Boot Conhecimento e
    experiência com bancos de dados SQL Server Experiência com
    webservices, principalmente REST Desenvolvimento de testes: unitário
    TDD Conhecimento de arquitetura Cloud (Azure), Clean Architecture
    Conhecimento das ferramentas Atlassian (J`,
  empresa: 'Empresa x',
  requisitos: ['NodeJS', 'React'],
  salario: '3.000,00',
  titulo: 'Desenvolvedor(a) Java Back-end',
  areaDaVaga: { nomeArea: 'Back-end' }
};

const VacancyPage = () => {
  const dispatch = useDispatch();

  const { entities, filter } = useSelector(
    ({ vacancy }) => ({
      entities: vacancy.entities.items,
      filter: vacancy.filter
    }),
    shallowEqual
  );

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const promise = dispatch(actions.fetchVacancys(filter));

      return () => {
        promise.abort();
      };
    }, 500);
    return () => {
      clearTimeout(delaySearch);
    };
  }, [dispatch, filter]);

  return (
    <>
      <div className="wrapper-search">
        <Search />
      </div>

      <div className="wrapper-board">
        <div className="filter">
          <SideBar />
        </div>
        <div className="board">
          <List entities={[entitie, entitie]} />
        </div>
      </div>
    </>
  );
};

export default VacancyPage;
