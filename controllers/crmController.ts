import * as mongoose from 'mongoose';
import { ContactSchema } from '../db/models/crmModel';
import { Request, Response } from 'express';
// import { IGetUserAuthInfoRequest } from "../controllers/crmAuthController";

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController{

    public async addNewContact (req: Request, res: Response) {  
        
        console.log("ADD NEW CONTACT")
        let newContact = new Contact(req.body);
    
        await newContact.save((err, contact) => {
            if(err){
                res.sendStatus(500);
            } else if(err) {
                res.sendStatus(201);
            }  else {
                res.json(contact);
            }
        });
    }

    public async getContacts (req: Request, res: Response) {           
        await Contact.find({}, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public async getContactWithID (req: Request, res: Response) {           
        await Contact.findById(req.params.contactId, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public async updateContact (req: Request, res: Response) {           
        await Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public async deleteContact (req: Request, res: Response) {           
        await Contact.remove({ _id: req.params.contactId }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
    }

    public loginRequired (req, res, next) {

        if(req.headers.authorization) {
            console.log("ccxcnb")
            next()
        }else {
          return res.status(401).json({ message: 'Unauthorized user!' });
        }
    }
    
}