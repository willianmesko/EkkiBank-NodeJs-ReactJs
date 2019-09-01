import * as Yup from 'yup';
import Contact from '../models/Contact';
import Transaction from '../models/Transaction';



class ContactsController {

    async index (req, res) {
        try {
            const contacts = await Contact.findAll({
                where:{ user_id: req.userId},
                attributes:['id','name','cpf', 'account_number','balance']
               })

           if(contacts.length < 1)
               return res.status(400).json({error: 'Nenhum contato cadastrado'});

               return res.json(contacts);
            } catch (error) {
                return res.status(500).json({error});
            }
         }

    async store(req, res) {
        const schema = Yup.object().shape({
                  name: Yup.string().required(),
                  cpf: Yup.string().required().min(11).max(11),
                    });

            if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Preencha os dados corretamente.'});
             }

        try {
            const contactExists = await Contact.findOne({ where: { cpf: req.body.cpf}});
            const {cpf, name, account_number } = req.body;

                if (contactExists)
                    return res.status(400).json({error: 'Contato já cadastrado'});

            const contacts = {
                user_id : req.userId,
                cpf,
                account_number,
                name,
                 }

                const contact =  await Contact.create(contacts);
                return res.status(200).json(contact);

        } catch (error) {
            res.status(500).json({error});
        }
    }

    async delete(req,res) {
        const {id} = req.params;

        const contact = await Contact.findOne({where: {id }});
            if(contact)
                contact.destroy();

           return res.status(200).json({message: 'Usuário deletado com sucesso'});
    }

    async update(req, res) {
        const {name, account_number, cpf} = req.body;
        const contact = await Contact.findOne({where: {id: req.params.id, user_id:req.userId} });

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            cpf: Yup.string().required().min(11).max(11),
              });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Preencha os dados corretamente.'});
       }

        if(!contact) {
            return res.status(400).json({error: "Contato não encontrado"});
        }

        await contact.update({name, cpf, account_number});
        await Transaction.update(
            {name, cpf, account_number},
            {where: {contact_id: contact.id}}
            );
        
        return res.json(contact);
    }

}

export default new ContactsController();
