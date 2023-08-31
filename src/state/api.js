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
    searchVendors: build.query({
      query: (name, pageNumber, pageSize) => {
        let query = `vendors/fmcsa/search?name=${name}`;
        
        if (pageNumber) {
          query += `&pageNumber=${pageNumber}`;
        }
    
        if (pageSize) {
          query += `&pageSize=${pageSize}`;
        }
    
        return query;
      },
      providesTags: ["Vendor"],
    }),
    getVendorByUSDOTFromFMCSA: build.query({
      query: (usdot) => `vendors/fmcsa/${usdot}`,
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
  useSearchVendorsQuery,
  useGetVendorByUSDOTFromFMCSAQuery,
} = api;