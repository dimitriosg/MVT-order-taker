// middleware/activityLogger.js
import UserActivityLog from '../models/UserActivityLog.js'; // Import the model


export const activityLogger = (req, res, next) => {
    console.log('req.user:', req.user);
    const originalSend = res.send;

    if (req.originalUrl.includes('/api/users/authenticate')) {
        next();
        return;
    }

    // Override the response's send method
    res.send = function () {
         // If req.user is not defined, log an anonymous request
         if (!req.user) {
            console.warn('User activity logging attempted on an anonymous request.');
            originalSend.apply(res, arguments);
            return;
        }

        // Get details from the request and response
        const logDetails = {
            userId: req.user.id,
            email: req.user?.email,
            role: req.user?.role,
            timestamp: new Date(),
            httpMethod: req.method,
            endpoint: req.originalUrl,
            statusCode: res.statusCode,
            actionDescription: generateActionDescription(req), // Helper function
            requestHeaders: filterHeaders(req.headers), // Helper function
            requestBody: filterSensitiveData(req.body), // Helper function
            queryParams: req.query,
            responseBody: filterSensitiveData(arguments[0]), // This captures the body sent in the response
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
            changedFields: getChangedFields(req.body), // Helper function
            oldValues: getOldValues(req.body),          // Helper function
            newValues: req.body                          // Assuming this is the new data sent
        };

        // Save to database
        UserActivityLog.create(logDetails)
            .catch(err => console.error('Error logging user activity:', err));

        originalSend.apply(res, arguments); // Call the original send method
    };

    next();
};

// Helper functions
const generateActionDescription = (req) => {
    // API/USERS
    if(req.method === 'POST' && req.originalUrl.includes('/api/users')) {
        return 'POST user API call';
    }else if(req.method === 'GET' && req.originalUrl.includes('/api/users')){
        return 'GET user API call';
    }else if(req.method === 'PUT' && req.originalUrl.includes('/api/users')) {
        return 'PUT user API call';
    }else if(req.method === 'DELETE' && req.originalUrl.includes('/api/users')) {
        return 'DELETE user API call';
    }

    // API/ORDERS
    if(req.method === 'POST' && req.originalUrl.includes('/api/orders')) {
        return 'POST order API call';
    }else if(req.method === 'GET' && req.originalUrl.includes('/api/orders')){
        return 'GET order API call';
    }else if(req.method === 'PUT' && req.originalUrl.includes('/api/orders')) {
        return 'PUT order API call';
    }else if(req.method === 'DELETE' && req.originalUrl.includes('/api/orders')) {
        return 'DELETE order API call';
    }else{
        return 'Generic order API call';
    }

    // API/ADM
    if(req.method === 'GET' && req.originalUrl.includes('/api/adm')) {
        return 'GET admin API call';
    }else if(req.method === 'PUT' && req.originalUrl.includes('/api/adm')) {
        return 'PUT admin API call';
    }else if(req.method === 'POST' && req.originalUrl.includes('/api/adm')) {
        return 'POST admin API call';
    }else if(req.method === 'DELETE' && req.originalUrl.includes('/api/adm')) {
        return 'DELETE admin API call';
    }

    // API/DEV
    if(req.originalUrl.includes('/api/dev')) {
        return 'DEV API call';
    }

    // Add other descriptions as needed
    return 'Generic action';
}

const filterHeaders = (headers) => {
    const { authorization, cookie, ...filteredHeaders } = headers; // Exclude sensitive headers
    return filteredHeaders;
}

const filterSensitiveData = (data) => {
    if (typeof data === 'object') {
        const { password, token, ...filteredData } = data; // Exclude sensitive fields
        return filteredData;
    }
    return data;
}

const getChangedFields = (data) => {
    // Logic to determine which fields have changed. This will depend on how you're managing old data.
    // For this example, we'll just return all keys.
    return Object.keys(data);
}

const getOldValues = (req) => {
    return req.oldValues || {};
}


