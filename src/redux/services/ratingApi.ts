import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ratingApi = createApi({
  reducerPath: "ratingApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
  }),
  endpoints: (builder) => ({
    getRatings: builder.query<any, null>({
      query: () => "testimonials",
    }),
  }),
});

export const { useGetRatingsQuery } = ratingApi;
