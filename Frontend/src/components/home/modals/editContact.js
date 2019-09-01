import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import api from '../../../services/api';
import {useStyles} from './styles';



const intlMonetary = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2
});




export default function EditContactModal({contact, setContact}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [cpf, setCpf] = useState(contact.cpf);
  const [name, setName] = useState(contact.name);
  const [account_number, setAccountNumber] = useState(contact.account_number);
  const [error, setError] = useState('');

  const handleOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleEditContact(e) {
    try {
        e.preventDefault();
        const response = await api.put(`contact/${contact.id}`, {cpf, name, account_number});
        setOpen(false);
      
        setContact(response.data)


   } catch (error) {
        setError("Use um CPF válido com 11 dígitos")
      }
    }

  return (
    <div>
   <EditIcon  onClick={handleOpen}/>
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
          <h1 id="transition-modal-title">Editar Contato</h1>
          {error && error}
        <form  onSubmit={handleEditContact} className={classes.form} >
            <TextField
                id="outlined-full-width"
                label="NOME"
                style={{ margin: 8 }}
                value={name}
                onChange = {e => setName(e.target.value)}
                fullWidth
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
                onChange={e => setAccountNumber(e.target.value)}
                value={account_number}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
             />

            <TextField
                id="outlined-full-width"
                label="SALDO R$"
                style={{ margin: 8 }}
                type="text"
                disabled
                value={intlMonetary.format(contact.balance)}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
             />
         <Button variant="outlined" size="medium" color="primary" type="submit" className={classes.margin}>
          Editar
        </Button>
          </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
