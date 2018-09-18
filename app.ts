import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import * as mongoose from "mongoose";
import * as jwt from 'jsonwebtoken';

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();  
    public mongoUrl: string = 'mongodb://localhost:27017/CRMdb';

    constructor() {
        this.app = express();
        this.config();        
        this.routePrv.routes(this.app);     
        this.mongoSetup();
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
        // token validation with JWT token segregation 
        this.app.use(function(req: any, res, next) {
            if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
                jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
                    if (err) req.user = undefined;
                    req.user = decode;
                    next();
                });
            } else {
                req.user = undefined;
                next();
            }
        });
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);        
    }

}

export default new App().app;