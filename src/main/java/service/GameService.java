package service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import model.Pokemon;

@Service
public class GameService implements GameServiceI {
	private static Logger logger = LoggerFactory.getLogger(GameService.class);

	@Override
	public Pokemon chooseRandomWord(List<Pokemon> pokemons) {
		double randomNumber = Math.floor(Math.random() * pokemons.size());
		Pokemon pokemon = pokemons.get((int)randomNumber);
		return pokemon;
	}
}