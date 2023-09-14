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
      query: ({name, pageSize, cargoFilter, cursor = null}) => {
        let query = `vendors/fmcsa/search?name=${name}`;
        
        if (pageSize) {
          query += `&pageSize=${pageSize}`;
        }
    
        if (cargoFilter) {
          query += `&cargoFilter=${cargoFilter}`;
        }
    
        if (cursor !== null) {
          query += `&cursor=${cursor}`;
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
    createRFPRequest: build.mutation({
      query: (body) => ({
        url: `rfp_management`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Vendor", "RFP"],
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