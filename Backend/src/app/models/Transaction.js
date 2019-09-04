import Sequelize, { Model , Op } from 'sequelize';

class Transaction extends Model  {
    static init(sequelize) {
        super.init({
            user_id: Sequelize.INTEGER,
            contact_id: Sequelize.INTEGER,
            contact_name: Sequelize.STRING,
            value: Sequelize.FLOAT,
            created_at: Sequelize.DATE,
            canceled_at:Sequelize.BOOLEAN
         },
       {
           sequelize,
       });

       return this;
    }

 }

export const validDepositValue = async (user, contact, deposit, res) => {


    if(user.limit < 500) {
        if(user.limit < deposit)
          return  res.json({message: 'Saldo insuficiente', status:1})


        else {
            await user.update({ balance: user.balance - deposit});
            await user.update({ limit: user.limit - deposit})
            await contact.update({ balance: contact.balance + deposit });

            await logTransaction(user.id, contact.id, contact.name,  deposit);
            return res.status(200).json({
                message: 'Saldo insuficiente, seu limite será utilizado',
                status: 2
                })
            }

    } else {
        if(user.limit + user.balance < deposit)
             return  res.json({message: 'Saldo insuficiente', status:1});

         await user.update({ balance: user.balance - deposit});
         await user.update({ limit: user.limit - (user.balance * -1)});
         await contact.update({ balance: contact.balance + deposit });

         await logTransaction(user.id, contact.id, contact.name, deposit);

         return res.json({message: 'Saldo insuficiente, seu limite será utilizado', status:2})

    }
}

export const logTransaction = async (user_id, contact_id, contact_name, value) => {
   const transaction = await Transaction.create({
       user_id,
       contact_id,
       contact_name,
       value
   });

   return transaction;
}

export const validLastDeposit = async (user, contact_id, value) => {
    const existTransactionEqual = await Transaction.findOne({
        where:{ user_id: user.id,
                 contact_id,
                 value,
                 canceled_at: {[Op.not]: 1},
                 created_at : {
                    [Op.between] : [ new Date(Date.now() - (2 * 60 * 1000)), new Date(Date.now())]
                    }
                 },
             });

        if(existTransactionEqual){
             await existTransactionEqual.update({canceled_at: 1});
             return true;
            }
        return false;
}

export default Transaction;


