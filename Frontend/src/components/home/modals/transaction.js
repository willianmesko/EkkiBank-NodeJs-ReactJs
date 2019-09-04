import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import TextField from '@material-ui/core/TextField';
import api from '../../../services/api';
import {useStyles} from './styles';
import MySnackbarContentWrapper from '../alerts/index';
import Button from '@material-ui/core/Button';
import CPF from 'cpf';

export default function TransactionModal({contact, setTransaction}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [deposit, setDeposit] = useState();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState("");

  const handleOpen = () => {
    setOpen(true);

  };


  const handleClose = () => {
    setOpen(false);
  };

  async function handleTransaction(e) {
    e.preventDefault();
    if(!deposit || deposit <= 0) {
      setStatus(1);
      setMessage("Valor minímo de R$ 1,00");
       setTimeout(() => {
        setOpen(false)}, 1500);
    } else {
        try {
          const response =  await api.post(`transaction/${contact.id}`, {deposit});
          setTransaction(response.data);
          setMessage(response.data.message);

          if(response.data.status === 0)
              setStatus(0)
          if(response.data.status === 1)
              setStatus(1)
          if(response.data.status === 2)
              setStatus(2)


          await setTimeout(() => {
            setDeposit('');
            setMessage('');
            setOpen(false)}, 1500)
         } catch (error) {

        }
    }
  }

  return (

   <div>
       <UpIcon onClick={handleOpen}/>
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
            {message && (
                    <MySnackbarContentWrapper
                    variant={status === 0 ? "success" :
                            (status === 1 ) ? "error" : "warning" }
                    className={classes.margin}
                    message={message}
                  />
              )}
            <h1 id="transition-modal-title">Realizar Transferência para {contact.name}</h1>
            <form className={classes.container} onSubmit={handleTransaction} noValidate autoComplete="off">
                <TextField
                id="outlined-full-width"
                label="VALOR"
                style={{ margin: 8 }}
                type="number"
                value={deposit}
                onChange={e => setDeposit(e.target.value)}
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
                style={{ margin: 8 }}
                value={CPF.format(contact.cpf)}
                disabled
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
              />
                <TextField
                id="outlined-full-width"
                disabled
                label="CONTA"
                style={{ margin: 8 }}
                value={contact.account_number}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
             />
            <Button variant="outlined" size="medium" color="primary" type="submit" className={classes.margin}>
               Transferir
            </Button>
          </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
