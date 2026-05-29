import { useEffect, useRef } from "react";

const typeNameMap = {
  fire: 'foc', water: 'aigua', grass: 'planta', electric: 'elèctric',
  ice: 'gel', fighting: 'combat', poison: 'verí', ground: 'terra',
  flying: 'volador', psychic: 'psíquic', bug: 'bèstia', rock: 'roc',
  ghost: 'fantasma', dragon: 'drac', dark: 'fosc', steel: 'ferro',
  fairy: 'fada', normal: 'normal',
};

const typeColors = {
  normal: '#A8A77A', fighting: '#C22E28', flying: '#A98FF3', poison: '#A33EA1',
  ground: '#E2BF65', rock: '#B6A136', bug: '#A6B91A', ghost: '#735797',
  steel: '#B7B7CE', fire: '#EE8130', water: '#6390F0', grass: '#7AC74C',
  electric: '#F7D02C', psychic: '#F95587', ice: '#96D9D6', dragon: '#6F35FC',
  dark: '#705746', fairy: '#D685AD',
};

export default function PokemonList({ pokemons, onSelect, selectedPokemon, loading, showShiny }) {
  const selectedCardRef = useRef(null);

  useEffect(() => {
    if (selectedCardRef.current) {
      selectedCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedPokemon]);

  if (loading) {
    return (
      <div className="pokeball-loader-container">
        <div className="pokeball-loader">
          <div className="pokeball-top"></div>
          <div className="pokeball-bottom"></div>
          <div className="pokeball-center"></div>
        </div>
        <p>Carregant...</p>
      </div>
    );
  }

  if (!pokemons || pokemons.length === 0) {
    return <p>No s'han trobat Pokémon.</p>;
  }

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => {
        const sprite = showShiny ? pokemon.sprites.front_shiny || pokemon.sprites.front_default : pokemon.sprites.front_default;
        
        return (
          <div
            key={pokemon.id}
            ref={selectedPokemon?.id === pokemon.id ? selectedCardRef : null}
            onClick={() => onSelect(pokemon)}
            className={`pokemon-item ${selectedPokemon?.id === pokemon.id ? 'selected' : ''}`}
          >
            <div className="pokemon-item-left">
              <img src={sprite} alt={pokemon.name} className="pokemon-item-image" />
            </div>
            
            <div className="pokemon-item-content">
              <div className="pokemon-item-number">#{String(pokemon.id).padStart(3, '0')}</div>
              <div className="pokemon-item-name">{pokemon.name}</div>
              <div className="pokemon-item-types">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="type-chip"
                    style={{ backgroundColor: typeColors[t.type.name] || '#2b3138' }}
                  >
                    {typeNameMap[t.type.name] ?? t.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="pokemon-item-icons">
              <svg className="pokeball-icon" viewBox="0 0 24 24" width="24" height="24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="#dc0a2d" strokeWidth="2"/>
                <circle cx="12" cy="5" r="7" fill="none" stroke="#dc0a2d" strokeWidth="2"/>
                <line x1="2" y1="12" x2="22" y2="12" stroke="#dc0a2d" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" fill="#dc0a2d"/>
              </svg>
              <span className="arrow-icon">›</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}