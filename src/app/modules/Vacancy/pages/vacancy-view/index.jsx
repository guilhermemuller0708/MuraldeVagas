import { useEffect } from 'react';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import { ArrowBack, Money } from '@material-ui/icons';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import Loader from 'app/components/Loader';

import { actions } from '../../redux/board/slice';

import './index.scss';

const VacancyView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const { vacancyForView, actionsLoading } = useSelector(
    ({ board }) => ({
      vacancyForView: board.vacancyForView,
      actionsLoading: board.actionsLoading
    }),
    shallowEqual
  );

  useEffect(() => {
    const promise = dispatch(actions.fetchVacancyById(id));

    return () => {
      promise.abort();
    };
  }, [id, dispatch]);

  if (!vacancyForView || actionsLoading) {
    return <Loader />;
  }

  const backToVacancyList = () => {
    history.push(`/vacancy/`);
  };

  return (
    <div className="wrapper-view">
      <div className="back">
        <span onClick={backToVacancyList}>
          <ArrowBack />
        </span>
        <div>
          <WhatsappShareButton separator=":: " url={String(window.location)}>
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>
        </div>
      </div>
      <div className="content">
        <span className="area">{vacancyForView?.areaDaVaga?.areaDaVaga}</span>
        <h3>{vacancyForView.titulo}</h3>
        <span className="salary">
          <Money /> {vacancyForView.salario}
        </span>
        <div className="company">
          <span>{vacancyForView.empresa}</span>
          <span>{vacancyForView.enderecoEmpresa}</span>
        </div>
        <div>
          <p>{vacancyForView.descricao}</p>
        </div>
        <div>
          <p>Benefícios:</p>
          <div className="benefit">
            {vacancyForView.beneficios.map((beneficio, index) => {
              return <span key={index}>{beneficio}</span>;
            })}
          </div>
          <p>Requisitos:</p>
          <div className="requirements">
            {vacancyForView.requisitos.map((requisito, index) => {
              return <span key={index}>{requisito}</span>;
            })}
          </div>
          <p>Diferenciais:</p>
          <div className="differentials">
            {vacancyForView.diferenciais.map((diferencial, index) => {
              return <span key={index}>{diferencial}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyView;
