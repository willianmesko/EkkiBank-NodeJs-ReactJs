import Contact from '../models/Contact';
import User from '../models/User';
import  Transaction, {validDepositValue, logTransaction, validLastDeposit} from '../models/Transaction';



class TransactionsController {
     async index(req, res) {

          const transactions = await Transaction.findAll({
               where: {user_id: req.userId, canceled_at: 0},
               limit: 6,
               order:[['created_at','DESC']]
               });


          if(transactions.length < 1)
            res.json({message: 'Nenhuma transação realizada'});

          res.status(201).json(transactions);

     }

     async store (req, res) {

        const deposit = parseFloat(req.body.deposit);
     // - Valida se o usuário logado tem o contato cadastrado
          const contact = await Contact.findOne({where:{ id: req.params.id, user_id: req.userId}});

            if(!contact)
               return res.status(401).json({message: 'Contato não encontrado'});

          const user = await User.findByPk(req.userId);

     // - Valida se houve uma transação idêntica nos ultimos 2 minutos
          if(await validLastDeposit(user, contact.id, deposit)) {
               await logTransaction(user.id, contact.id, contact.name , deposit)
               return res.json({
                         message:"Transação idêntica realizada nos últimos minutos",
                         status:2
                    });
                }

     // - Valida se o valor do deposito é compátivel com o saldo dispónivel
            if(user.balance < deposit )
               return await validDepositValue(user, contact, deposit, res);

           await user.update({ balance: user.balance - deposit });
           await contact.update({ balance: contact.balance + deposit });

          await logTransaction(user.id, contact.id, contact.name , deposit)

          return res.status(200).json({
                message: "Transação realizada",
                status: 0
          });
     }

}

export default new TransactionsController();
