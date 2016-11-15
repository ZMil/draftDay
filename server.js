var util = require('util');
var http = require('http');
var express = require('express');
var app = express();

//some variables
var port = process.env.PORT || process.env.port || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var nodeEnv = process.env.NODE_ENV || 'unknown';

//set up the static directory
app.use(express.static(__dirname + '/public'));

//start up server
app.listen(port, ip, function() {
	console.log('Server listening on ' + port);
});

var gen1 = [1, 151];
var gen2 = [152, 251];
var gen3 = [252, 386];
var gen4 = [387, 493];
var gen5 = [494, 649];
var gen6 = [650, 721];

var generationBounds = [gen1, gen2, gen3, gen4, gen5, gen6];

var types =  ["Bird",
              "Normal",
              "Grass",
              "Poison",
              "Fire",
              "Flying",
              "Water",
              "Bug",
              "Electric",
              "Ground",
              "Fairy",
              "Fighting",
              "Psychic",
              "Rock",
              "Steel",
              "Ice",
              "Ghost",
              "Dark",
              "Dragon"];

var pokemon = require('./data/pokemon.js');
var battlePokedex = pokemon.BattlePokedex;

var pokemonArray = {};
for(pokemon in battlePokedex){
	pokemonArray[battlePokedex[pokemon].num] = battlePokedex[pokemon];
}



