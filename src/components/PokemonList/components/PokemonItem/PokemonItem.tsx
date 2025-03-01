import { FC } from "react";

import { getIdFromUrl } from "../../../../utils/helper";

import "./PokemonItem.css";

export interface PokemonItemProps {
  name: string;
  url: string;
  selectedPokemonId: string | null;
  setSelectedPokemonId: (id: string) => void;
}

const PokemonItem: FC<PokemonItemProps> = ({
  name,
  url,
  selectedPokemonId,
  setSelectedPokemonId
}) => {
  const id = getIdFromUrl(url);
  const isSelected = selectedPokemonId === id;
  const onItemClick = () => {
    setSelectedPokemonId(id);
  };

  return (
    <div
      className={`pokemon-list__item${
        isSelected ? " pokemon-list__item--selected" : ""
      }`}
      onClick={onItemClick}
    >
      <span className="pokemon-list__item__name">{name}</span>
    </div>
  );
};

export default PokemonItem;
