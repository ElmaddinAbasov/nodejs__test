"use strict"
import {databaseHandler} from './database.mjs'

const db = new databaseHandler({
		user : 'postgres', password : 'db1996', host : 'localhost', database : 'postgres'
	});
db._init();
