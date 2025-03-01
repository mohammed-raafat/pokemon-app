import { useSelector } from "react-redux";

import { useGetPokemonDetailsByIdQuery } from "../../services/pokemonApi";
import { RootState } from "../../store";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import "./PokemonDetails.css";

type PokemonType = { type: { name: string } };

const PokemonDetails = () => {
  const selectedPokemonId = useSelector(
    (state: RootState) => state.pokemon.selectedPokemonId
  );

  const { data, error, isLoading } = useGetPokemonDetailsByIdQuery(
    selectedPokemonId,
    {
      skip: !selectedPokemonId
    }
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading Pokemon details</div>;

  const { name, height, weight, types = [], sprites = {} } = data || {};

  const convertedHeight = height * 10; // convert height from decimeters to centimeters
  const convertedWeight = weight / 10; // convert weight from hectograms to kilograms

  const info = [
    { label: "Name", value: name },
    { label: "Height", value: `${convertedHeight} cm` },
    { label: "Weight", value: `${convertedWeight} kg` },
    {
      label: "Types",
      value: types.map((type: PokemonType) => type.type.name).join(", ")
    }
  ];

  return (
    <div className="pokemon-details">
      {!selectedPokemonId ? (
        <div className="pokemon-details__empty-state">
          <div>Select a Pokemon to see details</div>
        </div>
      ) : (
        <>
          <div className="pokemon-details__title">
            <h2>{name}</h2>
          </div>
          <div className="pokemon-details__content">
            <img
              className="pokemon-details__image"
              src={sprites.front_default}
              alt={name}
            />
            <div className="pokemon-details__info">
              {info.map((info, index) => (
                <div className="pokemon-details__row" key={index}>
                  <div>{info.label}:</div>
                  <div>{info.value}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonDetails;
