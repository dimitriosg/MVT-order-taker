// backend/models/UserActivityLog.js
import mongoose from 'mongoose';

const UserActivityLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    httpMethod: String,
    endpoint: String,
    statusCode: Number,
    actionDescription: String,
    requestHeaders: Object, // Use a strict subset or filter out sensitive headers
    requestBody: Object,    // Remember to filter out sensitive information
    queryParams: Object,
    responseBody: Object,   // Filter out sensitive data
    ipAddress: String,
    userAgent: String,
    errorDetails: String,
    changedFields: [String], // Only names of the fields
    oldValues: Object,       // Previous values of changed fields
    newValues: Object        // New values of changed fields
});

const UserActivityLog = mongoose.model('UserActivityLog', UserActivityLogSchema);

export default UserActivityLog;
