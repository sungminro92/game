package service;

import java.util.List;

import model.Pokemon;

public interface GameServiceI {

	public Pokemon chooseRandomPokemon(List<Pokemon> pokemons);
	
}
