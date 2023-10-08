// allRoutes.js is the main router file that contains all the routes of the application.
// src/routes/allRoutes.js
import express from 'express';
import * as userController from '../controllers/userController.js';
import * as orderController from '../controllers/orderController.js';
import * as roleController from '../controllers/roleController.js';

import * as accountController from '../controllers/accountLinking.controller.js';
import * as invitationController from '../controllers/invitations.controller.js';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/checkRole.js';

import * as funcSOS from '../utils/funcSOS.js';
import * as adminExc from '../utils/adminExc.js';

// Dashboard imports
import dashAPI from './dashboard/dashAPI.js';
import orderRoutes from './dashboard/orderRoutes.js';
import tableRoutes from './dashboard/tableRoutes.js';

// Orders + Menu imports
import ordersRoutes from './ordersRoutes.js';
import menuRoutes from './menuRoutes.js';
import menuItemsRoutes from './menuItemsRoutes.js';


import { categories } from '../models/allMenuCategories.js';


const router = express.Router();

// Orders + Menu
router.use('/api/orders', ordersRoutes);
router.use('/api/menu', menuRoutes);
router.use('/api/menuItems', menuItemsRoutes); // + addMenuItem, removeMenuItem

router.get('/api/menuCategories', (req, res) => {
    res.json(categories);
});


// Dashboard Routes
router.use('/api/dashboard', dashAPI);
router.use('/orders', orderRoutes);
router.use('/tables', tableRoutes);

// User Routes
router.post('/api/users/create-user', userController.createUser);

router.post('/api/users/authenticate', userController.authenticateUser);
router.get('/validate', authMiddleware, userController.validateUser);

router.get('/api/users/list', userController.listUsers);
router.get('/api/users/roles', roleController.getAllRoles);

router.put('/api/users/update/:userID', userController.updateUser);
router.get('/api/users/details/:userID', userController.getUserDetails);
router.delete('/api/users/delete/:userID', userController.deleteUser);
router.get('/api/users/search', userController.searchUsers);

router.put('/api/users/change-password', authMiddleware, userController.changePassword);
router.post('/api/users/forgot-password', userController.forgotPassword);

router.get('/api/users/verify-email/:token', userController.verifyEmail);
router.post('/api/users/refresh-token', userController.refreshToken);

router.post('/api/users/lock', userController.lockAccount);
router.post('/api/users/activate', userController.activateAccount);
router.post('/api/users/deactivate', userController.deactivateAccount);

router.post('/api/users/set-password', userController.setPassword);

router.put('/api/users/updateStatus/:userId', userController.updateStatus);


// Order Routes
router.post('/api/orders/create', orderController.createOrder);
router.put('/api/orders/modify/:orderID', orderController.modifyOrder);
router.put('/api/orders/update-status/:orderID', orderController.updateOrderStatus);


// Test Endpoint
router.post('/api/debug', (req, res) => {
    console.log("Debug Endpoint: ", req.body);
    res.json(req.body);
});

router.get('/api/rundebugtools', funcSOS.runDebugTools);

/////////////////////////
// >>>> LINKING & INVITATION routes <<<<
// ACCOUNT LINKING ROUTES
router.post('/api/link-account', accountController.linkAccount);
router.post('/api/unlink-account', accountController.unlinkAccount);

// INVITATION ROUTES
router.post('/api/invite', authMiddleware, invitationController.inviteUser);
/////////////////////////
// ADMIN EXCLUSIVE ROUTES
// Counters per role <<< ADMIN RIGHTS >>>
router.get('/api/adm/getAllWaiters', checkRole(['admin', 'developer']), adminExc.getAllWaiters);
router.get('/api/adm/getallCashiers', checkRole(['admin', 'developer']), adminExc.getAllCashiers);
router.get('/api/adm/getAllAccountants', checkRole(['admin', 'developer']), adminExc.getAllAccountants);
router.get('/api/adm/getAllAdmins', checkRole(['admin', 'developer']), adminExc.getAllAdmins);

// Role functions <<< ADMIN RIGHTS >>>
router.put('/api/adm/assignRole', authMiddleware, checkRole(['admin', 'developer']), adminExc.assignRole);
router.get('/api/adm/getActivityHistory/:userId', authMiddleware, checkRole(['admin', 'developer']), adminExc.getActivityHistory);

/////////////////////////
// DEVELOPER EXCLUSIVE ROUTES
// DANGER ZONE >>> DEVELOPER RIGHTS <<<
console.log(funcSOS.deleteAllUsers);
router.put('/api/dev/oloiko-katharisma-xriston', authMiddleware, checkRole(['developer']), funcSOS.deleteAllUsers);

export default router;
