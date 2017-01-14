var util = require('util');
var http = require('http');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


//some variables
var port = process.env.PORT || process.env.port || process.env.OPENSHIFT_NODEJS_PORT || 9999;
var ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var nodeEnv = process.env.NODE_ENV || 'unknown';

//set up the static directory
app.use(express.static(__dirname + '/public'));

//start up server
// app.listen(port, ip, function() {
	// console.log('Server listening on ' + port);
// });
console.log('Server listening on ' + port);
server.listen(port);

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

var playerDictionary = {};
var openNumbers = [];

// TODO:
// Sync preferences before draft

io.on('connection', function(socket){

  if(playerDictionary[socket.id] == undefined){
    if(openNumbers.length != 0){
      playerDictionary[socket.id] = openNumbers.shift();
    } 
    else{
      playerDictionary[socket.id] = Object.keys(playerDictionary).length;
    }
    console.log(socket.id+"has connected as Player "+playerDictionary[socket.id]);  
  } else {
    //should never happen, I think? 
    console.log(socket.id+"has RECONNECTED as Player "+playerDictionary[socket.id]);
  }

  io.to(socket.id).emit('player number', playerDictionary[socket.id]);
  io.emit('teamNumberChange', Object.keys(playerDictionary).length);

  socket.on('selection made', function(selection){
    console.log(selection);
    io.emit('broadcast pick', selection);
  });

  socket.on('start', function(flock){
    io.emit('flock', flock);
  });

  socket.on('preference change', function(preferences){
    io.emit('global preference change incoming', preferences);
  });
  

  socket.on('disconnect', function(){
    console.log('Player '+playerDictionary[socket.id]+' has disconnected');
    openNumbers.push(playerDictionary[socket.id]);
    delete playerDictionary[socket.id];
  });
});


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
  
  for(var j = 0; j < teams*6; j++){
  	var random = Math.random()*(Object.keys(pokemonArrayCopy).length -1 );
  	var currPoke = pokemonArrayCopy[parseInt(random)];
  	
  	  	while(pokemans.indexOf(currPoke) != -1 ){
  		  	random = Math.random()*(Object.keys(pokemonArrayCopy).length);
  		  	currPoke = pokemonArrayCopy[parseInt(random)];
        }
		    pokemans.push(pokemonArrayCopy[parseInt(random)]);
        species = pokemans[j].species;
        pokemansNamesAndImages.push({name: species, image: 'https://img.pokemondb.net/artwork/'+species.toLowerCase()+'.jpg'});
	}
  res.send(pokemansNamesAndImages);
  io.emit('pokemon incoming', pokemansNamesAndImages);
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


