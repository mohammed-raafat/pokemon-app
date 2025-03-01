import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../../store";
import { setSelectedPokemonId } from "../../store/pokemonSlice";
import { useGetPokemonListQuery } from "../../services/pokemonApi";

import PokemonItem, {
  PokemonItemProps
} from "./components/PokemonItem/PokemonItem";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import "./PokemonList.css";

const PokemonList = () => {
  const [offset, setOffset] = useState(0);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetPokemonListQuery({ offset });
  const selectedPokemonId = useSelector(
    (state: RootState) => state.pokemon.selectedPokemonId
  );
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading Pokemon</div>;

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "list" ? "grid" : "list"));
  };

  const handleNext = () => {
    if (data.next) {
      const url = new URL(data.next);
      const newOffset = url.searchParams.get("offset");
      setOffset(Number(newOffset));
    }
  };

  const handlePrevious = () => {
    if (data.previous) {
      const url = new URL(data.previous);
      const newOffset = url.searchParams.get("offset");
      setOffset(Number(newOffset));
    }
  };

  return (
    <div className="pokemon-list">
      <h1 className="pokemon-list__title">Pokemon ({data.count})</h1>

      <button
        onClick={toggleViewMode}
        className="pokemon-list__view-mode-toggle"
      >
        Switch to {viewMode === "list" ? "Grid" : "List"} View
      </button>
      <div className={`pokemon-list__items pokemon-list__items--${viewMode}`}>
        {data.results.map((pokemon: PokemonItemProps) => (
          <PokemonItem
            {...pokemon}
            key={pokemon.name}
            setSelectedPokemonId={(id) => dispatch(setSelectedPokemonId(id))}
            selectedPokemonId={selectedPokemonId}
          />
        ))}
      </div>
      <div className="pokemon-list__pagination">
        <button onClick={handlePrevious} disabled={!data.previous}>
          Previous
        </button>
        <button onClick={handleNext} disabled={!data.next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
