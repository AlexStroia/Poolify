import { createSlice } from "@reduxjs/toolkit";
import { dashboardPageInitialState } from "../state/ApplicationState";

export const dashboardSlice = createSlice({
    name:'dashboard',
    initialState: dashboardPageInitialState,
    reducers: {
        changePage(state, action) {
           state.page =  action.payload;
        }
    }
}
);

export const {changePage} = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
