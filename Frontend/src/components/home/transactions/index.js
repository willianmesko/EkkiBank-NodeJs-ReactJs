import React, {useState, useEffect} from 'react';
import api from "../../../services/api";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../title/index';
import moment from 'moment';


const intlMonetary = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2
});



export default function Trasactions({transaction, contact}) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function loadTransactions() {
       const response = await api.get('/transactions');
       setTransactions(response.data);
          }
       loadTransactions();
         },[transaction, contact]);


  return (

    <React.Fragment>
      <Title>Transações Recentes</Title>
        {transactions.length > 0 ? (
            <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Contato</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Tipo</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell>{moment(transaction.created_at.split("T")[0]).format("DD/MM/YYYY")}</TableCell>
                  <TableCell>{transaction.contact_name.toUpperCase()}</TableCell>
                  <TableCell>{intlMonetary.format(transaction.value)}</TableCell>
                  <TableCell>Transferência</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        ): (
            <div>Nenhuma transação recente realizada</div>
        )}

    </React.Fragment>
  );
}
