package model;

import lombok.Data;

@Data
public class Pokemon {
	private int id;
	private String name;
	private int weight;
	private int height;
	private String imgUrl;
}
