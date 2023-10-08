// frontend/src/types.ts

import mongoose from 'mongoose';

export interface User {
    id: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: string;
    resetToken: string;
    resetTokenExpiration: Date;
    emailVerified: boolean;
    emailVerificationToken: string;
    emailVerificationTokenExpiration: Date;
    loginAttempts: number;
    accountStatus: 'Active' | 'Deactivated' | 'Locked';
}