import React, {useState, useEffect} from 'react';
import api from "../../../services/api";
import clsx from 'clsx';
import { logout } from "../../../services/auth";
import useStyles from './styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Deposits from '../deposit/index';
import Transactions from '../transactions/index';
import Contacts from '../contacts/index.js';


export default function Dashboard({history}) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [user, setUser] = useState([]);
  const [transaction, setTransaction] = useState('');

  useEffect(() => {
      async function loadUser() {
          const response = await api.get('/user');
          setUser(response.data);
        }
        loadUser();
      },[transaction]);

    function handleLogout () {
    logout();
    history.push("/");
  };



  return (
    <div className={classes.root}>
      <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar)}>
          <Toolbar className={classes.toolbar}>

            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Banco Ekki
            </Typography>
              <Typography color="inherit">
                Conta - {user.account_number}
              </Typography>
              <IconButton color="inherit" onClick={handleLogout}>
                Sair
            </IconButton>
          </Toolbar>
       </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Transações  */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
              <Transactions transaction={transaction} />
              </Paper>
            </Grid>
            {/* Recent Deposi */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits
                user={user}  />
              </Paper>
            </Grid>
            {/* Contatos */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                  <Contacts transaction={transaction} setTransaction={setTransaction}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
