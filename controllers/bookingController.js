const Booking = require('../models/Booking');
const Member = require('../models/Member');
const Bank = require('../models/Bank');

module.exports = {
    
    viewBooking: async (req, res) => {
        try {
            const booking = await Booking.find()
                .populate('memberId')
                .populate('bankId')
            res.render('admin/booking/view_booking', { 
                title: 'Staycation | Booking',
                booking,
                user: req.session.user,
            })
            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/booking');
        }
    },
    showDetailBooking: async (req, res) => {
        const { id } = req.params;
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            const booking = await Booking.findOne({ _id: id })
                .populate('memberId')
                .populate('bankId')

            res.render('admin/booking/show_detail_booking', { 
                title: 'Staycation | Booking',
                booking,
                alert,
                user: req.session.user,
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/booking');
        }
    },
    actionConfirmation: async (req,res) => {
        const { id } = req.params;
        try {
            const booking = await Booking.findOne({ _id: id });
            booking.payments.status = 'Accept';
            await booking.save();
            req.flash('alertMessage', 'Success Confirmation Payment');
            req.flash('alertStatus', 'success');
            res.redirect(`/admin/booking/${id}`);
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/booking/${id}`);
        }
    },
    actionReject: async (req,res) => {
        const { id } = req.params;
        try {
            const booking = await Booking.findOne({ _id: id });
            booking.payments.status = 'Reject';
            await booking.save();
            req.flash('alertMessage', 'Reject Payment');
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/booking/${id}`);
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/booking/${id}`);
        }
    }
}