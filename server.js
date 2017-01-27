var util = require('util');
var http = require('http');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// app.use(router);
var ejs = require('ejs');


//some variables
// var port = process.env.PORT || process.env.port || process.env.OPENSHIFT_NODEJS_PORT || 9999;
// var ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var nodeEnv = process.env.NODE_ENV || 'unknown';

var PORT = process.env.OPENSHIFT_NODEJS_PORT ||process.env.PORT || 8080;
var IP = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0';

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

var openNumbersForRooms = {};

var rooms = [];
var roomLookUp = {};
var roomPlayerDictionary = [];

var playersReadyByRoom = {};

var updatesPerRoom = {};

Object.values = obj => Object.keys(obj).map(key => obj[key]);

io.on('connection', function(socket){

  var roomsAndNumbers = [];
  for(var j = 0; j < rooms.length; j++){
    roomsAndNumbers.push({name: rooms[j], numberOfPlayers: Object.keys(roomPlayerDictionary[rooms[j]]).length});
  }

  io.to(socket.id).emit('exisiting rooms', roomsAndNumbers);

  socket.on('selection made', function(selection){
    // console.log(selection);
    io.to(roomLookUp[socket.id]).emit('broadcast pick', selection);
    if(updatesPerRoom[roomLookUp[socket.id]]['selections'] != undefined){
      updatesPerRoom[roomLookUp[socket.id]]['selections'].push(selection);
    }
    else{
      updatesPerRoom[roomLookUp[socket.id]]['selections'] = [selection];
    }
  });

  socket.on('start', function(flock){
    io.to(roomLookUp[socket.id]).emit('flock', flock);
    updatesPerRoom[roomLookUp[socket.id]]['flock'] = flock;
  });

  socket.on('snakeDraft change', function(s){
    io.to(roomLookUp[socket.id]).emit('global snakeDraft change', s);
    updatesPerRoom[roomLookUp[socket.id]]['snakeDraft'] = s;
  });
  
  socket.on('baseStatMin change', function(value){
    io.to(roomLookUp[socket.id]).emit('global baseStatMin change', value);
    updatesPerRoom[roomLookUp[socket.id]]['baseStatMin'] = value;
  });

  socket.on('type toggle', function(typeAndValue){
    io.to(roomLookUp[socket.id]).emit('global type toggle', {type: typeAndValue.type, value: typeAndValue.value});
    updatesPerRoom[roomLookUp[socket.id]]['type toggle'] = {type: typeAndValue.type, value: typeAndValue.value};
  });

  socket.on('tier change', function(value){
    io.to(roomLookUp[socket.id]).emit('global tier change', value);
    updatesPerRoom[roomLookUp[socket.id]]['tier change'] = value;
  });

  socket.on('finalFormChange', function(value){
    io.to(roomLookUp[socket.id]).emit('global finalFormChange', value);
    updatesPerRoom[roomLookUp[socket.id]]['finalFormChange'] = value;
  });

   socket.on('megas change', function(value){
    io.to(roomLookUp[socket.id]).emit('global megas change', value);
    updatesPerRoom[roomLookUp[socket.id]]['megas change'] = value;
  });

   socket.on('generation change', function(genAndValue){
    io.to(roomLookUp[socket.id]).emit('global generation change', {gen: genAndValue.gen, value: genAndValue.value});
    if(updatesPerRoom[roomLookUp[socket.id]]['generation change'] != undefined){
      updatesPerRoom[roomLookUp[socket.id]]['generation change'].push({gen: genAndValue.gen, value: genAndValue.value});
    }
    else{
      updatesPerRoom[roomLookUp[socket.id]]['generation change'] = [{gen: genAndValue.gen, value: genAndValue.value}];
    }
  });

   socket.on('join room', function(roomID){
    if(!rooms.includes(roomID.roomID)){
      rooms.push(roomID.roomID);
      roomPlayerDictionary[roomID.roomID] = {};
      updatesPerRoom[roomID.roomID] = {};
    }
    socket.join(roomID.roomID);
    roomLookUp[socket.id] = roomID.roomID;

    if(roomPlayerDictionary[roomID.roomID][socket.id] == undefined){
      if(openNumbersForRooms[roomID.roomID] != undefined && openNumbersForRooms[roomID.roomID].length != 0){
        roomPlayerDictionary[roomID.roomID][socket.id] = openNumbersForRooms[roomID.roomID].shift();
      } 
      else{
        roomPlayerDictionary[roomID.roomID][socket.id] = Object.keys(roomPlayerDictionary[roomID.roomID]).length;
      }
      console.log("socket "+socket.id+" has joined room '"+roomID.roomID+"' as Player "+roomPlayerDictionary[roomID.roomID][socket.id]);
    } else {
      //should never happen, I think? 
      console.log(socket.id+"has RECONNECTED as Player "+roomPlayerDictionary[roomID.roomID][socket.id]);
    }

    io.to(socket.id).emit('roomID', roomLookUp[socket.id]);
    io.to(socket.id).emit('player number', roomPlayerDictionary[roomID.roomID][socket.id]);
    io.to(roomLookUp[socket.id]).emit('teamNumberChange', Object.keys(roomPlayerDictionary[roomID.roomID]).length);  

    io.to(socket.id).emit('update preferences', updatesPerRoom[roomLookUp[socket.id]]);

    var roomsAndNumbers = [];
    for(var j = 0; j < rooms.length; j++){
      roomsAndNumbers.push({name: rooms[j], numberOfPlayers: Object.keys(roomPlayerDictionary[rooms[j]]).length});
    }

    io.emit('exisiting rooms', roomsAndNumbers);
   });

  socket.on('ready status changed', function(readyArr){
    io.to(roomLookUp[socket.id]).emit('global ready status change', readyArr);
    updatesPerRoom[roomLookUp[socket.id]]['ready status'] = readyArr;
  });

  socket.on('disconnect', function(){
    if(roomPlayerDictionary[roomLookUp[socket.id]] != undefined){
      if(roomPlayerDictionary[roomLookUp[socket.id]][socket.id] != undefined){

        console.log('Player '+roomPlayerDictionary[roomLookUp[socket.id]][socket.id]+' has disconnected from room '+ roomLookUp[socket.id]);

        if( openNumbersForRooms[roomLookUp[socket.id]] == undefined){
           openNumbersForRooms[roomLookUp[socket.id]] = [roomPlayerDictionary[roomLookUp[socket.id]][socket.id]];
        } 
        else{
          openNumbersForRooms[roomLookUp[socket.id]].push(roomPlayerDictionary[roomLookUp[socket.id]][socket.id]);
        }

        var rID = roomLookUp[socket.id];
        delete roomPlayerDictionary[roomLookUp[socket.id]][socket.id];
        delete roomLookUp[socket.id];
        io.to(rID).emit('teamNumberChange', Object.keys(roomPlayerDictionary[rID]).length);
        
        if(Object.values(openNumbersForRooms[rID]).includes(0) && Object.keys(roomPlayerDictionary[rID]).length > 0){
          var newLeaderID = "";
          for(player in roomPlayerDictionary[rID]){
            var oldNumber = roomPlayerDictionary[rID][player];
            newLeaderID = player;
            roomPlayerDictionary[rID][player] = 0;
            var index = openNumbersForRooms[rID].indexOf(0);
            openNumbersForRooms[rID].splice(index, 1);
            openNumbersForRooms[rID].push(oldNumber);
            break;
          }

          io.to(player).emit('player number', roomPlayerDictionary[rID][newLeaderID]);
        }

        if(Object.keys(roomPlayerDictionary[rID]).length == 0){
          //delete room
            delete roomPlayerDictionary[rID];
            var index = rooms.indexOf(rID);
            rooms.splice(index, 1);
            delete updatesPerRoom[rID];
        }
      }
    }
  });
});

