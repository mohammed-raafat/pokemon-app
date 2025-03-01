import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonState {
  selectedPokemonId: string | null;
}

const initialState: PokemonState = {
  selectedPokemonId: "1"
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setSelectedPokemonId(state, action: PayloadAction<string | null>) {
      state.selectedPokemonId = action.payload;
    }
  }
});

export const { setSelectedPokemonId } = pokemonSlice.actions;
export default pokemonSlice.reducer;
