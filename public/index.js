var socket = io();

class App extends React.Component {

componentDidMount() {

    socket.on('broadcast pick', (selection) => {
    	if(this.state.teamResults.length - 1 < selection.team){
    		this.state.teamResults.push([selection.pokemon]);
    	} else {
    		this.state.teamResults[selection.team].push(selection.pokemon);
    	}
    	//make pokemon disappear
    	this.state.showResults[selection.pokemonNum] = false;
    	var results = this.state.showResults;
    	this.setState({showResults: results});

		if(this.state.teams.length < this.state.currentPlayer){
	  		this.state.teams.push([selection.pokemon]);
	  	} else{
	  		this.state.teams[this.state.currentPlayer-1].push(selection.pokemon);
	  	}	    	

    	this.updateRound();
    });

    socket.on('flock', (j) => {
    	var data1 = j;
    	this.setState({data: data1});
    	var showResultsTemp = [];
		for(var i = 0; i < j.length; i++){
			showResultsTemp.push(true);
		}
		this.setState({show: true});
		this.setState({showResults: showResultsTemp});
    });

    socket.on('teamNumberChange', (teams) => {
    	this.setState({numberOfTeams: teams});
    	var arr = [];
    	for(var i = 0; i < teams; i++){
    		arr.push(i);
    	}
    	this.setState({numberOfTeamsArray: arr});
    	this.state.playersReady.push(false);
		this.setState({allReady: false});
    });

    socket.on('player number', (number) => {
    	console.log(number);
    	this.setState({clientNumber: number});
    });

    socket.on('global snakeDraft change', (s) => {
    	this.setState({snakeDraft: s});
    });

    socket.on('global baseStatMin change', (value) =>{
    	this.setState({baseStatMin: value});
    });	

    socket.on('global type toggle', (typeAndValue) =>{
    	switch(typeAndValue.type){
		       case "Bird":
		       		this.setState({Bird: typeAndValue.value})
		       		break;
			   case "Normal":
			   		this.setState({Normal: typeAndValue.value})
			   		break;
			   case "Grass":
			   		this.setState({Grass: typeAndValue.value})
			   		break;
			   case "Poison":
			   		this.setState({Poison: typeAndValue.value})
			   		break;
			   case "Fire":
			   		this.setState({Fire: typeAndValue.value})
			   		break;
			   case "Flying":
			   		this.setState({Flying: typeAndValue.value})
			   		break;
			   case "Water":
			   		this.setState({Water: typeAndValue.value})
			   		break;
			   case "Bug":
			   		this.setState({Bug: typeAndValue.value})
			   		break;
			   case "Electric":
			   		this.setState({Electric: typeAndValue.value})
			   		break;
			   case "Ground":
			   		this.setState({Ground: typeAndValue.value})
			   		break;
			   case "Fairy":
			   		this.setState({Fairy: typeAndValue.value})
			   		break;
			   case "Fighting":
			   		this.setState({Fighting: typeAndValue.value});
			   		break
			   case "Psychic":
			   		this.setState({Psychic: typeAndValue.value})
			   		break;
			   case "Rock":
			   		this.setState({Rock: typeAndValue.value})
			   		break;
			   case "Steel":
			   		this.setState({Steel: typeAndValue.value})
			   		break;
			   case "Ice":
			   		this.setState({Ice: typeAndValue.value})
			   		break;
			   case "Ghost":
			   		this.setState({Ghost: typeAndValue.value})
			   		break;
			   case "Dark":
			   		this.setState({Dark: typeAndValue.value})
			   		break;
			   case "Dragon":
			   		this.setState({Dragon: typeAndValue.value})
			   		break;
			}
    });	

    socket.on('global tier change', (value) =>{
    	this.setState({tier: value});
    });	

    socket.on('global finalFormChange', (value) =>{
    	this.setState({finalFormOnly: value});
    });	

    socket.on('global megas change', (value) =>{
    	this.setState({megasOnly: value});
    });	

    socket.on('global generation change', (genAndValue) =>{
	  	switch(genAndValue.gen){
	  		case "gen1":
	  			this.setState({gen1: genAndValue.value});
	  			break;
			case "gen2":
	  			this.setState({gen2: genAndValue.value});
	  			break;
	  		case "gen3":
	  			this.setState({gen3: genAndValue.value});
	  			break;
	  		case "gen4":
	  			this.setState({gen4: genAndValue.value});
	  			break;
	  		case "gen5":
	  			this.setState({gen5: genAndValue.value});
	  			break;
	  		case "gen6":
	  			this.setState({gen6: genAndValue.value});
	  			break;
	  		case "gen7":
	  			this.setState({gen7: genAndValue.value});
	  			break;
			case "gen8":
				this.setState({gen8: genAndValue.value});
				break;
			case "gen9":
				this.setState({gen9: genAndValue.value});
				break;
	  	}
    });	

    socket.on('roomID', (roomID)=>{
    	console.log(roomID);
    	this.setState({roomID: roomID});
    });

    socket.on('update preferences', (updates) => {
    	console.log(updates);
    	for(var key in updates){
    		switch(key){
    			case 'flock':
			    	this.setState({data: updates['flock']});
			    	var showResultsTemp = [];
					for(var i = 0; i < updates['flock'].length; i++){
						showResultsTemp.push(true);
					}
					this.setState({show: true});
					this.setState({showResults: showResultsTemp});
    				break;
    			case 'snakeDraft':
    				this.setState({snakeDraft: updates[key]});
    				break;
    			case 'baseStatMin':
    				this.setState({baseStatMin: updates[key]});
    				break;
    			case 'type toggle':
    				switch(updates[key].type){
				       case "Bird":
				       		this.setState({Bird: updates[key].value})
				       		break;
					   case "Normal":
					   		this.setState({Normal: updates[key].value})
					   		break;
					   case "Grass":
					   		this.setState({Grass: updates[key].value})
					   		break;
					   case "Poison":
					   		this.setState({Poison: updates[key].value})
					   		break;
					   case "Fire":
					   		this.setState({Fire: updates[key].value})
					   		break;
					   case "Flying":
					   		this.setState({Flying: updates[key].value})
					   		break;
					   case "Water":
					   		this.setState({Water: updates[key].value})
					   		break;
					   case "Bug":
					   		this.setState({Bug: updates[key].value})
					   		break;
					   case "Electric":
					   		this.setState({Electric: updates[key].value})
					   		break;
					   case "Ground":
					   		this.setState({Ground: updates[key].value})
					   		break;
					   case "Fairy":
					   		this.setState({Fairy: updates[key].value})
					   		break;
					   case "Fighting":
					   		this.setState({Fighting: updates[key].value});
					   		break
					   case "Psychic":
					   		this.setState({Psychic: updates[key].value})
					   		break;
					   case "Rock":
					   		this.setState({Rock: updates[key].value})
					   		break;
					   case "Steel":
					   		this.setState({Steel: updates[key].value})
					   		break;
					   case "Ice":
					   		this.setState({Ice: updates[key].value})
					   		break;
					   case "Ghost":
					   		this.setState({Ghost: updates[key].value})
					   		break;
					   case "Dark":
					   		this.setState({Dark: updates[key].value})
					   		break;
					   case "Dragon":
					   		this.setState({Dragon: updates[key].value})
					   		break;
					}
    				break;
    			case 'tier change':
    				this.setState({tier: updates[key]});
    				break;
    			case 'finalFormChange':
    				this.setState({finalFormOnly: updates[key]});
    				break;
    			case 'megas change':
    				this.setState({megasOnly: updates[key]});
    				break;
    			case 'generation change':
    				for(var genUpdate in updates[key]){
	    				switch(updates[key][genUpdate].gen){
					  		case "gen1":
					  			this.setState({gen1: updates[key][genUpdate].value});
					  			break;
							case "gen2":
					  			this.setState({gen2: updates[key][genUpdate].value});
					  			break;
					  		case "gen3":
					  			this.setState({gen3: updates[key][genUpdate].value});
					  			break;
					  		case "gen4":
					  			this.setState({gen4: updates[key][genUpdate].value});
					  			break;
					  		case "gen5":
					  			this.setState({gen5: updates[key][genUpdate].value});
					  			break;
					  		case "gen6":
					  			this.setState({gen6: updates[key][genUpdate].value});
					  			break;
					  		case "gen7":
					  			this.setState({gen7: updates[key][genUpdate].value});
					  			break;	
							case "gen8":
								this.setState({gen8: updates[key][genUpdate].value});
								break;	
							case "gen9":
								this.setState({gen9: updates[key][genUpdate].value});
								break;	
					  	}
					}
    				break;
    			case 'selections':
    				for(var selectionKey in updates[key]){
    					var selection = updates[key][selectionKey];
    					if(this.state.teamResults.length - 1 < selection.team){
				    		this.state.teamResults.push([selection.pokemon]);
				    	} else {
				    		this.state.teamResults[selection.team].push(selection.pokemon);
				    	}
				    	//make pokemon disappear
				    	this.state.showResults[selection.pokemonNum] = false;
				    	var results = this.state.showResults;
				    	this.setState({showResults: results});

						if(this.state.teams.length < this.state.currentPlayer){
					  		this.state.teams.push([selection.pokemon]);
					  	} else{
					  		this.state.teams[this.state.currentPlayer-1].push(selection.pokemon);
					  	}	    	

				    	this.updateRound();
    				}
    				break;
    			case 'ready status':
    				this.setState({playersReady: updates[key]});
					var tempAllReady = true;
					for(var player in readyArr){
						if(!readyArr[player]){
							tempAllReady = false;
							break;
						}
					}
					this.setState({allReady: tempAllReady});
    				break;	
    		}
    	}
    });

	socket.on('global ready status change', (readyArr) => {
		this.setState({playersReady: readyArr});
		var tempAllReady = true;
		for(var player in readyArr){
			if(!readyArr[player]){
				tempAllReady = false;
				break;
			}
		}
		console.log(readyArr);
		this.setState({allReady: tempAllReady});
	});

	socket.on('exisiting rooms', (roomsAndNumbers) => {
		this.setState({activeRooms: roomsAndNumbers});
	});
}

