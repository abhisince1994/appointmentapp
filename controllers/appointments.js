const Appointment = require('../models/appointment');

//Create Appointment
exports.postAddAppointment = (req, res, next) => {
    const { username, email, phone } = req.body;
    Appointment.create({
        username: username,
        email: email,
        phone: phone,
    })
    .then(() => res.redirect('/appointments'))
    .catch((err) => console.log(err));
};

// Get all appointment
exports.getAppointments = (req, res, next) => {
    Appointment.findAll()
    .then((appointments) => {
        res.render('appointments', {
            appointments: appointments,
            pageTitle: 'Appointments',
            path: '/appointments',
        });
    })
    .catch((err) => console.log(err));
};

// Delecte Appointment
exports.postDeleteAppointment = (req, res, next) => {
    const appointmentId = req.body.appointmentId;
    Appointment.destroy({ where: { id: appointmentId } })
    .then(() => res.redirect('/appointments'))
    .catch((err) => console.log(err));
};

//get edit appointment form
exports.getEditAppointment = (req, res, next) => {
    const appointmentId = req.query.appointmentId;
    Appointment.findByPk(appointmentId)
    .then(appointment => {
        if (!appointment) {
            return res.redirect('/appointments');
        }
        res.render('edit', {
            appointment: appointment,
            pageTitle: 'Edit Appointment',
            path: '/edit-appointment'
        });
    })
    .catch(err => console.log(err));
};

//post updated appointment
exports.postEditAppointment = (req, res, next) => {
    const { id, username, email, phone } = req.body;
    Appointment.update({ username, email, phone }, { where: { id: id } })
    .then(() => res.redirect('/appointments'))
    .catch(err => console.log(err));
};