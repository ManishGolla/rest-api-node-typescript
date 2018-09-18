import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String            
    },
    company: {
        type: String            
    },
    phone: {
        type: Number            
    },
    hash_password: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

ContactSchema.methods.comparePassword = function(password) {
    console.log(bcrypt.compareSync(password, this.hash_password))
    return bcrypt.compareSync(password, this.hash_password);
};