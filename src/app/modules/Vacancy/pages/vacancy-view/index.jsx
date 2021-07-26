import { useParams } from 'react-router-dom';

const VacancyView = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default VacancyView;
