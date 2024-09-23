const Users = require('../models/Users');
const bcrypt = require('bcryptjs');

module.exports = {
    viewSignin: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            if(req.session.user == null || req.session.user == undefined){
                res.render('index', { 
                    alert, 
                    title: 'Staycation | Login' 
                });
            } else {
                res.redirect('/admin/dashboard');
            }
        } catch (error) {
            res.redirect('/admin/signin');
        }
    },
    actionSignin: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await Users.findOne({ username: username });
            if (!user) {
                req.flash('alertMessage', 'User yang anda masukan tidak ada!!');
                req.flash('alertStatus', 'danger');
                res.redirect('/admin/signin');
            } else {
                const isPasswordMatch = await bcrypt.compare(password, user.password);
                if (!isPasswordMatch) {
                    req.flash('alertMessage', 'Password yang anda masukan tidak cocok!!');
                    req.flash('alertStatus', 'danger');
                    res.redirect('/admin/signin');
                } else {
                    req.session.user = {
                        id: user.id,
                        username: user.username,
                    }
                    res.redirect('/admin/dashboard');
                }
            }
        } catch (error) {
            res.redirect(`/admin/signin`);
        }
    },
    actionSignout: (req, res) => {
        req.session.destroy();
        res.redirect('/admin/signin');
    }
}