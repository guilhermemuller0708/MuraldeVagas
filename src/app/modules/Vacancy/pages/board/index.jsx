import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import { FilterList } from '@material-ui/icons';

import { Search } from './components/Filters/Search';
import { SideBar } from './components/Filters/SideBar';
import List from './components/List';

import { actions, setFilters } from '../../redux/board/slice';

import './index.scss';

const VacancyPage = () => {
  const [fullPageFilter, setFullPageFilter] = useState(false);
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
      dispatch(actions.fetchVacancysFavorites());

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

  const closeFilterFullScreen = () => {
    setFullPageFilter((prevState) => !prevState);
  };

  return (
    <>
      <div className="wrapper-search">
        <Search />
        <div className="filter-list">
          <button onClick={closeFilterFullScreen}>
            <FilterList />
          </button>
        </div>
      </div>

      <div className="wrapper-board">
        <div className={`filter ${fullPageFilter ? 'filter-full-screen' : ''}`}>
          <SideBar closeFilterFullScreen={closeFilterFullScreen} />
        </div>
        <div className="board">
          <div className="list">
            <List entities={entities} key="list-vacancy" />
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