  constructor(props) {
    super(props);   
    this.state = {gender: 'Hello!', data: [], numberOfTeams: 2, 
    			  images:[], show: false, currentPlayer: 1, nextPlayer: 2, lastPlayer: 0,
    			  teams: [], showResults: [], displayTeam: [], round: 1, ready: false,
    		      tier: "Tiers", finalFormOnly: false, 
    		      gen1: true, 
    		      gen2:true, 
    		      gen3: true, 
    		      gen4:true, 
    		      gen5:true, 
    		      gen6:true,
    		      gen7:true,
				  gen8:true,
				  gen9:true,
    		      baseStatMin: 0, megasOnly: false, showTypes: false,
    		  	  Bird: true,
			   	  Normal: true,
			   	  Grass: true,
			   	  Poison: true,
			   	  Fire: true,
			   	  Flying: true,
			   	  Water: true,
			   	  Bug: true,
			   	  Electric: true,
			   	  Ground: true,
			   	  Fairy: true,
			   	  Fighting: true,
			   	  Psychic: true,
			   	  Rock: true,
			   	  Steel: true,
			   	  Ice: true,
			   	  Ghost: true,
			   	  Dark: true,
			   	  Dragon: true, 
			   	  draftOver: false,
			   	  snakeDraft: true,
			   	  linearDraft: false,
			   	  turnOfEdgePlayer: 0, 
			   	  directionOfSnakeDraft: 1, 
			   	  teamResults: [],
			   	  clientNumber: -1,
			   	  roomCreated: false,
			   	  proposedRoomID: "",
			   	  roomID: "",
			   	  numberOfTeamsArray: [0],
			   	  playersReady: [],
			   	  allReady: false,
			   	  activeRooms: []}; 
    this.handleChange = this.handleChange.bind(this);
    this.getResults = this.getResults.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.selectPokemon = this.selectPokemon.bind(this);
    this.tierChange = this.tierChange.bind(this);
    this.finalFormChange = this.finalFormChange.bind(this);
    this.generationChange = this.generationChange.bind(this);
    this.handleBaseStatChange = this.handleBaseStatChange.bind(this);
    this.megasChange = this.megasChange.bind(this);
    this.toggleTypes = this.toggleTypes.bind(this);
    this.toggleIndType = this.toggleIndType.bind(this);
    this.unselectAll = this.unselectAll.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.restart = this.restart.bind(this);
    this.draftChange = this.draftChange.bind(this);
    this.onUpdateLabel = this.onUpdateLabel.bind(this);
    this.updateRound = this.updateRound.bind(this);
    this.changeRoomID = this.changeRoomID.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.changePlayerReadyStatus = this.changePlayerReadyStatus.bind(this);
    this.joinSpecificRoom = this.joinSpecificRoom.bind(this);
  }

