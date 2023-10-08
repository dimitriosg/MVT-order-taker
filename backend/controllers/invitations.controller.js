// invitations.controller.js
import Invitation from '../models/invitations.model.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/emailSender.js';

export const inviteUser = async (req, res) => {
    try {
        const email = req.body.email;
        const invitedBy = req.user.id;

        // Check for active user with the same email
        const activeUser = await User.findOne({ email, active: true });
        if (activeUser) {
            return res.status(400).json({ message: 'There is already an active user with this email address.' });
        }

        // Check for inactive user with the same email
        const inactiveUser = await User.findOne({ email, active: false });
        if (inactiveUser) {
            return res.status(400).json({ message: 'There is a user with this email address but it is not active.' });
        }

        // Check for pending invitation with the same email
        const existingInvitation = await Invitation.findOne({ email, status: 'pending' });
        if (existingInvitation) {
            return res.status(400).json({ message: 'An invitation for this email is already pending.' });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000);  // 1 hour from now

        const invitation = new Invitation({
            email,
            invitedBy,
            token,
            expirationDate
        });

        await invitation.save();

        // Send the email using your utility
        const inviteUrl = `https://order-taker.dgalanopoulos.eu/accept-invite?token=${token}`;
        await sendEmail(email, 'Order Taker: You are invited!', `Click here to accept the invitation: ${inviteUrl}`);

        res.status(200).json({ message: 'Invitation sent successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending invitation.', error: error.message });
    }
};

export const acceptInvitation = async (req, res) => {
    try {
        const token = req.body.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const invitation = await Invitation.findOne({ token, email: decoded.email, status: 'pending' });
        if (!invitation) {
            return res.status(400).json({ message: 'Invalid or expired invitation.' });
        }

        const existingUser = await User.findOne({ email: decoded.email });
        if (existingUser) {
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }

        // Logic to create the new user account
        const user = new User({
            name: '',  // You will need to obtain this information from the user
            email: decoded.email,
            password: '',  // Temporary password, you may want to generate a random string
            role: 'waiter',  // This can be adjusted based on the invitation or user input
            resetToken: null,
            resetTokenExpiration: null,
            emailVerified: false,
            emailVerificationToken: '',  // You can generate another token for email verification
            emailVerificationTokenExpiration: null,
            loginAttempts: 0,
            accountStatus: 'Active'
        });
        await user.save();

        // Update the status of the invitation to accepted
        invitation.status = 'accepted';
        await invitation.save();

        // Send email to user with a link to set up their password
        const passwordSetupToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const passwordSetupUrl = `https://order-taker.dgalanopoulos.eu/set-password?token=${passwordSetupToken}`;
        await sendEmail(decoded.email, 'Order Taker: Set Up Your Password', `Click here to set up your password: ${passwordSetupUrl}`);

        res.status(200).json({ message: 'Invitation accepted successfully. Please check your email to set up your password.' });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting invitation.', error: error.message });
    }
};

export const rejectInvitation = async (req, res) => {
    try {
        const token = req.body.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const invitation = await Invitation.findOne({ token, email: decoded.email, status: 'pending' });
        if (!invitation) {
            console.log(`Invalid invitation token received: ${token}`);
            return res.status(400).json({ message: 'Invalid invitation.' });
        }

        // Update the status of the invitation to rejected
        invitation.status = 'rejected';
        await invitation.save();

        // Logging the rejection
        console.log(`Invitation for ${decoded.email} was rejected.`);

        // Notify the inviter
        const inviter = await User.findById(invitation.invitedBy);
        if (inviter) {
            const subject = 'Invitation Rejected';
            const body = `The invitation to ${decoded.email} has been rejected.`;
            await sendEmail(inviter.email, subject, body);
        }

        res.status(200).json({ message: 'Invitation rejected.' });
    } catch (error) {
        console.error(`Error rejecting invitation: ${error.message}`);
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: 'Malformed token.', error: error.message });
        }
        res.status(500).json({ message: 'Error rejecting invitation.', error: error.message });
    }
};
