import { PayloadAction, configureStore,createSlice } from "@reduxjs/toolkit";
interface userstatevalue {
    username: string;
}
interface userstate {
    value: userstatevalue; 
}
const initialState = {value: {username: ""}} as userstate;
const userslice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login:(state: userstate,action: PayloadAction<userstatevalue>) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value  = initialState.value;
        },
    },

});
export const {login,logout} = userslice.actions
export const store = configureStore({
             reducer: {
                user: userslice.reducer, 
             }
});