app.get('/room/:id', function(req, res){
  
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
                if((finalForm == 'true' && pokemonArray[pokemon].evos == undefined) || finalForm == 'false'){
  		  				  if(FitsInGenBounds(pokemonArray[pokemon].num, genBounds)){
                    pokemonArrayCopy.push(pokemonArray[pokemon]);
                  }
                }
              } else {  
              if(TypeCheck(selectedTypes, pokemonArray[pokemon].types)){
                if((finalForm == 'true' && pokemonArray[pokemon].evos == undefined) || finalForm == 'false'){
                  if(FitsInGenBounds(pokemonArray[pokemon].num, genBounds)){
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
                if((finalForm == 'true' && pokemonArray[pokemon].evos == undefined) || finalForm == 'false'){
                  if(FitsInGenBounds(pokemonArray[pokemon].num, genBounds)){
                    pokemonArrayCopy.push(pokemonArray[pokemon]); 
                  }
                }
              }
            }	
  				}
  			}
  			else if(!allTypes){          
          if((finalForm == 'true' && pokemonArray[pokemon].evos == undefined) || finalForm == 'false'){
            if(TypeCheck(selectedTypes, pokemonArray[pokemon].types)){
              pokemonArrayCopy.push(pokemonArray[pokemon]); 
            }
          }
  			}
        else{
          if((finalForm == 'true' && pokemonArray[pokemon].evos == undefined) || finalForm == 'false'){
            if(FitsInGenBounds(pokemonArray[pokemon].num, genBounds)){
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
              if(FitsInGenBounds(pokemonArray[pokemon].num, genBounds)){
                pokemonArrayCopy.push(pokemonArray[pokemon]);  
              }
          } else { 
            if(TypeCheck(selectedTypes, pokemonArray[pokemon].types)){
                if(FitsInGenBounds(pokemonArray[pokemon].num, genBounds)){
                  pokemonArrayCopy.push(pokemonArray[pokemon]); 
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
            if((finalForm == 'true' && pokemonArray[pokemon].evos == undefined) || finalForm == 'false'){
              if(FitsInGenBounds(pokemonArray[pokemon].num, genBounds)){
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
        if((finalForm == 'true' && pokemonArray[pokemon].evos == undefined) || finalForm == 'false'){
          if(FitsInGenBounds(pokemonArray[pokemon].num, genBounds)){
            pokemonArrayCopy.push(pokemonArray[pokemon]); 
          }
        }
      }
    }
  }
  else{
    for(pokemon in pokemonArray){
      if((finalForm == 'true' && pokemonArray[pokemon].evos == undefined) || finalForm == 'false'){
        if(FitsInGenBounds(pokemonArray[pokemon].num, genBounds)){
           pokemonArrayCopy.push(pokemonArray[pokemon]);
        }
      }
    }
  }
  
  for(var j = 0; j < teams*6; j++){
  	var random = Math.random()*(Object.keys(pokemonArrayCopy).length -1 );
  	var currPoke = pokemonArrayCopy[parseInt(random)];
  	  	while(pokemans.indexOf(currPoke) != -1 ){
  		  	random = Math.random()*(Object.keys(pokemonArrayCopy).length);
  		  	currPoke = pokemonArrayCopy[parseInt(random)];
        }
		    pokemans.push(currPoke);
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


