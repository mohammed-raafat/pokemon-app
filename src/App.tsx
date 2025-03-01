import PokemonList from "./components/PokemonList/PokemonList";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <PokemonList />
      <PokemonDetails />
    </div>
  );
};

export default App;