  changePlayerReadyStatus(){
  	var tempPlayersReady = this.state.playersReady;
  	tempPlayersReady[this.state.clientNumber] = !this.state.playersReady[this.state.clientNumber];
  	this.setState({playersReady: tempPlayersReady});
  	socket.emit('ready status changed', tempPlayersReady);
  }

  joinSpecificRoom(room){
  	this.setState({roomCreated: true});
  	socket.emit('join room', {roomID: room});
  }

  joinRoom(){
  	this.setState({roomCreated: true});
  	socket.emit('join room', {roomID: this.state.proposedRoomID});
  }

  changeRoomID(event){
  	this.setState({proposedRoomID: event.target.value});
  }

  onUpdateLabel(data){
	this.setState({serverValue: data});
  }

  draftChange(event){
  	var s = !this.state.snakeDraft;
  	this.setState({snakeDraft: s, linearDraft: !s});
  	socket.emit('snakeDraft change', s);
  }

  unselectAll(event) {
  	  this.setState({Bird: false});
	  this.setState({Normal: false});
	  this.setState({Grass: false});
	  this.setState({Poison: false});
	  this.setState({Fire: false});
	  this.setState({Flying: false});
	  this.setState({Water: false});
	  this.setState({Bug: false});
	  this.setState({Electric: false});
	  this.setState({Ground: false});
	  this.setState({Fairy: false});
	  this.setState({Fighting: false});
	  this.setState({Psychic: false});
	  this.setState({Rock: false});
	  this.setState({Steel: false});
	  this.setState({Ice: false});
	  this.setState({Ghost: false});
	  this.setState({Dark: false});
	  this.setState({Dragon:false});
  }

  selectAll(event) {
  	  this.setState({Bird: true});
	  this.setState({Normal: true});
	  this.setState({Grass: true});
	  this.setState({Poison: true});
	  this.setState({Fire: true});
	  this.setState({Flying: true});
	  this.setState({Water: true});
	  this.setState({Bug: true});
	  this.setState({Electric: true});
	  this.setState({Ground: true});
	  this.setState({Fairy: true});
	  this.setState({Fighting: true});
	  this.setState({Psychic: true});
	  this.setState({Rock: true});
	  this.setState({Steel: true});
	  this.setState({Ice: true});
	  this.setState({Ghost: true});
	  this.setState({Dark: true});
	  this.setState({Dragon:true});
  }

  restart(event){
  	var tea = [];
  	for(var i = 0; i < this.state.numberOfTeams; i++){
  		tea.push([]);
  	}
  	this.setState({teams: tea});
  	this.getResults();
  }

  handleChange(event) {
    this.setState({gender: event.target.value});
  }

  handleTeamChange(event) {
    this.setState({numberOfTeams: event.target.value});
  }

  handleBaseStatChange(event) {
  	this.setState({baseStatMin: event.target.value});
  	socket.emit('baseStatMin change', event.target.value);
  }

  toggleTypes(){
  	var s = !this.state.showTypes;
  	this.setState({showTypes: s});
  }

  toggleIndType(event) {
  	var s = "";
  	switch(event.type){
		       case "Bird":
		       		s = !this.state.Bird;
		       		this.setState({Bird: s})
		       		break;
			   case "Normal":
			   		s = !this.state.Normal;
			   		this.setState({Normal: s})
			   		break;
			   case "Grass":
			   		s = !this.state.Grass;
			   		this.setState({Grass: s})
			   		break;
			   case "Poison":
			   		s = !this.state.Poison;
			   		this.setState({Poison: s})
			   		break;
			   case "Fire":
			   		s = !this.state.Fire;
			   		this.setState({Fire: s})
			   		break;
			   case "Flying":
			   		s = !this.state.Flying;
			   		this.setState({Flying: s})
			   		break;
			   case "Water":
			   		s = !this.state.Water;
			   		this.setState({Water: s})
			   		break;
			   case "Bug":
			   		s = !this.state.Bug;
			   		this.setState({Bug: s})
			   		break;
			   case "Electric":
			   		s = !this.state.Electric;
			   		this.setState({Electric: s})
			   		break;
			   case "Ground":
			   		s = !this.state.Ground;
			   		this.setState({Ground: s})
			   		break;
			   case "Fairy":
			   		s = !this.state.Fairy;
			   		this.setState({Fairy: s})
			   		break;
			   case "Fighting":
			   		s = !this.state.Fighting;
			   		this.setState({Fighting: s});
			   		break
			   case "Psychic":
			   		s = !this.state.Psychic;
			   		this.setState({Psychic: s})
			   		break;
			   case "Rock":
			   		s = !this.state.Rock;
			   		this.setState({Rock: s})
			   		break;
			   case "Steel":
			   		s = !this.state.Steel;
			   		this.setState({Steel: s})
			   		break;
			   case "Ice":
			   		s = !this.state.Ice;
			   		this.setState({Ice: s})
			   		break;
			   case "Ghost":
			   		s = !this.state.Ghost;
			   		this.setState({Ghost: s})
			   		break;
			   case "Dark":
			   		s = !this.state.Dark;
			   		this.setState({Dark: s})
			   		break;
			   case "Dragon":
			   		s = !this.state.Dragon;
			   		this.setState({Dragon: s})
			   		break;

  	}
  	socket.emit('type toggle', {type: event.type, value: s});
  }

