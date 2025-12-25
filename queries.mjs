"use strict"

export class queries
{
	#sqlQueries;
	constructor()
	{
		this.#sqlQueries = new Map();
		this.#sqlQueries.set("create db", "CREATE DATABASE ");
	}
	get_value(key)
	{
		let i;
		for (i = 0; i < this.#sqlQueries.size; i++)
		{
			if (this.#sqlQueries.has(key))
				return this.#sqlQueries.get(key);
		}
		return null;
	}
}
