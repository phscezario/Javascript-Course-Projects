const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
    res.render('contact', { contact: {} });
};

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => {
                return res.redirect(process.env.BASEURL + '/contact');
            });
            return;
        }

        req.flash('success', 'Contact registered.');
        req.session.save(() => {
            return res.redirect(process.env.BASEURL + '/');
        });
        return;
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.edit = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const contact = await Contact.getContactById(req.params.id);

    if (!contact) return res.render('404');

    res.render('contact', { contact });
};

exports.update = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');

        const contact = new Contact(req.body);

        await contact.updateById(req.params.id);

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => {
                return res.redirect(process.env.BASEURL + '/contact');
            });
            return;
        }

        req.flash('success', 'Contact updated.');
        req.session.save(() => {
            return res.redirect(process.env.BASEURL + `/contact/edit/${contact.contact._id}`);
        });
        return;
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.delete = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const contact = await Contact.deleteContactById(req.params.id);

    if (!contact) return res.render('404');

    req.flash('success', 'Contact deleted.');
    req.session.save(() => {
        return res.redirect('back');
    });
    return;
};
