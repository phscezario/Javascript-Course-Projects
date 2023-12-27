const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.validForm();
        if (this.errors.length > 0) return;

        this.user = await this.getUser();

        await this.verifyLogin();
    }

    async register() {
        this.validForm();
        if (this.errors.length > 0) return;

        if (await this.getUser()) {
            this.errors.push('User already registered.');
            return;
        }

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.this.user = await LoginModel.create(this.body);
    }

    validForm() {
        this.cleanUp();

        if (!validator.isEmail(this.body.email)) this.errors.push("E-mail isn't valid.");

        if (this.body.password.length < 3 || this.body.password.length > 50)
            this.errors.push('The password need to more then 3 and less then 50 characters.');
    }

    async getUser() {
        return await LoginModel.findOne({ email: this.body.email });
    }

    async verifyLogin() {
        if (this.user === null || !bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Wrong user or password.');
            this.user = null;
            return;
        }
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        }

        this.body = {
            email: this.body.email,
            password: this.body.password,
        };
    }
}

module.exports = Login;
