/* eslint-disable no-unused-vars */
// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    userName: Cookies.get('userName') || null,
    role: Cookies.get('role') || null,
    token: Cookies.get('token') || null,

    logoutSuccess: false,
    loginSuccess: !!Cookies.get('userName'), // set to true if userName cookie exists
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            console.log("(Slice)loginSuccess action called with payload:", action.payload);

            state.userName = action.payload.userName;
            state.role = action.payload.role;
            state.token = action.payload.token;

            state.loginSuccess = true;

            // Set cookies
            Cookies.set('userName', action.payload.userName, { expires: 2 });
            Cookies.set('role', action.payload.role, { expires: 2 });
            Cookies.set('token', action.payload.token, { expires: 2, secure: true });
        },
        logout(state) {
            state.userName = null;
            state.role = null;
            state.token = null;     
                         
            state.logoutSuccess = true; // LOGOUT SUCCESS

            state.loginSuccess = false; // login success

            // Remove all cookies
            Cookies.remove('userName');
            Cookies.remove('role');
            Cookies.remove('token');
        },
        resetLogoutSuccess(state) {
            state.logoutSuccess = false;
        },
        resetLoginSuccess(state) {
            state.loginSuccess = false;
        },
        setHasSwitchedRoles(state, action) {
            state.hasSwitchedRole = action.payload;
        }
    },
});

// original from db
export const selectUserRole = (state) => state.auth.role;
export const selectUserEmail = (state) => state.auth.userEmail;
export const selectUserName = (state) => state.auth.userName;
export const selectLoginSuccess = (state) => state.auth.loginSuccess;
export const selectLogoutSuccess = (state) => state.auth.logoutSuccess;
export const selectHasSwitchedRole = (state) => state.auth.hasSwitchedRole;

export const { 
    loginSuccess, 
    logout, 
    resetLogoutSuccess, 
    resetLoginSuccess, 
    setHasSwitchedRole  
} = authSlice.actions;

export default authSlice.reducer;
