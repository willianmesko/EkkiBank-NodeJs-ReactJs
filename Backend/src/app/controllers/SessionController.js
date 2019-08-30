import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const {cpf, password} = req.body;

        const user = await User.findOne({ where: { cpf }});

        if(!user) {
            return res.status(401).json({ error: 'Usuario não encontrado ' });
        }

        if(!(await user.checkPassword(password))) {
            res.status(401).json({error: 'Senha inválida'});
        }
        const { id } = user;

        return res.json({
            user: {id},
            token : jwt.sign( { id }, authConfig.secret,{
                expiresIn: authConfig.expiresIn,
                }),
            })
    }
}
export default new SessionController();
