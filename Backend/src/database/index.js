import Sequelize from 'sequelize';

import User from '../app/models/User';
import Contact from '../app/models/Contact';
import Transaction from '../app/models/Transaction';

import databaseConfig from '../config/database';

const models = [User, Contact, Transaction];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.model));
    }
}
export default new Database();
