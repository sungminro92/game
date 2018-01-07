package service;

import java.util.List;

import model.Pokemon;

public interface PokemonServiceI {

	public List<Pokemon> getPokemonByGeneration(int generation);
	
}
