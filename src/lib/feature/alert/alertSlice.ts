import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name: "alert",
    initialState: {
        alert: "",
        severity: "success",
    },
    reducers: {
        setAlert: (state, action) => {
            state.alert = action.payload;
        },
        clearAlert: (state) => {
            state.alert = "";
        },
    },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;