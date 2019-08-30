import React,{useState} from 'react';
import {useStyles} from './styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import api from '../../../services/api'


export default function NewContactModal({setContact, contacts}) {
  const classes = useStyles();
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);

  };


  const handleClose = () => {
    setOpen(false);
  };

  async function handleNewContact(e) {
    e.preventDefault();
    if(!name || !cpf || !accountNumber) {
        setError("Preencha todos os campos para continuar")
      } else {
          try {
            const response = await api.post('/contacts', { name, cpf, account_number: accountNumber });
              setOpen(false);
              setName('');
              setCpf('');
              setAccountNumber('');
              setContact(response.data)


        } catch (error) {
            setError("Use um CPF válido com 11 dígitos")
          }
        }
    }
  return (
    <div>
       <IconButton onClick={handleOpen} className={classes.button} aria-label="delete">
             <AddIcon />Novo Contato
        </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h1 id="transition-modal-title">Preencha os campos</h1>
              {error && error}
        <form className={classes.container} onSubmit={handleNewContact} noValidate autoComplete="off">
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
                type="number"
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
                type="number"
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
             <Fab type="submit" color="primary" aria-label="add" className={classes.fab}>
                 <AddIcon  />
             </Fab>
            </form>
         </div>
        </Fade>
      </Modal>
    </div>
  );
}
