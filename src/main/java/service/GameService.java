package service;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import model.Pokemon;

@Service
public class GameService implements GameServiceI {
	private static Logger logger = LoggerFactory.getLogger(GameService.class);

	@Override
	public Pokemon chooseRandomPokemon(List<Pokemon> pokemons) {
		double randomNumber = Math.floor(Math.random() * pokemons.size());
		Pokemon pokemon = pokemons.get((int)randomNumber);
		return pokemon;
	}
}