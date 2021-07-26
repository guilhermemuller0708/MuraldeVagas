import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@material-ui/lab';

import { Search } from './components/Filters/Search';
import { SideBar } from './components/Filters/SideBar';
import List from './components/List';

import { actions, setFilters } from '../../redux/board/slice';

import './index.scss';

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
