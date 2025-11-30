import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginSlice.tsx";

export const store = configureStore({
    reducer : {
        user : loginReducer
    }
});