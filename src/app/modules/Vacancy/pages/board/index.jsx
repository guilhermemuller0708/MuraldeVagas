import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@material-ui/lab';

import { Search } from './components/Filters/Search';
import { SideBar } from './components/Filters/SideBar';
import List from './components/List';

import { actions, setFilters } from '../../redux/board/slice';

import './index.scss';
import axios from 'axios';

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

  const {
    entities = [],
    filter,
    totalCount
  } = useSelector(
    ({ board }) => ({
      entities: board.entities.items,
      totalCount: board.entities.totalCount,
      filter: board.filter
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

  const handleChangePaginator = (_, value) => {
    dispatch(setFilters({ page: value }));
  };

  if (entities.length === 0) {
    return (
      <>
        <div className="empty-list">
          <div>Ops não foi encontrado nenhuma vaga</div>
        </div>
      </>
    );
  }

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
          <div className="list">
            <List entities={entities} />
          </div>

          <div className="paginator">
            <Pagination
              count={totalCount}
              page={filter.page}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePaginator}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VacancyPage;
