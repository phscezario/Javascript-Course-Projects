const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    creationDate: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async register() {
        this.validForm();

        if (this.errors.length > 0) return;

        this.contact = await ContactModel.create(this.body);
    }

    validForm() {
        this.cleanUp();

        if (!this.body.name) this.errors.push('Field name is required.');
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push("E-mail isn't valid.");
        if (!this.body.email && !this.body.name) this.errors.push('You need add a e-mail or phone number.');
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        }

        this.body = {
            name: this.body.name,
            lastName: this.body.lastName,
            phone: this.body.phone,
            email: this.body.email,
        };
    }

    async updateById(id) {
        if (typeof id !== 'string') return;

        this.validForm();

        if (this.errors.length > 0) return;

        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    static async getContactById(id) {
        if (typeof id !== 'string') return;
        return await ContactModel.findById(id);
    }

    static async getContacts() {
        return await ContactModel.find().sort({ creationDate: -1 });
    }

    static async deleteContactById(id) {
        if (typeof id !== 'string') return;
        return await ContactModel.findOneAndDelete({ _id: id });
    }
}

module.exports = Contact;
