// src/redux/dashSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch tables assigned to the waiter.
export const fetchAssignedTables_original = createAsyncThunk('dashboard/fetchAssignedTables', async (waiterID) => {
    const response = await fetch(`/api/tables?waiterID=${waiterID}`);
    if (!response.ok) {
        throw new Error('Failed to fetch tables.');
    }
    return await response.json();
});

// MOCK Async thunk to fetch tables assigned to the waiter.
export const fetchAssignedTables = createAsyncThunk('dashboard/fetchAssignedTables', async (waiterID) => {
    // Mocked data for testing
    const mockData = {
        tables: [
            { id: 1, number: 1 },
            { id: 2, number: 2 },
            { id: 3, number: 3 },
            { id: 4, number: 4 },
            { id: 5, number: 5 },
        ]
    };
    return mockData;
});


// Async thunk to fetch orders for a specific table.
export const fetchOrdersForTable = createAsyncThunk('dashboard/fetchOrdersForTable', async (tableID) => {
    const response = await fetch(`/api/orders?tableID=${tableID}`);
    if (!response.ok) {
        throw new Error('Failed to fetch orders.');
    }
    return await response.json();
});


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        tables: [],
        orders: [],
        delayedOrders: [],
        selectedTable: null,
        status: 'idle',
        error: null
    },
    reducers: {
        setTables: (state, action) => {
            state.tables = action.payload;
        },
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        addDelayedOrder: (state, action) => {
            state.delayedOrders.push(action.payload);
        },
        removeDelayedOrder: (state, action) => {
            state.delayedOrders = state.delayedOrders.filter(order => order.id !== action.payload.id);
        },
        selectTable: (state, action) => {
            state.selectedTable = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssignedTables.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssignedTables.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tables = action.payload.tables;
            })
            .addCase(fetchAssignedTables.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchOrdersForTable.fulfilled, (state, action) => {
                state.orders = action.payload.orders;
            })
            .addCase(fetchOrdersForTable.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

export const {
    setTables,
    setOrders,
    addDelayedOrder,
    removeDelayedOrder,
    selectTable
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
