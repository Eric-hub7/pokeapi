import './PokemonDetail.css';
const typeNameMap = {
  normal: 'normal', fighting: 'combat', flying: 'volador', poison: 'verí',
  ground: 'terra', rock: 'roc', bug: 'bèstia', ghost: 'fantasma',
  steel: 'ferro', fire: 'foc', water: 'aigua', grass: 'planta',
  electric: 'elèctric', psychic: 'psíquic', ice: 'gel', dragon: 'drac',
  dark: 'fosc', fairy: 'fada',
};

const typeColors = {
  normal: '#A8A77A', fighting: '#C22E28', flying: '#A98FF3', poison: '#A33EA1',
  ground: '#E2BF65', rock: '#B6A136', bug: '#A6B91A', ghost: '#735797',
  steel: '#B7B7CE', fire: '#EE8130', water: '#6390F0', grass: '#7AC74C',
  electric: '#F7D02C', psychic: '#F95587', ice: '#96D9D6', dragon: '#6F35FC',
  dark: '#705746', fairy: '#D685AD',
};

const statMap = {
  hp: 'PS', attack: 'Atac', defense: 'Defensa',
  'special-attack': 'Atac esp.', 'special-defense': 'Defensa esp.', speed: 'Velocitat',
};

export default function PokemonDetail({ pokemon, showShiny = false }) {
  if (!pokemon) return null;

  const getMaxStat = () => Math.max(...pokemon.stats.map(s => s.base_stat), 100);
  const maxStat = getMaxStat();
  const sprite = showShiny ? pokemon.sprites.front_shiny || pokemon.sprites.front_default : pokemon.sprites.front_default;

  return (
    <div className="pokemon-detail">
      <div className="detail-header">
        <span className="pokemon-number">#{String(pokemon.id).padStart(3, '0')}</span>
        <button className="favorite-btn">♥</button>
      </div>

      <div className="detail-body">
        <div className="detail-summary">
          <h2>{pokemon.name}</h2>

          <div className="types">
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

          {pokemon.description && (
            <p className="detail-description">{pokemon.description}</p>
          )}

          <div className="detail-info-card">
            <div className="info-group">
              <label>Alçada</label>
              <span>{(pokemon.height / 10).toFixed(1)} m</span>
            </div>
            <div className="info-group">
              <label>Habilitat</label>
              <span>{pokemon.abilities?.[0]?.ability?.name || 'N/A'}</span>
            </div>
            <div className="info-group">
              <label>Pes</label>
              <span>{(pokemon.weight / 10).toFixed(1)} kg</span>
            </div>
            <div className="info-group">
              <label>Categoria</label>
              <span>Pokémon {pokemon.species?.name || 'Unknown'}</span>
            </div>
          </div>
        </div>

        <div className="detail-image-wrapper">
          <img src={sprite} alt={pokemon.name} className="detail-image" />
        </div>
      </div>

      <div className="detail-bottom">
        <div className="detail-stats">
        <h3>Estadístiques</h3>
        <div className="stats-container">
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="stat-row">
              <span className="stat-name">{statMap[stat.stat.name] ?? stat.stat.name}</span>
              <div className="stat-bar-wrapper">
                <div
                  className="stat-bar"
                  style={{
                    width: `${(stat.base_stat / maxStat) * 100}%`,
                    backgroundColor: getStatColor(statMap[stat.stat.name]),
                  }}
                ></div>
              </div>
              <span className="stat-val">{stat.base_stat}</span>
            </div>
          ))}
          <div className="stat-row total">
            <span className="stat-name">Total</span>
            <span className="stat-val">
              {pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}
            </span>
          </div>
        </div>
      </div>

      {pokemon.topMoves && pokemon.topMoves.length > 0 && (
        <div className="detail-moves">
          <h3>Moviments</h3>
          <div className="moves-container">
            {pokemon.topMoves.map((move, idx) => (
              <span key={idx} className="move-badge">{move}</span>
            ))}
          </div>
        </div>
      )}
        </div>
      </div>

  );
}

function getStatColor(statName) {
  const colors = {
    'PS': '#ef5350',
    'Atac': '#fbc02d',
    'Defensa': '#ff8a35',
    'Atac esp.': '#29b6f6',
    'Defensa esp.': '#26a69a',
    'Velocitat': '#ab47bc',
  };
  return colors[statName] || '#999';
}