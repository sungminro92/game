package service;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class GameService implements GameServiceI {
	private static Logger logger = LoggerFactory.getLogger(GameService.class);

	@Override
	public String chooseRandomWord(String data) {
		try {
			final JSONObject obj = new JSONObject(data);
			final JSONArray pokemonSpecies = obj.getJSONArray("pokemon_species");

			double randomNumber = Math.floor(Math.random() * pokemonSpecies.length());
			final JSONObject pokemon = pokemonSpecies.getJSONObject((int)randomNumber);
			return pokemon.getString("name");
			
		} catch (JSONException je) {
			logger.error("Error parsing JSON.", je);
			return null;
		}
	}
}