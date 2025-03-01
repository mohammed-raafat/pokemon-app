import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

import store from "../store";
import { useGetPokemonDetailsByIdQuery } from "../services/pokemonApi";
import PokemonDetails from "../components/PokemonDetails/PokemonDetails";

jest.mock("../services/pokemonApi.ts", () => ({
  ...jest.requireActual("../services/pokemonApi.ts"),
  useGetPokemonDetailsByIdQuery: jest.fn()
}));

describe("PokemonDetails", () => {
  test("renders error message when there is an error", async () => {
    (useGetPokemonDetailsByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false
    });

    render(
      <Provider store={store}>
        <PokemonDetails />
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Error loading Pokemon details")
      ).toBeInTheDocument();
    });
  });

  test("renders Pokemon details correctly", async () => {
    (useGetPokemonDetailsByIdQuery as jest.Mock).mockReturnValue({
      data: {
        name: "bulbasaur",
        height: 7,
        weight: 69,
        types: [{ type: { name: "grass" } }],
        sprites: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
        }
      },
      error: null,
      isLoading: false
    });

    render(
      <Provider store={store}>
        <PokemonDetails />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByAltText("bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("70 cm")).toBeInTheDocument();
      expect(screen.getByText("6.9 kg")).toBeInTheDocument();
      expect(screen.getByText("grass")).toBeInTheDocument();
    });
  });

  test("renders loading spinner when data is loading", async () => {
    (useGetPokemonDetailsByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true
    });

    render(
      <Provider store={store}>
        <PokemonDetails />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });
  });
});
