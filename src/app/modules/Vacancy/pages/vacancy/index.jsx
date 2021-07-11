import { Grid, makeStyles, Paper } from '@material-ui/core';
import { Filter } from './components/Filter';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '4rem'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const VacancyPage = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Filter />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default VacancyPage;
