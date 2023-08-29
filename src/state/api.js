import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Vendor",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getVendors: build.query({
      query: (shipperID) => `vendors?shipperID=${shipperID}`,
      providesTags: ["Vendor"],
    }),
    getVendorByID: build.query({
      query: ({vendorID, shipperID}) => {
        return `vendors/${vendorID}?shipperID=${shipperID}`;
     },
     providesTags: ["Vendor"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetVendorsQuery,
  useGetVendorByIDQuery,
  useGetDashboardQuery,
} = api;