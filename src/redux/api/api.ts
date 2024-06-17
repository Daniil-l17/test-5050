import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface RootInterface {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Datum[];
  support: Support;
}

export interface Support {
  url: string;
  text: string;
}

export interface Datum {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

// current

export interface RootInterfaceCurrent {
  data: Data2;
  support: Support2;
}


export interface Support2 {
  url: string;
  text: string;
}

export interface Data2 {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://reqres.in/api'
  }),
  endpoints: builder => ({
    getUser: builder.query<RootInterface,number>({
      query: (page) => `/users?per_page=${page}`
    }),
    getCurrentUser: builder.query<Data2,number>({
      query: (id) => `/users/${id}`,
      transformResponse: (resp:any) => {
        return resp.data
      }
    }),
    authRegistr: builder.mutation<{id:number,token:string},{email:string,password:number}>({
      query: (body) => ({
        method: 'POST',
        url: '/register',
        body
      })
    })
  })
})

export const {useGetUserQuery,useAuthRegistrMutation,useGetCurrentUserQuery} = api