app.get('/p/:numberOfTeams/:tier/:finalForm/:genStr/:baseStatMin/:mega/:typeStr', function(req, res) {
  var teams = req.params.numberOfTeams;
  var tier = req.params.tier;

  var finalForm = req.params.finalForm;

  var genStr = req.params.genStr;
  var genBounds = [];
  var lastGenAdded = false;
  for(var i = 0; i < genStr.length; i++){
  	if(genStr[i] == "t"){
  		genBounds.push(generationBounds[i]);

  		if(lastGenAdded){
  			var genBoundsLength = genBounds.length;
  			var newBound = [genBounds[genBoundsLength-2][0], genBounds[genBoundsLength-1][1]];
  			genBounds.pop();
  			genBounds.pop();
  			genBounds.push(newBound);
  		}
  		lastGenAdded = true;
  	} else{
  		lastGenAdded = false;
  	}
  }

  var typeStr = req.params.typeStr;
  var selectedTypes = [];
  var allTypes = true;
  for(var i = 0; i < typeStr.length; i++){
    if(typeStr[i] == "1"){
      selectedTypes.push(types[i]);
    } else {
      allTypes = false;
    }
  }

  var baseStatMin = req.params.baseStatMin;
  var mega = req.params.mega;

  var pokemans = [];
  var pokemansNamesAndImages = [];

  var pokemonArrayCopy = [];
  if(tier != "Tiers"){
  	for(pokemon in pokemonArray){
  		if(pokemonArray[pokemon].tier == tier){
  			if(mega == "true"){
  				if(pokemonArray[pokemon].forme != undefined){
		  			if(pokemonArray[pokemon].forme.toLowerCase().includes('mega')){
              if(allTypes){
                if(finalForm == 'true' && currPoke.evos == undefined){
  		  				  if(!FitsInGenBounds(currPoke.num, genBounds)){
                    pokemonArrayCopy.push(pokemonArray[pokemon]);
                  }
                }
              } else {  
              if(TypeCheck(selectedTypes, pokemonArray[pokemon].types)){
                if(finalForm == 'true' && currPoke.evos == undefined){
                  if(!FitsInGenBounds(currPoke.num, genBounds)){
                    pokemonArrayCopy.push(pokemonArray[pokemon]); 
                  }
                }
              }
            }
		  			}
		  		}
  			}
  			else if(baseStatMin > 0){
  				if(SatisfiesMinBaseStats(pokemonArray[pokemon].baseStats, baseStatMin)){
            if(allTypes){
              pokemonArrayCopy.push(pokemonArray[pokemon]);  
            } else {
              if(TypeCheck(selectedTypes, pokemonArray[pokemon].types)){
                if(finalForm == 'true' && currPoke.evos == undefined){
                  if(!FitsInGenBounds(currPoke.num, genBounds)){
                    pokemonArrayCopy.push(pokemonArray[pokemon]); 
                  }
                }
              }
            }	
  				}
  			}
  			else if(!allTypes){          
          if(finalForm == 'true' && currPoke.evos == undefined){
            if(TypeCheck(selectedTypes, pokemonArray[pokemon].types)){
              pokemonArrayCopy.push(pokemonArray[pokemon]); 
            }
          }
  			}
        else{
          if(finalForm == 'true' && currPoke.evos == undefined){
            if(!FitsInGenBounds(currPoke.num, genBounds)){
              pokemonArrayCopy.push(pokemonArray[pokemon]); 
            }
          }
        }			
  		}
  	}
  }
  else if(mega == "true"){
  	for(pokemon in pokemonArray){
  		if(pokemonArray[pokemon].forme != undefined){
  			if(pokemonArray[pokemon].forme.toLowerCase().includes('mega')){
          if(allTypes){
            if(finalForm == 'true' && currPoke.evos == undefined){
              if(!FitsInGenBounds(currPoke.num, genBounds)){
                pokemonArrayCopy.push(pokemonArray[pokemon]);  
              }
            }
          } else { 
            if(TypeCheck(selectedTypes, pokemonArray[pokemon].types)){
              if(finalForm == 'true' && currPoke.evos == undefined){
                if(!FitsInGenBounds(currPoke.num, genBounds)){
                  pokemonArrayCopy.push(pokemonArray[pokemon]); 
                }
              }
            }
          }
  			}
  		}
  	}
  }
  else if(baseStatMin > 0){
  	for(pokemon in pokemonArray){
  		if(SatisfiesMinBaseStats(pokemonArray[pokemon].baseStats, baseStatMin)){
  			if(allTypes){
          pokemonArrayCopy.push(pokemonArray[pokemon]);  
        } else {
          if(TypeCheck(selectedTypes, pokemonArray[pokemon].types)){
            if(finalForm == 'true' && currPoke.evos == undefined){
              if(!FitsInGenBounds(currPoke.num, genBounds)){
                pokemonArrayCopy.push(pokemonArray[pokemon]); 
              }
            }
          }
        }	
  		}
  	}
  }
  else if(!allTypes){
    for(pokemon in pokemonArray){ 
      if(TypeCheck(selectedTypes, pokemonArray[pokemon].types)){
        if(finalForm == 'true' && currPoke.evos == undefined){
          if(FitsInGenBounds(currPoke.num, genBounds)){
            pokemonArrayCopy.push(pokemonArray[pokemon]); 
          }
        }
      }
    }
  }
  else{
  	pokemonArrayCopy = pokemonArray;
  }


  
  for(var i = 0; i < teams*6; i++){
  	var random = Math.random()*(Object.keys(pokemonArrayCopy).length -1 );
  	var currPoke = pokemonArrayCopy[parseInt(random)];
  	
  	  	while(pokemans.indexOf(currPoke) != -1 ){
  		  	random = Math.random()*(Object.keys(pokemonArrayCopy).length);
  		  	currPoke = pokemonArrayCopy[parseInt(random)];
        }
		
	}

	pokemans.push(pokemonArrayCopy[parseInt(random)]);
	pokemansNamesAndImages.push({name: pokemans[i].species, image: 'https://img.pokemondb.net/artwork/'+pokemans[i].species.toLowerCase()+'.jpg'});
  }

  res.send(pokemansNamesAndImages);
});

function FitsInGenBounds(pokemonNum, genBounds){
	var num = pokemonNum;
	for(var bound in genBounds){
		var low = genBounds[bound][0];
		var high = genBounds[bound][1];
		if(low <= num && high >= num){
			return true;
		}
	}
	return false;
}

function SatisfiesMinBaseStats(pokemonBaseStats, minBaseStat){
	var sum = 0;
	for(var stat in pokemonBaseStats){
		sum += pokemonBaseStats[stat];
	}
	return sum >= minBaseStat;
}

function TypeCheck(selectedTypes, pokemonTypes){
  for(var i = 0; i < selectedTypes.length; i++){
    if(pokemonTypes.includes(selectedTypes[i])){
      return true;
    }
  }
  return false;
}


