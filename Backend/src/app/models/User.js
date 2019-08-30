import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            cpf: Sequelize.INTEGER,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            balance: Sequelize.FLOAT,
            limit: Sequelize.FLOAT,
            cellphone: Sequelize.INTEGER,
            account_number : Sequelize.INTEGER,

       },
       {
            sequelize,
       });

       this.addHook('beforeSave', async (user) => {
        if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
             }
         });

        this.addHook('beforeCreate', async (user) => {
         user.account_number = await user.generateAccountNumber();
            });

        return this;
    }

    generateAccountNumber() {
        return Math.floor(Math.random() * (50000 + 1) + 30000);
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
