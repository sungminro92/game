package service;

import java.util.List;

import model.Pokemon;

public interface PokemonServiceI {

	public List<Pokemon> getPokemonsByGeneration(int generation);
	
	public void fillPokemonInfo(Pokemon pokemon);
	
}
