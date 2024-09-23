const Booking = require('../models/Booking');
const Member = require('../models/Member');
const Item = require('../models/Item');

module.exports = {
    viewDashboard: async (req, res) => {
        try {
            const member = await Member.find();
            const booking = await Booking.find();
            const item = await Item.find();
            res.render('admin/dashboard/view_dashboard', { 
                title: 'Staycation | Dashboard',
                user: req.session.user,
                member,
                booking,
                item
            })
            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/dashboard');
        }
    },
}