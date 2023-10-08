// linkedAccounts.model.js
import mongoose from 'mongoose';

const linkedAccountsSchema = new mongoose.Schema({
    primaryUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    secondaryUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const LinkedAccount = mongoose.model('LinkedAccount', linkedAccountsSchema);

export default LinkedAccount;