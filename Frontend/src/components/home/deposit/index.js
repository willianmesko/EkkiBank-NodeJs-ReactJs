import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../title/index'


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({user}) {

  const intlMonetary = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  });

  const classes = useStyles();


return (
  <React.Fragment>
      <Title>Saldo Disponível</Title>
      <Typography component="p" variant="h4">
        {intlMonetary.format(user.balance)}
      </Typography>

      <Typography color="error" className={classes.depositContext}>
         <span>  Limite: {intlMonetary.format(user.limit)} </span>
      </Typography>

      <Typography color="textSecondary" className={classes.depositContext}>
        <span>  Conta: {user.account_number} </span>
      </Typography>
   </React.Fragment>

  );
}