  selectPokemon(event) {
  	var name = event.name;
  	var number = event.key;
  	socket.emit('selection made', {team: this.state.currentPlayer-1, 
  								   pokemon: event.name,
  								   pokemonNum: event.key});
}

  updateRound(){
  	if(this.state.linearDraft){
		{this.state.lastPlayer = this.state.currentPlayer}
		this.setState({lastPlayer: this.state.lastPlayer});
		{this.state.currentPlayer += 1}  
		this.setState({currentPlayer: this.state.currentPlayer});
		if(this.state.currentPlayer > this.state.numberOfTeams){
			{this.state.currentPlayer = 1}
			this.setState({currentPlayer: 1});
			{this.state.round += 1}
			this.setState({round: this.state.round});
		}
		{this.state.nextPlayer = this.state.currentPlayer === this.state.numberOfTeams ? 1 : this.state.currentPlayer+1}
		// this.setState({currentPlayer: this.state.currentPlayer});
		this.setState({nextPlayer: this.state.nextPlayer})
	} else{
		//is snake draft
		{this.state.lastPlayer = this.state.currentPlayer}
		this.setState({lastPlayer: this.state.lastPlayer});
		if(this.state.currentPlayer == this.state.numberOfTeams || (this.state.currentPlayer == 1 && this.state.round > 1)) {
			if(this.state.turnOfEdgePlayer > 0){
				var reverse = -(this.state.directionOfSnakeDraft);
				var nextPlayer = this.state.currentPlayer + reverse;
				var nextNextPlayer = this.state.numberOfTeams > 2 ? this.state.currentPlayer + (2*reverse) : this.state.currentPlayer + reverse;
				this.setState({turnOfEdgePlayer: 0, directionOfSnakeDraft: reverse, currentPlayer: nextPlayer, nextPlayer: nextNextPlayer});
			} else{
				this.setState({turnOfEdgePlayer: 1}); 
				var nextPlayer = this.state.currentPlayer + -(this.state.directionOfSnakeDraft);
				this.setState({nextPlayer: nextPlayer});
				{this.state.round += 1}
				this.setState({round: this.state.round});
			}
		} else{
			var nextPlayer = this.state.currentPlayer + this.state.directionOfSnakeDraft;
			this.setState({currentPlayer: nextPlayer});
			if(nextPlayer == this.state.numberOfTeams || nextPlayer == 1 ){

			} else{
				nextPlayer += this.state.directionOfSnakeDraft;
				this.setState({nextPlayer: nextPlayer});
			}
		}
	}

	this.setState({ready: true});
  	var moreThanOnePokemonLeft = false;
  	for(var i = 0; i < this.state.showResults.length; i++){
  		if(this.state.showResults[i] == true){
  			moreThanOnePokemonLeft = true;
  			break;
  		}
  	}
  	if(moreThanOnePokemonLeft == false){
  		this.setState({draftOver: true});
  		this.setState({show: false});
  	}
  }

  tierChange(event) {
  	this.setState({tier: event});
  	socket.emit('tier change', event);
  }

  finalFormChange(event) {
  	var s = !this.state.finalFormOnly;
  	this.setState({finalFormOnly: s});
  	socket.emit('finalFormChange', s);
  }

  megasChange(event){
  	var s = !this.state.megasOnly;
  	this.setState({megasOnly: s});
  	socket.emit('megas change', s);
  }

  generationChange(event){
  	var s = "";
  	switch(event.gen){
  		case "gen1":
  			s = !this.state.gen1;
  			this.setState({gen1: s});
  			break;
		case "gen2":
  			s = !this.state.gen2;
  			this.setState({gen2: s});
  			break;
  		case "gen3":
  			s = !this.state.gen3;
  			this.setState({gen3: s});
  			break;
  		case "gen4":
  			s = !this.state.gen4;
  			this.setState({gen4: s});
  			break;
  		case "gen5":
  			s = !this.state.gen5;
  			this.setState({gen5: s});
  			break;
  		case "gen6":
  			s = !this.state.gen6;
  			this.setState({gen6: s});
  			break;
  		case "gen7":
  			s = !this.state.gen7;
  			this.setState({gen7: s});
  			break;		
		case "gen8":
			s = !this.state.gen8;
			this.setState({gen8: s});
			break;	
		case "gen9":
			s = !this.state.gen8;
			this.setState({gen9: s});
			break;	
  	}
  	socket.emit('generation change', {gen: event.gen, value: s});
  }

  getResults() {
  	var genArray = [this.state.gen1,
  					this.state.gen2,
  					this.state.gen3,
  					this.state.gen4,
  					this.state.gen5,
  					this.state.gen6,
					this.state.gen7,
					this.state.gen8,
					this.state.gen9];
  	// genArray.push(this.state.gen7);
  	var genStr = "";
  	for(var i = 0; i < genArray.length; i++){
  		if(genArray[i] == true){
  			genStr += "t";
  		} else{
  			genStr += "f";
  		}
  	}

  	var typeArray = [this.state.Bird,
				     this.state.Normal,
				     this.state.Grass,
				     this.state.Poison,
				     this.state.Fire,
				     this.state.Flying,
				     this.state.Water,
				     this.state.Bug,
				     this.state.Electric,
				     this.state.Ground,
				     this.state.Fairy,
				     this.state.Fighting,
				     this.state.Psychic,
				     this.state.Rock,
				     this.state.Steel,
				     this.state.Ice,
				     this.state.Ghost,
				     this.state.Dark,
				     this.state.Dragon];

    var typeStr = "";
	for(var i = 0; i < typeArray.length; i++){		     
		if(typeArray[i] == true){
  			typeStr += "1";
  		} else{
  			typeStr += "0";
  		}
	}
  	var url = '/p/'+this.state.numberOfTeams
  			   +'/'+this.state.tier
  			   +'/'+this.state.finalFormOnly
  			   +'/'+genStr
  			   +'/'+this.state.baseStatMin
  			   +'/'+this.state.megasOnly
  			   +'/'+typeStr;
    var request = new Request(url, {
		method: 'GET'
	});
	 fetch(request).then(function(response){
	 		// Convert to JSON
		return response.json();
	}).then(function(j) {
		var showResultsTemp = [];
		for(var i = 0; i < j.length; i++){
			showResultsTemp.push(true);
		}
		
		this.setState({data: j});
		socket.emit('start', j);
		this.setState({show: true});
		this.setState({showResults: showResultsTemp});
    }.bind(this))
    .catch(function(err){
    	console.log(err);
    });
  }

