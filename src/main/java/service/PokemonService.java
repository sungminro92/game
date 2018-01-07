package service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
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
public class PokemonService implements PokemonServiceI {
	
	private static Logger logger = LoggerFactory.getLogger(GameService.class);
	
	private final String USER_AGENT = "Mozilla/5.0";

//	@Override
//	public
	
	@Override
	public List<Pokemon> getPokemonByGeneration(int generation) {
		StringBuffer response = new StringBuffer();
		try {
			String urlString = String.format("https://pokeapi.co/api/v2/generation/%d/", generation);
			URL url = new URL(urlString); // MalformedURLException
			HttpURLConnection con = (HttpURLConnection) url.openConnection(); // IOException
			con.addRequestProperty("User-Agent", USER_AGENT);
			con.setRequestMethod("GET"); // ProtocolException

			int responseCode = con.getResponseCode(); // IOException
			if (responseCode != HttpURLConnection.HTTP_OK) {

			}

			BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			String output;
			response = new StringBuffer();

			while ((output = in.readLine()) != null) {
				response.append(output);
			}
			in.close();

		} catch (MalformedURLException me) {
			System.out.println("URL not valid. " + me.getMessage());
		} catch (ProtocolException pe) {
			System.out.println("GET Protocol not valid. " + pe.getMessage());
		} catch (IOException ioe) {
			System.out.println("Unable to read connection. " + ioe.getMessage());
		}
		
		List<Pokemon> pokemons = new ArrayList<>();
		if (response.length()!=0) {
			try {
				final JSONObject obj = new JSONObject(response.toString());
				final JSONArray pokemonSpeciesList = obj.getJSONArray("pokemon_species");
				
				for (int i=0;i<pokemonSpeciesList.length();i++) {
					JSONObject pokemonSpecies = pokemonSpeciesList.getJSONObject(i);
					String name = pokemonSpecies.getString("name");
					String url = pokemonSpecies.getString("url");
					Pattern p = Pattern.compile("(?<=pokemon-species\\/).*?(?=\\/)");
				    Matcher m = p.matcher(url);
				    m.find();
					int pokemonId = Integer.parseInt(m.group());
				    
				    Pokemon pokemon = new Pokemon();
				    pokemon.setId(pokemonId);
				    pokemon.setName(name);
				    
				    pokemons.add(pokemon);
				}
				
			} catch (JSONException je) {
				logger.error("Error parsing JSON.", je);
				return null;
			}
		}
		
		return pokemons;
	}
	
	
	
}
