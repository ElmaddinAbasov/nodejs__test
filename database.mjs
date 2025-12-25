import {Client} from 'pg'
import {queries} from './queries.mjs'
export class databaseHandler
{
	#client1;
	#sqlQueries;
	#buildClient(clientInfo)
	{
		return new Client({
			user : clientInfo.user,
			password : clientInfo.password,
			host : clientInfo.host, 
			port : 5432,
			database : clientInfo.database
		});
	}
	async #init(client)
	{
		console.log("async #init()\n");
		try
		{
			return await client.connect();
		}
		catch (error)
		{
			console.error('ERROR: async #init() failed to connect to a default postgres database : ', error);
		}
	}
	async #runQuery(client, query)
	{
		let value;
		console.log("async #runQuery()");
		try
		{
			value = this.#sqlQueries.get_value(query.q);
			if (value === null || value === undefined)
			{
				console.error("ERROR: In function async #runQuery() query " + query.q + " query doesnt exsist ");
				return;
			}
			return await client.query(value + query.attribute);
		}
		catch(error)
		{
			console.error("ERROR: in async #runQuery failed to run a query " + error);
		}
	}
	async #close(client)
	{
		console.log("async #close()\n");
		try
		{
			return await client.end();
		}
		catch (error)
		{
			console.error('ERROR: async #close() failed to close a database connection : ', error);
		}
	}
	constructor(clientInfo)
	{
		console.log("build client\n");
		this.#sqlQueries = new queries();
		this.#client1 = this.#buildClient(clientInfo);
	}
	async _init()
	{
		try
		{
			await this.#init(this.#client1);
			await this.#runQuery(this.#client1, {q : "create db", attribute : "users_db;"});
			await this.#close(this.#client1);
		}
		catch (error)
		{
			console.error("ERROR: " + error);
		}
	}
}