  searchParameterChange(event){
  	console.log("Button Pressed: ", event);
  }

  render() {
    return ( 
    	<div className='jumbotron'>
  			<h1 className='text-center'>draftDay</h1>

    	  {this.state.roomCreated ?
    	  		<div>
		    	  <h2 className="text-center">
		    	  	Room "{this.state.roomID}"
		    	  </h2>
			      <div className="text-center">

				      <h3>
						Number of Players Connected:	 
					  </h3> 
					  <h4>
					  {this.state.numberOfTeams}
					  </h4>
					  
					  {this.state.clientNumber == 0 ?
					  	<div>
					      <div onClick={this.draftChange}>
					      	<DraftTypeInput name1="Snake Draft" name2="Linear Draft" value={this.state.snakeDraft}/>
					      </div>	
						
						  <br></br>


					      <div onClick={this.finalFormChange}>
					      	<Input name="Final Forms Only" value={this.state.finalFormOnly}/>
					      </div>

					      <div onClick={this.megasChange}>
					      	<Input name="Megas Only" value={this.state.megasOnly}/>
					      </div>	

					      <br></br>

					      <div>
						    <ButtonToolbar>
						      <Button className="textCenter" bsSize="large" onClick={this.toggleTypes}>
						      	Filter by Types 
						      	&nbsp;
						      	<small>{ this.state.showTypes ? <span className="glyphicon glyphicon-menu-up text-right" aria-hidden="true"></span>
						      	: <span className="glyphicon glyphicon-menu-down text-right" aria-hidden="true"></span>}</small>
						      </Button>
						    </ButtonToolbar>
					      </div>

					      { this.state.showTypes ? 
							      	<ButtonToolbar className="text-center">
							      	<ButtonGroup bsSize="large" >
							      		<Button onClick={this.unselectAll}>
							      			Unselect All
							      		</Button>
								         <Button onClick={(event)=>this.toggleIndType({type: "Bird", event})} 
								         		 className={(this.state.Bird ? "Bird" : "unselectedButton")}> Bird
								         </Button>
							    		 <Button onClick={(event)=>this.toggleIndType({type: "Normal", event})} 
							    		 		 className={(this.state.Normal ? "Normal" : "unselectedButton")}> Normal
							    		 </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Grass", event})} 
									     		 className={(this.state.Grass ? "Grass" : "unselectedButton")}> Grass
									     </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Poison", event})} 
									     		 className={(this.state.Poison ? "Poison" : "unselectedButton")}> Poison
									     </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Fire", event})} 
									     		 className={(this.state.Fire ? "Fire" : "unselectedButton")}> Fire
									     </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Flying", event})} 
									     		 className={(this.state.Flying ? "Flying" : "unselectedButton")}> Flying
									     </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Water", event})} 
									     		 className={(this.state.Water ? "Water" : "unselectedButton")}> Water
									     </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Bug", event})} 
									     		 className={(this.state.Bug ? "Bug" : "unselectedButton")}> Bug
									     </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Electric", event})} 
									     		 className={(this.state.Electric ? "Electric" : "unselectedButton")}> Electric
									     </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Ground", event})} 
									     		 className={(this.state.Ground ? "Ground" : "unselectedButton")}> Ground
									     </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Fairy", event})} 
									     		 className={(this.state.Fairy ? "Fairy" : "unselectedButton")}> Fairy
									     </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Fighting", event})} 
									     		 className={(this.state.Fighting ? "Fighting" : "unselectedButton")}> Fighting
									     </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Psychic", event})} 
									     		 className={(this.state.Psychic ? "Psychic" : "unselectedButton")}> Psychic
									     </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Rock", event})} 
									     		 className={(this.state.Rock ? "Rock" : "unselectedButton")}> Rock
									     </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Steel", event})} 
									     		 className={(this.state.Steel ? "Steel" : "unselectedButton")}> Steel
									     </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Ice", event})}
									     		  className={(this.state.Ice ? "Ice" : "unselectedButton")}> Ice
									     	</Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Ghost", event})} 
									     		 className={(this.state.Ghost ? "Ghost" : "unselectedButton")}> Ghost
									     </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Dark", event})} 
									     		 className={(this.state.Dark ? "Dark" : "unselectedButton")}> Dark
									     </Button>
									     <Button onClick={(event)=>this.toggleIndType({type: "Dragon", event})} 
									     		 className={(this.state.Dragon ? "Dragon" : "unselectedButton")}> Dragon
									     </Button>
									     <Button onClick={this.selectAll}>
							      			Select All
							      		</Button>
									    </ButtonGroup>
									</ButtonToolbar>
							: null}	

							<br></br>
						    <DropdownButton bsSize="large" title={this.state.tier} id="dropdown-size-large"  onSelect={this.tierChange}>
						        <MenuItem eventKey="OU">OU</MenuItem>
						        <MenuItem eventKey="UU">UU</MenuItem>
						        <MenuItem eventKey="RU">RU</MenuItem>
						        <MenuItem eventKey="NU">NU</MenuItem>
						        <MenuItem eventKey="PU">PU</MenuItem>
						        <MenuItem eventKey="LC">LC</MenuItem>
						        <MenuItem eventKey="Uber">Uber</MenuItem>
						        <MenuItem divider/>
						        <MenuItem eventKey="Tiers">None</MenuItem>
					        </DropdownButton>


					      <div>
					      	<h3>Select Generation(s): </h3>
					      	<span className="gen" onClick={(event)=>this.generationChange({gen: "gen1"}, event)}>	
					      		<GenInput name="Gen 1" value="gen1"/>
					      	</span>
					      	<span className="gen" onClick={(event)=>this.generationChange({gen: "gen2"}, event)}>	
					      		<GenInput name="Gen 2" value="gen2"/>
					      	</span>
					      	<span className="gen" onClick={(event)=>this.generationChange({gen: "gen3"}, event)}>	
					      		<GenInput name="Gen 3" value="gen3"/>
					      	</span>
					      	<span className="gen" onClick={(event)=>this.generationChange({gen: "gen4"}, event)}>	
					      		<GenInput name="Gen 4" value="gen4"/>
					      	</span>
					      	<span className="gen" onClick={(event)=>this.generationChange({gen: "gen5"}, event)}>	
					      		<GenInput name="Gen 5" value="gen5"/>
					      	</span>
					      	<span className="gen" onClick={(event)=>this.generationChange({gen: "gen6"}, event)}>	
					      		<GenInput name="Gen 6" value="gen6"/>
					      	</span>
							<span className="gen" onClick={(event)=>this.generationChange({gen: "gen7"}, event)}>	
					      		<GenInput name="Gen 7" value="gen7"/>
					      	</span>
							<span className="gen" onClick={(event)=>this.generationChange({gen: "gen8"}, event)}>	
					      		<GenInput name="Gen 8" value="gen8"/>
					      	</span>
							<span className="gen" onClick={(event)=>this.generationChange({gen: "gen9"}, event)}>	
					      		<GenInput name="Gen 9" value="gen9"/>
					      	</span>
					      </div>

					      <div onChange={this.handleBaseStatChange}>
					      	<TextInput text="Minimum Cumulative Base Stats: " type="number"/>
					      </div>

					      
					      <br></br>

					      {!this.state.draftOver && !this.state.show ?
					      	this.state.allReady?
					      		<Button bsStyle="primary" onClick={this.getResults}>GO</Button>
					      		:
					      		<Button bsStyle="primary" onClick={this.getResults} disabled>GO</Button>
					      	
					      : null}

					      {this.state.show || this.state.draftOver? 
					      	<div>
						      	<Button bsStyle="primary" onClick={this.getResults}>ReRoll Pokemon</Button>
						      	&nbsp;&nbsp;&nbsp;&nbsp;
						      	<Button bsStyle="primary" onClick={this.restart}>Start Over</Button>
						    </div>
					      : null}

					    </div>

					:null}

					{this.state.clientNumber != 0 ?
						<div>
					      	<h2>Draft Options:</h2>
					      	<div> This draft is a <b>{this.state.snakeDraft ? "Snake Draft": "Linear Draft"}</b></div>

					    		   <div> Base Stats Min: 	<b>{String( this.state.baseStatMin ) }				</b></div>
					    		   <div> Megas Only: 	<b>{String( this.state.megasOnly ) }				</b></div>
					    		   <div> Final Forms Only: <b>{String( this.state.finalFormOnly ) }				</b></div>
					    		   <div> Tier: 			<b>{this.state.tier == "Tiers" ? "No tier selected" : String( this.state.tier ) }				</b></div>
			       				   
					    		   	{	this.state.Bird 			&&
										this.state.Normal 			&&
										this.state.Grass 			&&
										this.state.Poison 			&&
										this.state.Fire 			&&
										this.state.Flying 			&&
										this.state.Water 			&&
										this.state.Bug				&&
										this.state.Electric			&&
										this.state.Ground 			&&
										this.state.Fairy 			&&
										this.state.Fighting			&&
										this.state.Psychic 			&&
										this.state.Rock 			&&
										this.state.Steel 			&&
										this.state.Ice 				&&
										this.state.Ghost 			&&
										this.state.Dark 			&&
										this.state.Dragon 			
										? 
										<div>
											<b>All types selected</b>
										</div>

										: 
										<div>
										   <div> Bird: 			{ !this.state.Bird 		? <b>{String(this.state.Bird 	)}	</b> : String(this.state.Bird 			)}			</div>
								   	       <div> Normal: 		{ !this.state.Normal 	? <b>{String(this.state.Normal 	)}	</b> : String(this.state.Normal 	)	}				</div>
								   	       <div> Grass: 		{ !this.state.Grass 	? <b>{String(this.state.Grass 	) }  </b> : String(this.state.Grass 		)}				</div>
								   	       <div> Poison: 		{ !this.state.Poison 	? <b>{String(this.state.Poison 	)}	</b> : String(this.state.Poison 	)	}				</div>
								   	       <div> Fire: 			{ !this.state.Fire 		? <b>{String(this.state.Fire 	)}	</b> : String(this.state.Fire 			)}			</div>
								   	       <div> Flying: 		{ !this.state.Flying 	? <b>{String(this.state.Flying 	)}	</b> : String(this.state.Flying 	)	}				</div>
								   	       <div> Water: 		{ !this.state.Water 	? <b>{String(this.state.Water 	) }  </b> : String(this.state.Water 		)}				</div>
								   	       <div> Bug:			{ !this.state.Bug 		? <b>{String(this.state.Bug 		) }  </b> : String(this.state.Bug 			)}			</div>
								   	       <div> Electric: 		{ !this.state.Electric 	? <b>{String(this.state.Electric )}	</b> : String(this.state.Electric) 		}			</div>
								   	       <div> Ground: 		{ !this.state.Ground 	? <b>{String(this.state.Ground 	)}	</b> : String(this.state.Ground 	)	}				</div>
								   	       <div> Fairy: 		{ !this.state.Fairy 	? <b>{String(this.state.Fairy 	) }  </b> : String(this.state.Fairy 		)}				</div>
								   	       <div> Fighting: 		{ !this.state.Fighting 	? <b>{String(this.state.Fighting) }		</b> : String(this.state.Fighting) 		}			</div>
								   	       <div> Psychic: 		{ !this.state.Psychic 	? <b>{String(this.state.Psychic )}		</b> : String(this.state.Psychic )		}			</div>
								   	       <div> Rock: 			{ !this.state.Rock 		? <b>{String(this.state.Rock 	)	}</b> : String(this.state.Rock 			)}			</div>
								   	       <div> Steel: 		{ !this.state.Steel 	? <b>{String(this.state.Steel 		)}</b> : String(this.state.Steel 		)}				</div>
								   	       <div> Ice: 			{ !this.state.Ice 		? <b>{String(this.state.Ice 		)}</b> : String(this.state.Ice 			)}			</div>
								   	       <div> Ghost: 		{ !this.state.Ghost 	? <b>{String(this.state.Ghost 		)}</b> : String(this.state.Ghost 		)}				</div>
								   	       <div> Dark: 			{ !this.state.Dark 		? <b>{String(this.state.Dark 		)}</b> : String(this.state.Dark 			)}			</div>
								   	       <div> Dragon: 		{ !this.state.Dragon 	? <b>{String(this.state.Dragon 	)	}</b> : String(this.state.Dragon 	)	}				</div>
					    		        </div>

					    		    }
					    		    {this.state.gen1 &&
									this.state.gen2 &&
									this.state.gen3 &&
									this.state.gen4 &&
									this.state.gen5 &&
									this.state.gen6 &&
									this.state.gen7 
									? 
									<div>
										<b>All generations selected</b>
									</div>
									:
					    		    	<div>
						    		    	   <div> gen1: 			{!this.state.gen1 ? <b>{String( this.state.gen1 ) }</b> : String( this.state.gen1 ) }				</div>
						    		           <div> gen2: 			{!this.state.gen2 ? <b>{String( this.state.gen2 ) }</b> : String( this.state.gen2 ) }				</div>
						    		           <div> gen3: 			{!this.state.gen3 ? <b>{String( this.state.gen3 ) }</b> : String( this.state.gen3 ) }				</div>
						    		           <div> gen4: 			{!this.state.gen4 ? <b>{String( this.state.gen4 ) }</b> : String( this.state.gen4 ) }				</div>
						    		           <div> gen5: 			{!this.state.gen5 ? <b>{String( this.state.gen5 ) }</b> : String( this.state.gen5 ) }				</div>
						    		           <div> gen6: 			{!this.state.gen6 ? <b>{String( this.state.gen6 ) }</b> : String( this.state.gen6 ) }				</div>
						    		           <div> gen7: 			{!this.state.gen7 ? <b>{String( this.state.gen7 ) }</b> : String( this.state.gen7 ) }				</div>
						    		    </div>       

						    		}
						
						</div>

					: null}
					<br></br>
					
						{this.state.numberOfTeamsArray.map((a, key) => {
							return(
								<div>
								{this.state.clientNumber == key ?
									<span onClick={this.changePlayerReadyStatus}>
										<ReadyButton key={key} player={key+1} clientNumber={this.state.clientNumber}/>
									</span>

									:

									<span>
										Player {key+1}: &nbsp;
										{this.state.playersReady[key] ?
											<span className="text-success">
												<b>Ready!</b>
											</span>
											:
											<span className="text-danger">
												<b>Not Ready</b>
											</span>
										}
									</span>
								}
								</div>
							);
						})}	
						
						<br></br>
						<div>
							<b>The draft host cannot start the draft until everyone has readied up.</b>
						</div>

				
				      {!this.state.show && 
					      <Navbar inverse className="navbar-dark text-primary text-center navbar-fixed-top">
					     	 <b>YOU ARE PLAYER {this.state.clientNumber+1}</b>
					     	 {this.state.clientNumber == 0 &&
					     	 	<div className="text-danger"><b>YOU ARE THE HOST <br></br>
					     	 	YOU ARE RESPONSIBLE FOR SELECTING THE PREFERENCES AND STARTING THE DRAFT</b></div>
							 }
					      </Navbar>
				  	  }

				      { this.state.show ? 
							<Navbar inverse className="navbar-dark navbar-fixed-bottom">
								<ul className="nav nav-pills nav-justified">
									<li className="col-md-4 left-col-bottom-nav"> 
									{ this.state.ready ? 
											<span>
											<br></br>
											<div className="text-left headerSideText text-muted"><b>Previous Pick:</b></div>
											<div className="text-left headerSideText text-danger"><b>Player {this.state.lastPlayer}</b></div>
											<div className="text-left headerSideText text-success"><b>
												{this.state.teams[this.state.lastPlayer-1][this.state.lastPlayer == this.state.currentPlayer ? this.state.round - 2 : this.state.round-1]}
												</b></div> 						</span>
									: null}
									</li>
									
									<li className="text-primary col-md-4 middleText" >
										{this.state.currentPlayer == this.state.clientNumber+1 ? <h3 className="text-danger kop"><b>IT IS YOUR TURN</b></h3> : <h3 className="kop"></h3>}
										<div className="text-center headerMiddleText"><b>Player {this.state.currentPlayer}</b></div> 
										<div className="text-center headerMiddleText"><b>PICK YOUR POKEMON</b></div>
										<hr></hr>
										<div className="text-center headerMiddleText roundText"><b>ROUND {this.state.round}</b></div>
									</li>
									
									<li className="col-md-4 right-col-bottom-nav">
									{ this.state.ready ? 
										<span>
										<br></br>
										<div className="text-right headerSideText text-danger"><b>Player {this.state.nextPlayer}</b></div>
										<div className="text-right headerSideText text-muted"><b>Is Up Next</b></div>
										{this.state.round > 1 ? <div className="text-right headerSideText text-success"><b>Last Picked: {this.state.teams[this.state.nextPlayer-1][this.state.round - 2]}
																												</b></div>
											:null}
										</span>
										:null}
									</li>
							</ul>
							</Navbar> 
						: null }

				      	<ul>
							{this.state.teams.map((team, key) => {
								return(
									<li className="teamPokemon">
										<h3>Team {key+1}</h3>
										{team.map((pokemon, key1) => {
												return (
													<span key={key1}>  
														<div>{pokemon}</div>
														{!this.state.show ? <br></br> : null}
													</span>
												);
											})}
									</li>	
								);
							})}		      					
						</ul>	
			      </div>
			     { this.state.show ? 
			     	<div id="pokemon">
			      		<ul>
					      {this.state.data.map((name, key) => {
				            return (  	
				            		<li>
				            			{this.state.showResults[key] && 
				            				<div className="pokemonContainer">
					            				<Pokemon name={name.name} image={name.image}></Pokemon>
					            				<div className="nameAndButton">
													<div className="pokemonName">
														{name.name}
													</div>
					            					{this.state.currentPlayer == this.state.clientNumber + 1 ?
						            					<Button 
						            						bsStyle="primary" 
						            						onClick={(event)=>this.selectPokemon({name: name.name, key: key}, event)}>
						            							Draft {name.name}
						            					</Button>  
					            					: 
						            					<Button 
						            						bsStyle="primary" 
						            						onClick={(event)=>this.selectPokemon({name: name.name, key: key}, event)} disabled>
						            							Draft {name.name}
						            					</Button> 
					            					}
					            				</div>
					            			</div>}
					            	</li>
				            );
				          })}
				        </ul>  
			      	</div>
			    	: null}
				    {this.state.show ?
				    	<div>
					      <br></br>
					      <br></br>
					      <br></br>
					      <br></br>
					      <br></br>
					      <br></br>
					      <br></br>
					      <br></br>
				      	</div>
				    : null}
			    </div>	
		   : 
		   <div className="text-center">
				 <div onChange={this.changeRoomID}>
					<TextInput text="Enter Room ID: " type="text"/>
				 </div>
				 <Button onClick={this.joinRoom}>Join Room</Button>

				 <br></br>
				 <br></br>
				 <div>
				 	<b>Note: Each room is deleted when there is no one left in that room</b>
				 </div>
				 <br></br>
				 <br></br>

				 <div className="container">

					 {this.state.activeRooms.length > 0 ?
					 	<div>
							 <h2>Active Rooms</h2>

							 {this.state.activeRooms.map((room, key) => {
							 	return(
							 		<div className="col-md-4">
							 			<h3>Room {room.name}</h3>
							 			<div>{room.numberOfPlayers} Players</div>
							 			<Button onClick={event => this.joinSpecificRoom(room.name)}>Join <span className="glyphicon glyphicon-menu-right text-right small" aria-hidden="true"></span></Button>
							 		</div>
							 	);
							 })}
						</div>
						 : null}

				</div>

			</div>
			 }
	    </div>
 
     );
  }
}

