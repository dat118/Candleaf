import { Product } from "@/app/models";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, value.toString());
      });
      return searchParams.toString();
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], any>({
      query: (params) => ({ url: "products", params }),
    }),
    getProductById: builder.query<Product, { id: string }>({
      query: ({ id }) => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
