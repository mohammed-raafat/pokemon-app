import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://pokeapi.co/api/v2/";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPokemonList: builder.query({
      query: ({ offset = 0, limit = 20 }) =>
        `pokemon?offset=${offset}&limit=${limit}`
    }),
    getPokemonDetailsById: builder.query({
      query: (id) => `pokemon/${id}`
    })
  })
});

export const { useGetPokemonListQuery, useGetPokemonDetailsByIdQuery } =
  pokemonApi;
