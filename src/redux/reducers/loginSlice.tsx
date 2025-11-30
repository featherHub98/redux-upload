import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    email : ""
    
}
const loginSlice = createSlice({
     name:"user",
    initialState,
    reducers:{
        login : (state,action)=>{
            state.isLoggedIn = true;
            state.email = action.payload.email;
        },
        logout : (state,action)=>{
            state.isLoggedIn = false;
            state.email = "";
        }
    }
});
export const {login,logout} = loginSlice.actions
export default loginSlice.reducer

