package poke;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

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

import service.GameServiceI;

@Controller
@ComponentScan("service")
public class MainController {

	private final String USER_AGENT = "Mozilla/5.0";

	@Autowired
	GameServiceI gameService;

	@RequestMapping(value = "/restart", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView restart(ModelMap model) {
		return new ModelAndView("index");
	}

	@RequestMapping(value = "/getWord")
	@ResponseBody
	public String getWord(ModelMap model,
			@RequestParam(value = "level", required = true) String level) {
//		StringBuffer response = new StringBuffer();
//		try {
//			URL url = new URL("https://pokeapi.co/api/v2/generation/1/"); // MalformedURLException
//			HttpURLConnection con = (HttpURLConnection) url.openConnection(); // IOException
//			con.addRequestProperty("User-Agent", USER_AGENT);
//			con.setRequestMethod("GET"); // ProtocolException
//
//			int responseCode = con.getResponseCode(); // IOException
//			if (responseCode != HttpURLConnection.HTTP_OK) {
//
//			}
//
//			BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
//			String output;
//			response = new StringBuffer();
//
//			while ((output = in.readLine()) != null) {
//				response.append(output);
//			}
//			in.close();
//
//			System.out.println(response.toString());
//
//		} catch (MalformedURLException me) {
//			System.out.println("URL not valid. " + me.getMessage());
//		} catch (ProtocolException pe) {
//			System.out.println("GET Protocol not valid. " + pe.getMessage());
//		} catch (IOException ioe) {
//			System.out.println("Unable to read connection. " + ioe.getMessage());
//		}

		return "charmander";
	}

	@RequestMapping(value = "/freemon")
	public String getPokemon(ModelMap model) {
		model.addAttribute("word", "Charmander");

		return "freemon";
	}

	@RequestMapping("/greeting")
	public String greeting(@RequestParam(value = "name", required = false, defaultValue = "World") String name,
			Model model) {
		model.addAttribute("name", name);
		return "greeting";
	}

}
