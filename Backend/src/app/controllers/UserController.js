import * as Yup from 'yup';
import User from '../models/User';


class UserController {
    async index(req, res) {
        const user = await User.findOne({where: {id:req.userId}})

        return res.status(200).json(user);
    }


    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            cpf: Yup.string().required().min(11).max(11),
                    });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Preencha os dados corretamente.'});
        }

        const countExists = await User.findOne({ where: { cpf: req.body.cpf}});

        if (countExists) {
            return res.status(400).json({error: 'Usuário já existe.'});
        }

        const {id , account_number, name, cpf, cellphone } = await User.create(req.body);

        return res.status(200).json({
            id,
            account_number,
            name,
            cpf,
            cellphone,
            message: 'Usuário Cadastrado com sucesso'
        });
    }




}

export default new UserController();
