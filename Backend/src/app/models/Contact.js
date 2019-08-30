import Sequelize, { Model } from 'sequelize';


class Contact extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            cpf: Sequelize.INTEGER,
            user_id : Sequelize.INTEGER,
            account_number : Sequelize.INTEGER,
            balance : Sequelize.FLOAT
       },
       {
            sequelize,
       });

       return this;
  }

}

export default Contact;
