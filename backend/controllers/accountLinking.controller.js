// accountLinking.controller.js
import LinkedAccount from '../models/linkedAccounts.model.js';
import User from '../models/User.js';

// >>>> WILL BE USED TO LOGIN WITH SOCIAL MEDIA <<<< 
export const linkAccount = async (req, res) => {
    try {
        const primaryUserId = req.user._id;
        const secondaryEmail = req.body.secondaryEmail;

        // Fetch the user with the secondaryEmail
        const secondaryUser = await User.findOne({ email: secondaryEmail });

        // Check if the secondary user exists
        if (!secondaryUser) {
            return res.status(404).json({ message: 'Secondary user not found.' });
        }

        const secondaryUserId = secondaryUser._id;

        const linkExists = await LinkedAccount.findOne({
            $or: [
                { primaryUserId, secondaryUserId },
                { primaryUserId: secondaryUserId, secondaryUserId: primaryUserId }
            ]
        });

        if (linkExists) {
            return res.status(400).json({ message: 'Accounts are already linked.' });
        }

        const linkedAccount = new LinkedAccount({
            primaryUserId,
            secondaryUserId
        });

        await linkedAccount.save();

        res.status(200).json({ message: 'Accounts linked successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error linking accounts.', error: error.message });
    }
};

// >>>> NOT KNOWN YET <<<< 
export const unlinkAccount = async (req, res) => {
    try {
        const primaryUserId = req.user._id;
        const secondaryUserId = req.body.secondaryUserId;

        const link = await LinkedAccount.findOne({
            $or: [
                { primaryUserId, secondaryUserId },
                { primaryUserId: secondaryUserId, secondaryUserId: primaryUserId }
            ]
        });

        if (!link) {
            return res.status(400).json({ message: 'Accounts are not linked.' });
        }

        await link.remove();

        res.status(200).json({ message: 'Accounts unlinked successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error unlinking accounts.', error: error.message });
    }
};
