// send responce using html
//const { message } = require('statuses');
// const Appointment = require('../models/appointment');

// //Create Appointment
// exports.postAddAppointment = (req, res, next) => {
//     const { username, email, phone } = req.body;
//     Appointment.create({
//         username: username,
//         email: email,
//         phone: phone,
//     })
//     .then(() => {
//         res.status(201).json({ message: 'Appointment created successfully' });
//     })
//     .catch((err) => {
//     res.status(500).json({ error:'an error occure while creating appointment' });
//     console.log(err);
//     });
// };

// // Get all appointment
// exports.getAppointments = (req, res, next) => {
//     Appointment.findAll()
//     .then((appointments) => {
//         res.render('appointments', {
//             appointments: appointments,
//             pageTitle: 'Appointments',
//             path: '/appointments',
//         });
//     })
//     .catch((err) => console.log(err));
// };

// // Delecte Appointment
// exports.postDeleteAppointment = (req, res, next) => {
//     const appointmentId = req.body.appointmentId;
//     Appointment.destroy({ where: { id: appointmentId } })
//     .then(() => res.redirect('/appointments'))
//     .catch((err) => console.log(err));
// };

// //get edit appointment form
// exports.getEditAppointment = (req, res, next) => {
//     const appointmentId = req.query.appointmentId;
//     Appointment.findByPk(appointmentId)
//     .then(appointment => {
//         if (!appointment) {
//             return res.redirect('/appointments');
//         }
//         res.render('edit', {
//             appointment: appointment,
//             pageTitle: 'Edit Appointment',
//             path: '/edit-appointment'
//         });
//     })
//     .catch(err => console.log(err));
// };

// //post updated appointment
// exports.postEditAppointment = (req, res, next) => {
//     const { id, username, email, phone } = req.body;
//     Appointment.update({ username, email, phone }, { where: { id: id } })
//     .then(() => res.redirect('/appointments'))
//     .catch(err => console.log(err));
// };






//send response using json

const Appointment = require('../models/appointment');

// Create Appointment
exports.postAddAppointment = (req, res, next) => {
    const { username, email, phone } = req.body;
    Appointment.create({
        username: username,
        email: email,
        phone: phone,
    })
    .then(() => {
        res.status(201).json({ message: 'Appointment created successfully' });
    })
    .catch((err) => {
        res.status(500).json({ error: 'An error occurred while creating the appointment' });
        console.log(err);
    });
};

// Get all appointments
exports.getAppointments = (req, res, next) => {
    Appointment.findAll()
    .then((appointments) => {
        res.status(200).json(appointments);
    })
    .catch((err) => {
        res.status(500).json({ error: 'An error occurred while fetching appointments' });
        console.log(err);
    });
};

// Delete Appointment
exports.postDeleteAppointment = (req, res, next) => {
    const appointmentId = req.body.appointmentId;
    Appointment.destroy({ where: { id: appointmentId } })
    .then(() => {
        res.status(200).json({ message: 'Appointment deleted successfully' });
    })
    .catch((err) => {
        res.status(500).json({ error: 'An error occurred while deleting the appointment' });
        console.log(err);
    });
};

// Get edit appointment form
exports.getEditAppointment = (req, res, next) => {
    const appointmentId = req.query.appointmentId;
    Appointment.findByPk(appointmentId)
    .then(appointment => {
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    })
    .catch(err => {
        res.status(500).json({ error: 'An error occurred while fetching the appointment' });
        console.log(err);
    });
};

// Post updated appointment
exports.postEditAppointment = (req, res, next) => {
    const { id, username, email, phone } = req.body;
    Appointment.update({ username, email, phone }, { where: { id: id } })
    .then(([affectedRows]) => {
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment updated successfully' });
    })
    .catch(err => {
        res.status(500).json({ error: 'An error occurred while updating the appointment' });
        console.log(err);
    });
};
