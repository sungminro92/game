package poke;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import model.Pokemon;
import service.GameServiceI;
import service.ImageServiceI;
import service.PokemonServiceI;

@Controller
@ComponentScan("service")
public class MainController {

	@Autowired
	GameServiceI gameService;
	
	@Autowired
	ImageServiceI imageService;
	
	@Autowired
	PokemonServiceI pokemonService;

	@RequestMapping(value = "/restart", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView restart(ModelMap model) {
		return new ModelAndView("index");
	}

	@RequestMapping(value = "/getPokemon")
	@ResponseBody
	public Pokemon getPokemon(ModelMap model,
			@RequestParam(value = "level", required = true) String level,
			@RequestParam(value = "generation", defaultValue = "1") int generation) {
	
		List<Pokemon> pokemons = pokemonService.getPokemonsByGeneration(generation);
		Pokemon pokemon = gameService.chooseRandomPokemon(pokemons);
		pokemonService.fillPokemonInfo(pokemon);
		
		return pokemon;
	}

	@RequestMapping(value = "/freemon")
	public String getPokemon(ModelMap model) {
		return "freemon";
	}

	/**
	 * Example mapping using Thymeleaf
	 * @param name
	 * @param model
	 * @return 
	 */
	@RequestMapping("/greeting")
	public String greeting(@RequestParam(value = "name", required = false, defaultValue = "World") String name,
			Model model) {
		model.addAttribute("name", name);
		return "greeting";
	}

}
