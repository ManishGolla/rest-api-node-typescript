import {Request, Response, NextFunction} from "express";
import { ContactController } from "../controllers/crmController";
import { ContactAuthController } from "../controllers/crmAuthController";

export class Routes { 
    
    public contactController: ContactController = new ContactController() 
    public ContactAuthController: ContactAuthController = new ContactAuthController()

    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        // Contact 
        app.route('/contact')
        .get((req: Request, res: Response, next: NextFunction) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);            
            if(req.query.key !== '3759edb6bb796925ca716b5971f241a6b5c417db'){
                res.status(401).send('You shall not pass!');
            } else {
                next();
            }                        
        }, this.contactController.getContacts)
        

        // POST endpoint with login control
        .post(this.contactController.loginRequired, this.contactController.addNewContact);

        // Contact detail with login control
        app.route('/contact/:contactId')
        // get specific contact
        .get(this.contactController.loginRequired,this.contactController.getContactWithID)
        .put(this.contactController.loginRequired,this.contactController.updateContact)
        .delete(this.contactController.loginRequired,this.contactController.deleteContact)

        //auth for user cretion
        app.route('/auth/register')
        .post(this.ContactAuthController.register);

        //auth for user signIn
        app.route('/auth/sigIn')
        .post(this.ContactAuthController.signIn);
    }
}