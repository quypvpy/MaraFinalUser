import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import studentApi from "../api/studentApi";
import StorageKeys from "../constants/storage-keys";

// First, create the thunk
export const register = createAsyncThunk("users/register", async (payload) => {
    //   call API to register
    // payload thoong tin user nhap tren form
    const data = await studentApi.create(payload);
      if(data.check ==true) {

        return {
          check:data.check,
          msg:data.msg,
          data:data.data[0],
        };
      }
      else{
        return data;
      }
  
});
export const login = createAsyncThunk("users/login", async (payload) => {
    //   call API to register
    // payload thoong tin user nhap tren form
    const data = await studentApi.checkLogin(payload);
      if(data.check ==true) {

         // // save data locastorege
        localStorage.setItem(StorageKeys.TOKEN, data.jwt[0].remember_token);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data[0]));

        return {
          check:data.check,
          msg:data.msg,
          data:data.data[0],
        };
      }
      else{
        return data;
      }
  
});

  const userSlice = createSlice({
    name: "user",
    initialState: {
      current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
      settings: {},
      menu:[],
    },
    reducers: {
      logout:(state)=> {
        // clear local storage
        localStorage.removeItem(StorageKeys.USER);
        localStorage.removeItem(StorageKeys.TOKEN);
        state.current = {};
      },
      setMenu:(state,action)=> {
        state.menu = action.payload;
      },
    },


    extraReducers: (builder) => {
      builder
        .addCase(login.fulfilled, (state, action) => {
          // ở đây nghĩa là  khi gọi hàm login và fullfill.. hàm đó trả về j.thì gọi là payload.
          state.current = action.payload;
          
        })
        .addCase(register.fulfilled, (state, action) => {
          // ở đây nghĩa là  khi gọi hàm login và fullfill.. hàm đó trả về j.thì gọi là payload.
          state.current = action.payload;
          
        })
    },

  });
  const { actions, reducer } = userSlice;
  export const { logout,setMenu } = actions;
  export default reducer; // export default