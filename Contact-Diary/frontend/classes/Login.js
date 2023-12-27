const validator = require('validator');

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const email = e.target.querySelector('input[name="name"]');
        const pass = e.target.querySelector('input[name="password"]');
        let errors = [];

        if (!validator.isEmail(email)) errors.push("E-mail isn't valid.");

        if (pass.length < 3 || pass.length > 50)
            errors.push('The password need to more then 3 and less then 50 characters.');

        if (errors.length === 0) return e.target.submit();

        errors.forEach((error) => {
            alert(error);
        });
    }
}
