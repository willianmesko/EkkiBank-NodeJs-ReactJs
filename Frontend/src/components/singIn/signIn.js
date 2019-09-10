import React, {useState} from 'react';
import api from "../../services/api";
import {Link} from 'react-router-dom';
import { login } from "../../services/auth";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';


export default function Sign( history ) {
  const classes = useStyles();
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSignIn(e)  {
    e.preventDefault();
    if (!cpf || !password) {
      setError("Preencha o cpf e senha para continuar!");
    } else {
      try {
          const response = await api.post('/sessions', { cpf, password });
          history.props.push('/home');
           login(response.data.token);
         } catch (err) {
            setError("Houve um problema com o login, verifique suas credenciais.");
      }
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSignIn}>
            {error && error}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Cpf"
              value={cpf}
              onChange={e =>setCpf(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="senha"
              value={password}
              onChange={e =>setPassword(e.target.value)}
              label="Senha"
              type="password"
              id="password"
            
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
            <Grid container>
            
              <Grid item>
                <Link to='/signup'>
                  {"Não possui uma conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
           </form>
        </div>
      </Grid>
    </Grid>
  );
}
