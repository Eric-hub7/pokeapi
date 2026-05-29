import './Home.css';
import { useEffect, useState } from 'react';
import PokemonList from '../components/PokemonList';
import PokemonDetail from '../components/PokemonDetail';
import { getPokemonsWithDetails } from '../api/api';

const typeNameMap = {
  normal: 'Normal',
  fighting: 'Combat',
  flying: 'Volador',
  poison: 'Verí',
  ground: 'Terra',
  rock: 'Roc',
  bug: 'Bèstia',
  ghost: 'Fantasma',
  steel: 'Ferro',
  fire: 'Foc',
  water: 'Aigua',
  grass: 'Planta',
  electric: 'Elèctric',
  psychic: 'Psíquic',
  ice: 'Gel',
  dragon: 'Drac',
  dark: 'Fosc',
  fairy: 'Fada',
  unknown: 'Desconegut',
  shadow: 'Ombra',
};

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [powerLoading, setPowerLoading] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await getPokemonsWithDetails(151);
        setPokemons(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, []);

  const typeOptions = Array.from(
    new Set(pokemons.flatMap((pokemon) => pokemon.types.map((item) => item.type.name)))
  ).sort((a, b) => {
    const labelA = typeNameMap[a] ?? a;
    const labelB = typeNameMap[b] ?? b;
    return labelA.localeCompare(labelB, 'ca');
  });

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedType === 'all') return true;
    if (selectedType === 'shiny') {
      return Boolean(pokemon.sprites?.front_shiny);
    }

    return pokemon.types.some((item) => item.type.name === selectedType);
  });

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    setDetailOpen(true);
    const index = filteredPokemons.findIndex((item) => item.id === pokemon.id);
    setSelectedIndex(index);
  };

  const handleTogglePower = () => {
    const turningOn = !isPoweredOn;
    setIsPoweredOn(turningOn);

    if (turningOn) {
      setPowerLoading(true);
      setTimeout(() => {
        setPowerLoading(false);
      }, 900);
    } else {
      setPowerLoading(false);
    }
  };

  const selectPokemon = (step) => {
    if (filteredPokemons.length === 0) return;

    let currentIndex = selectedIndex;
    if (currentIndex < 0 || currentIndex >= filteredPokemons.length) {
      currentIndex = step > 0 ? 0 : filteredPokemons.length - 1;
    } else {
      currentIndex = (currentIndex + step + filteredPokemons.length) % filteredPokemons.length;
    }

    const nextPokemon = filteredPokemons[currentIndex];
    setSelectedPokemon(nextPokemon);
    setSelectedIndex(currentIndex);
    setDetailOpen(false);
  };

  const openStats = () => {
    if (selectedPokemon) {
      setDetailOpen(true);
    }
  };

  const closeStats = () => {
    setDetailOpen(false);
  };

  return (
    <div className="pokedex-contenidor">
      
      <div className="carcassa-esquerra">
        
        <div className="llums-superior">
          <div className="boto-blau-gran">
            <div className="brillantor-interna"></div>
          </div>
          <div className="semafor">
            <div className="punt punt-vermell"></div>
            <div className="punt punt-groc"></div>
            <div className="punt punt-verd"></div>
          </div>
          <h1 className="titol-pokedex">POKÉDEX</h1>
        </div>

        <div className="search-panel">
          <div className="search-container">
            <input
              type="text"
              placeholder="Cercar Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="select-container">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="type-select"
              aria-label="Filtrar per tipus"
            >
              <option value="all">Tots</option>
              <option value="shiny">Shiny</option>
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {typeNameMap[type] ?? type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="marc-pantalla">
          <div className={`pantalla-negra ${isPoweredOn ? 'encesa' : 'apagada'}`}>
            {isPoweredOn && (
              <PokemonList
                pokemons={filteredPokemons}
                loading={loading || powerLoading}
                selectedPokemon={selectedPokemon}
                onSelect={handleSelectPokemon}
                showShiny={selectedType === 'shiny'}
              />
            )}
          </div>
        </div>

      
        <div className="controls-fisics">
          
        
          <div className="creueta">
            <div className="eix horitzontal"></div>
            <div className="eix vertical"></div>
            <div className="creueta-centre"></div>
            <button className="fletxa flecha-up" onClick={() => selectPokemon(-1)} aria-label="Seleccionar Pokémon anterior">▲</button>
            <button className="fletxa flecha-down" onClick={() => selectPokemon(1)} aria-label="Seleccionar Pokémon següent">▼</button>
            <button className="fletxa flecha-left" onClick={closeStats} aria-label="Tancar estadístiques">◀</button>
            <button className="fletxa flecha-right" onClick={openStats} aria-label="Obrir estadístiques">▶</button>
          </div>

          <div className="altaveu">
            <div className="ranura"></div>
            <div className="ranura"></div>
          </div>

        
          <div className="botons-dreta">
            <div className="boto-negre-petit"></div>
            <div className="boto-blau-mitja" onClick={handleTogglePower}>
              <div className="brillantor-interna-petita"></div>
            </div>
          </div>

        </div>
      </div>

    
      <div className="frontissa-pokedex"></div>

      
      <div className="carcassa-dreta">
        <div className="pantalla-blanca-interna">
          <div className="inner-panel">
            <div className="inner-content">
              {selectedPokemon && detailOpen ? (
                <PokemonDetail pokemon={selectedPokemon} showShiny={selectedType === 'shiny'} />
              ) : (
                <div className="detail-placeholder">
                  {selectedPokemon
                    ? 'Prem la fletxa dreta per veure les estadístiques'
                    : 'Selecciona un Pokémon'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}