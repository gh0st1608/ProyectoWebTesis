import { config } from 'dotenv';
// WINDOWS
// require('dotenv').config();

let configInit: any = null;

function initializeConfig(){
	
	if(!configInit){ // NO HAY CONFIG INIT
		config();
		configInit = process.env;
        //console.log(configInit)
	}

	return configInit;
}

export default initializeConfig;
