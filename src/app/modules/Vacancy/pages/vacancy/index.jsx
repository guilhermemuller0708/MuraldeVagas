import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Search } from './components/Filters/Search';
import { SideBar } from './components/Filters/SideBar';
import List from './components/List';

import { actions } from '../../redux/vacancy/slice';

import './index.scss';

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
          <List entities={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
        </div>
      </div>
    </>
  );
};

export default VacancyPage;
