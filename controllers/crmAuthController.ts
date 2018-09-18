import * as mongoose from 'mongoose';
import { ContactSchema } from '../db/models/crmModel';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactAuthController {
    
    //registeration for new user
    public register (req: Request, res: Response) {
        let newContact = new Contact(req.body);
        newContact.hash_password = bcrypt.hashSync(req.body.hash_password, 10);
        newContact.save(function(err, user) {
          if (err) {
            return res.status(400).send({
              message: err
            });
          } else {
            return res.json(user);
          }
        });
    }

    //validation for user exists
    public signIn (req: Request, res: Response) {

        let query = { email: req.body.email}
       
        Contact.findOne(query, (err, user) => {
                if (err) throw err;
                if (!user) {
                    res.status(401).json({ message: 'Authentication failed. User not found.' });
                } else {
                    if (user.comparePassword(req.body.hash_password)) {
                        return res.json({token: jwt.sign({ email: user.email, firstName: user.firstName, lastName: user.lastName, phone: user.phone, company: user.company, _id: user._id}, 'RESTFULAPIs')});
                    }
                    else {
                        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
                    }
                }
        });
    }
}