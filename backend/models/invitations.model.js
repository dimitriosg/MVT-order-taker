// invitations.model.js
import mongoose from 'mongoose';

const invitationsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    expirationDate: {
        type: Date,
        required: true
    }
});

const Invitation = mongoose.model('Invitation', invitationsSchema);

export default Invitation;
