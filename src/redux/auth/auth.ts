import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { RootState } from "../store";


  interface State {
    token:string
  }

  const initialState: State = {
    token: (localStorage.getItem('token') ?? '')
  }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  extraReducers: (reducer) => {
    reducer.addMatcher(api.endpoints.authRegistr.matchFulfilled,(state,{payload}) => {
      state.token = payload.token
      localStorage.setItem('token',payload.token)
    })
  }
})


export const useAuth = (state:RootState) => !!state.auth.token
export const {reducer} = authSlice
export const {logout} = authSlice.actions