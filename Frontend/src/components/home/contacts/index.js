import React, {useState, useEffect} from 'react';
import api from '../../../services/api'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles  from './styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditContactModal from '../modals/editContact';
import NewContactModal from '../modals/newContact';
import TransactionModal from '../modals/transaction';
import TextField from '@material-ui/core/TextField';
import CPF from 'cpf';


export default function Contacts({setTransaction, transaction}) {
  const [contact, setContact] = useState('');
  const [contacts, setContacts] = useState([]);
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [error, setError] = useState('');
  const classes = useStyles();

    useEffect(() => {
      async function loadContacts() {
        const response = await api.get('/contacts');
          setContacts(response.data);

            }
          loadContacts();
          },[contact, transaction]);

     async function handleDeleteContact(id) {
        try {
            await api.delete(`/contact/${id}`);
            setContacts(contacts.filter(contact => contact.id !== id));
            setTransaction(id);
            setName('');
            setAccountNumber('');
            setCpf('');
         } catch (error) {

              }
            }

    async function handleNewContact(e) {
         e.preventDefault();
        if(!name || !cpf || !accountNumber) {
            setError("Preencha todos os campos para continuar")
          } else {
              try {
                const response = await api.post('/contacts', { name, cpf, account_number: accountNumber });
                  setError(''); 
                  setContact(response.data)
            } catch (error) {
                 setError("Use um CPF válido com 11 dígitos");
              }
            }
        }


  return (
 <React.Fragment>
         {contacts.length > 0 ? (
             <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Conta</TableCell>
                <TableCell><NewContactModal contacts={contacts} setContact={setContact} /></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map(contact => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.name.toUpperCase()}</TableCell>
                  <TableCell>{CPF.format(contact.cpf)}</TableCell>
                  <TableCell>{contact.account_number}</TableCell>
                  <TableCell>


                  <IconButton className={classes.button} aria-label="delete">
                   <TransactionModal setTransaction={setTransaction} contact={contact}/>
                 </IconButton>
                  <IconButton  className={classes.button} aria-label="edit">
                      <EditContactModal setContact={setContact} contact={contact} />
                 </IconButton>
                  <IconButton onClick={() => handleDeleteContact(contact.id)} className={classes.button} aria-label="delete">
                         <DeleteIcon />
                 </IconButton>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        ): (
            <div>
              <h1>Adicione um contato </h1>
              {error && error}
         <form className={classes.container} onSubmit={handleNewContact} autoComplete="off">
            <TextField
                id="outlined-full-width"
                label="NOME"
                style={{ margin: 8 }}
                fullWidth
                value={name}
                onChange={e => setName(e.target.value)}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
             />
             <TextField
                id="outlined-full-width"
                label="CPF"
                style={{ margin: 8 }}
                value={cpf}
                onChange={e => setCpf(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
              />
                <TextField
                id="outlined-full-width"
                label="CONTA"
                style={{ margin: 8 }}
                value={accountNumber}
                onChange={e => setAccountNumber(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
             />

         <Fab color="primary" aria-label="add" type="submit" className={classes.fab}>
            <AddIcon />
         </Fab>
            </form>

           </div>

        )}

    </React.Fragment>
  );
}