// <--- Header maybe??? --->
 // { this.state.show ? 
	// 	      		<Navbar className="navbar navbar-fixed-top">
	// 		      	  <h2>draftDay</h2>
	// 		        </Navbar>
	//         	: null}

class GenderInput extends React.Component {
	render(){
		return (
			<div>
				<input type="radio" value={this.props.name} name="gender"/> {this.props.name}
			</div>
		);
	}
}

class Input extends React.Component {
	componentDidMount(){
  		$('.toggleOffInput').bootstrapToggle('off');
	}
	componentDidUpdate(){
	    $('.toggleOffInput').bootstrapToggle();
	}
	render(){
		return (
			<div>
				<input className="toggleOffInput" type="checkbox" data-toggle="toggle" data-on={this.props.name} data-off={this.props.name} value={this.props.value} data-width="25%" data-height="25%"/>
			</div>
		);
	}
}

class GenInput extends React.Component {
	componentDidMount(){
  		$('.toggleInput').bootstrapToggle('on');
	}
	componentDidUpdate(){
	    $('.toggleInput').bootstrapToggle();
	}

	render(){
		return (
			<span>
				<input className="toggleInput" type="checkbox" data-toggle="toggle" data-on={this.props.name} data-off={this.props.name} value={this.props.value} defaultChecked/>
			</span>
		);
	}
}

