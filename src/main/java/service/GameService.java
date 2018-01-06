package service;

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
	public Pokemon chooseRandomWord(String data) {
		try {
			final JSONObject obj = new JSONObject(data);
			final JSONArray pokemonSpecies = obj.getJSONArray("pokemon_species");

			double randomNumber = Math.floor(Math.random() * pokemonSpecies.length());
			final JSONObject pokemonObj = pokemonSpecies.getJSONObject((int)randomNumber);
			
			String name = pokemonObj.getString("name");
			String url = pokemonObj.getString("url");
			Pattern p = Pattern.compile("(?<=pokemon-species\\/).*?(?=\\/)");
		    Matcher m = p.matcher(url);
		    m.find();
			int pokemonId = Integer.parseInt(m.group());
		    System.out.println(pokemonId);
		    
		    Pokemon pokemon = new Pokemon();
		    pokemon.setId(pokemonId);
		    pokemon.setName(name);
			return pokemon;
			
		} catch (JSONException je) {
			logger.error("Error parsing JSON.", je);
			return null;
		}
	}
}