import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

import store from "../store";
import { useGetPokemonListQuery } from "../services/pokemonApi";
import PokemonList from "../components/PokemonList/PokemonList";

jest.mock("../services/pokemonApi.ts", () => ({
  ...jest.requireActual("../services/pokemonApi.ts"),
  useGetPokemonListQuery: jest.fn()
}));

describe("Pokemon List Component", () => {
  beforeEach(() => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" }
        ]
      }
    });
  });

  test("renders Pokemon list", async () => {
    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("charmander")).toBeInTheDocument();
    });
  });
});