class DraftTypeInput extends React.Component {
	componentDidMount(){
  		$('.toggleInput').bootstrapToggle('on');
	}
	componentDidUpdate(){
	    $('.toggleInput').bootstrapToggle();
	}

	render(){
		return (
			<span>
				<input className="toggleInput" type="checkbox" data-toggle="toggle" data-on={this.props.name1} data-off={this.props.name2} value={this.props.value} defaultChecked/>
			</span>
		);
	}
}

class TextInput extends React.Component {
	_notifyServer(event){
       socket.emit('number of team change', { value: event.target.value });
    }
	render(){
		return (
			<div>
				<h3 className="textInputName">
				 {this.props.text} 
				</h3> 
				<input onChange={this._notifyServer} type={this.props.type} placeholder={this.props.placeholder}/>				
			</div>
		);
	}
}

class Pokemon extends React.Component {
	render(){
		return (
	        	<div className="pokemonImgContainer">
	        		<img src={this.props.image} className="pokeImage"></img>
	        	</div>
		);
	}
}

class ReadyButton extends React.Component {
	componentDidMount(){
  		$('.toggleInputReadyButton').bootstrapToggle('off');
	}
	componentDidUpdate(){
	    $('.toggleInputReadyButton').bootstrapToggle();
	}

	render(){
		return (
			<div>
				<input 
					className="toggleInputReadyButton readyUpButtons" 
					type="checkbox" 
					data-toggle="toggle" 
					data-on={'Ready!'} 
					data-off={'Not Ready'} 
					data-onstyle="success" 
					data-offstyle="danger"/>
			</div>
		);
	}
}

ReactDOM.render(
	<App/>		,
	document.getElementById('app')
);
