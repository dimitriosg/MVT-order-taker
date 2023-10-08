// roleSwitchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Define the initial state
const initialState = {
  originalRole: Cookies.get('role') || "",
  temporaryRole: "",
  hasSwitchedRole: false,
  hasAppliedRole: false,
  currentRole: Cookies.get('role') || "",
};

// Define the async thunk
export const switchRoleAndNavigate = createAsyncThunk(
  'roleSwitch/switchRoleAndNavigate',
  async ({ newRole, navigate }, { dispatch, getState }) => {
    const originalRole = getState().roleSwitch.originalRole;
    const selectedRole = newRole;

    console.log('(roleSwitch) Original Role:', originalRole);
    console.log('(roleSwitch) New Role:', newRole);

    // Prevent other users to switch roles
    if (originalRole !== 'admin' && originalRole !== 'developer') {
      console.log('(roleSwitch 1st IF) Original role is: ', originalRole);
      console.error('Permission denied: cannot change roles.');
      return { success: false, message: 'Permission denied: cannot change roles.' };
    }

    // Prevent Admin from switching to Developer
    if (originalRole === 'admin' && newRole === 'developer') {
      console.log('(roleSwitch 2nd IF) Original role is: ', originalRole);
      console.error('Permission denied: Admins cannot switch to Developer role.');
      return { success: false, message: 'Permission denied: Admins cannot switch to Developer' };
    }

    try {
      return { newRole: selectedRole, success: true };
    } catch (error) {
      console.error('Error switching roles:', error);
      // Optionally dispatch a failure action or return an error
      throw error;
    }
  },
  {
    extra: {
      navigate: null,  // This will be set when dispatching the action
    },
  }
);


// Define the slice
export const roleSwitchSlice = createSlice({
  name: 'roleSwitch',
  initialState,
  reducers: {
      setOriginalRole: (state, action) => {
          state.originalRole = action.payload;
      },
      setTemporaryRole: (state, action) => {
          state.temporaryRole = action.payload;
      },
      applyRole: (state) => {
        state.role = state.temporaryRole;
        state.hasAppliedRole = true;
      },
      setHasSwitchedRole: (state, action) => {
          state.hasSwitchedRole = action.payload;
      },
      switchRole(state, action) {
        state.currentRole = action.payload;
        state.temporaryRole = action.payload;
      }, 
      clearTemporaryRole: (state) => {
        state.temporaryRole = null; 
      }
  },
  extraReducers: (builder) => {
      builder.addCase(switchRoleAndNavigate.fulfilled, (state, action) => {
          state.hasSwitchedRole = action.payload.success;  // Update hasSwitchedRole based on success status
      });
  }
});

export const selectOriginalRole = (state) => state.roleSwitch.originalRole;
export const selectTemporaryRole = (state) => state.roleSwitch.temporaryRole;
export const selectHasSwitchedRole = (state) => state.roleSwitch.hasSwitchedRole;
export const selectCurrentRole = (state) => state.roleSwitch.currentRole;

export const { 
  setOriginalRole, 
  setTemporaryRole, 
  setHasSwitchedRole,
  switchRole,
  clearTemporaryRole,
  applyRole
} = roleSwitchSlice.actions;

export default roleSwitchSlice.reducer;
