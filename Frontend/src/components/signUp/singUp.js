import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import api from "../../services/api";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import  useStyles  from './styles';
import Container from '@material-ui/core/Container';

export default function SignUp(history) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSignUp(e)  {
    e.preventDefault();

    if (!name || !cpf || !password || !cellphone)  {
      setError("Preencha todos os dados para se cadastrar" );
    } else {
      try {
        await api.post("/user", { name, cpf, cellphone, password });
        history.props.push('/');
      } catch (err) {
        setError("Use um CPF válido com 11 dígitos")
      }
    }
  };

   return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastre - se
        </Typography>
        <form className={classes.form} onSubmit={handleSignUp} noValidate>
            {error && error}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="Nome"
                variant="outlined"
                required
                fullWidth
                value={name}
                onChange={e =>setName(e.target.value)}
                id="Nome"
                label="Nome"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                type="number"
                required
                fullWidth
                value={cpf}
                onChange={e =>setCpf(e.target.value)}
                id="cpf"
                label="cpf"
                name="cpf"

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="number"
                value={cellphone}
                onChange={e =>setCellphone(e.target.value)}
                id="cellphone"
                label="Celular"
                name="cellphone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={password}
                onChange={e =>setPassword(e.target.value)}
                name="password"
                label="Senha"
                type="password"
                id="senha"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Cadastrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to={'/'} variant="body2">
               Já possui uma conta? Entre
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}
