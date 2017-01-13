var socket = io();
var pokemans = [];
class App extends React.Component {

componentDidMount() {

    socket.on('broadcast pick', (selection) => {
    	console.log(selection);
    	if(this.state.teamResults.length - 1 < selection.team){
    		this.state.teamResults.push([selection.pokemon]);
    	} else {
    		this.state.teamResults[selection.team].push(selection.pokemon);
    	}
    	console.log(this.state.showResults);
    	this.state.showResults[selection.pokemonNum] = false;
    	var results = this.state.showResults;
    	this.setState({showResults: results});
    });

    socket.on('flock', (j) => {
    	console.log(j);
    	var data1 = j;
    	pokemans = j;
    	this.setState({data: data1});
    	console.log(this.state.data);
    	var showResultsTemp = [];
		for(var i = 0; i < j.length; i++){
			showResultsTemp.push(true);
		}
		this.setState({show: true});
		this.setState({showResults: showResultsTemp});
    });

    socket.on('teamNumberChange', (teams) => {
    	this.setState({numberOfTeams: teams});
    });

    socket.on('player number', (number) => {
    	console.log(number);
    	this.setState({clientNumber: number});
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
			   	  serverValue: 'adfsf',
			   	  teamResults: [],
			   	  clientNumber: -1}; 
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
  }

  onUpdateLabel(data){
	this.setState({serverValue: data});
  }

  draftChange(event){
  	var s = !this.state.snakeDraft;
  	this.setState({snakeDraft: s, linearDraft: !s});
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
  }

  toggleTypes(){
  	var s = !this.state.showTypes;
  	this.setState({showTypes: s});
  }

  toggleIndType(event) {
  	switch(event.type){
  		
		       case "Bird":
		       		var s = !this.state.Bird;
		       		this.setState({Bird: s})
		       		break;
			   case "Normal":
			   		var s = !this.state.Normal;
			   		this.setState({Normal: s})
			   		break;
			   case "Grass":
			   		var s = !this.state.Grass;
			   		this.setState({Grass: s})
			   		break;
			   case "Poison":
			   		var s = !this.state.Poison;
			   		this.setState({Poison: s})
			   		break;
			   case "Fire":
			   		var s = !this.state.Fire;
			   		this.setState({Fire: s})
			   		break;
			   case "Flying":
			   		var s = !this.state.Flying;
			   		this.setState({Flying: s})
			   		break;
			   case "Water":
			   		var s = !this.state.Water;
			   		this.setState({Water: s})
			   		break;
			   case "Bug":
			   		var s = !this.state.Bug;
			   		this.setState({Bug: s})
			   		break;
			   case "Electric":
			   		var s = !this.state.Electric;
			   		this.setState({Electric: s})
			   		break;
			   case "Ground":
			   		var s = !this.state.Ground;
			   		this.setState({Ground: s})
			   		break;
			   case "Fairy":
			   		var s = !this.state.Fairy;
			   		this.setState({Fairy: s})
			   		break;
			   case "Fighting":
			   		var s = !this.state.Fighting;
			   		this.setState({Fighting: s});
			   		break
			   case "Psychic":
			   		var s = !this.state.Psychic;
			   		this.setState({Psychic: s})
			   		break;
			   case "Rock":
			   		var s = !this.state.Rock;
			   		this.setState({Rock: s})
			   		break;
			   case "Steel":
			   		var s = !this.state.Steel;
			   		this.setState({Steel: s})
			   		break;
			   case "Ice":
			   		var s = !this.state.Ice;
			   		this.setState({Ice: s})
			   		break;
			   case "Ghost":
			   		var s = !this.state.Ghost;
			   		this.setState({Ghost: s})
			   		break;
			   case "Dark":
			   		var s = !this.state.Dark;
			   		this.setState({Dark: s})
			   		break;
			   case "Dragon":
			   		var s = !this.state.Dragon;
			   		this.setState({Dragon: s})
			   		break;

  	}
  }

  selectPokemon(event) {
  	var name = event.name;
  	var number = event.key;
  	socket.emit('selection made', {team: this.state.currentPlayer-1, 
  								   pokemon: event.name,
  								   pokemonNum: event.key});

  	if(this.state.teams.length < this.state.currentPlayer){
  		this.state.teams.push([name]);
  	} else{
  		this.state.teams[this.state.currentPlayer-1].push(name);
  	}
  	//make pokemon disappear
  	{this.state.showResults[number] = false}
  	var results = this.state.showResults;
  	this.setState({showResults: results});

  	if(this.state.linearDraft){
  		{this.state.lastPlayer = this.state.currentPlayer}
		this.setState({lastPlayer: this.state.lastPlayer});
	  	{this.state.currentPlayer += 1}  
		if(this.state.currentPlayer > this.state.numberOfTeams){
			{this.state.currentPlayer = 1}
			{this.state.round += 1}
			this.setState({round: this.state.round});
		}
		{this.state.nextPlayer = this.state.currentPlayer == this.state.numberOfTeams ? 1 : this.state.currentPlayer+1}
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
  }

  finalFormChange(event) {
  	var s = !this.state.finalFormOnly;
  	this.setState({finalFormOnly: s});
  }

  megasChange(event){
  	var s = !this.state.megasOnly;
  	this.setState({megasOnly: s});
  }

  generationChange(event){
  	switch(event.gen){
  		case "gen1":
  			var s = !this.state.gen1;
  			this.setState({gen1: s});
  			break;
		case "gen2":
  			var s = !this.state.gen2;
  			this.setState({gen2: s});
  			break;
  		case "gen3":
  			var s = !this.state.gen3;
  			this.setState({gen3: s});
  			break;
  		case "gen4":
  			var s = !this.state.gen4;
  			this.setState({gen4: s});
  			break;
  		case "gen5":
  			var s = !this.state.gen5;
  			this.setState({gen5: s});
  			break;
  		case "gen6":
  			var s = !this.state.gen6;
  			this.setState({gen6: s});
  			break;
  		case "gen7":
  			var s = !this.state.gen7;
  			this.setState({gen7: s});
  			break;					
  	}
  }

  getResults() {
  	if(pokemans != []){
  		console.log(pokemans);
  	}
  	var genArray = [this.state.gen1,
  					this.state.gen2,
  					this.state.gen3,
  					this.state.gen4,
  					this.state.gen5,
  					this.state.gen6];
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
    	<div>
	      <div className="text-center">
				{/* Generations **DONE**
				Type (Double Type?)  **DONE**
				Tiers **DONE**
				Non legendarys **NOT POSSIBLE?**
				Only legendarys **NOT POSSIBLE?**
				Only third forms **DONE**
				filter megas only **DONE**
				sum base stats and base stat level **DONE**
				*/}   

		      {
		      	// <div onChange={this.handleTeamChange}>
  		     //  		<TextInput text="Number of Teams:" type="number" placeholder="Default is 2 Teams"/>
  	   	  //       </div>
		      }
		      <h3>
				Number of Players Connected:	 
			  </h3> 
			  <h4>
			  {this.state.numberOfTeams}
			  </h4>
		      <div onClick={this.draftChange}>
		      	<DraftTypeInput name1="Snake Draft" name2="Linear Draft" value={this.state.snakeDraft}/>
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
		      </div>

		      <div onChange={this.handleBaseStatChange}>
		      	<TextInput text="Minimum Cumulative Base Stats: " type="number"/>
		      </div>

		      <br></br>

		      <div onClick={this.finalFormChange}>
		      	<Input name="Final Forms Only" value={this.state.finalFormOnly}/>
		      </div>

		      <div onClick={this.megasChange}>
		      	<Input name="Megas Only" value={this.state.megasOnly}/>
		      </div>	

		      <div>
			    <ButtonToolbar className="textCenter1">
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
			    </ButtonToolbar>
		      </div>	      

		      {!this.state.draftOver && !this.state.show ?
		      	<Button bsStyle="primary" onClick={this.getResults}>GO</Button>
		      : null}

		      {this.state.show || this.state.draftOver? 
		      	<div>
			      	<Button bsStyle="primary" onClick={this.getResults}>ReRoll Pokemon</Button>
			      	&nbsp;&nbsp;&nbsp;&nbsp;
			      	<Button bsStyle="primary" onClick={this.restart}>Start Over</Button>
			    </div>
		      : null}

		      <Navbar inverse className="navbar-dark text-primary text-center navbar-fixed-top">
		      <b>YOU ARE PLAYER {this.state.clientNumber+1}</b>
		      <br></br>
		      {this.state.currentPlayer == this.state.clientNumber+1 ? <b>IT IS YOUR TURN</b> : null}
		      </Navbar>

		      { this.state.show ? 
					<Navbar inverse className="navbar-dark navbar-fixed-bottom">
						<ul className="nav nav-pills nav-justified">
							<li className="col-md-4"> 
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
							
								<div className="text-center headerMiddleText"><b>Player {this.state.currentPlayer}</b></div> 
								<div className="text-center headerMiddleText"><b>PICK YOUR POKEMON</b></div>
								<hr></hr>
								<div className="text-center headerMiddleText roundText"><b>ROUND {this.state.round}</b></div>
							</li>
							
							<li className="col-md-4">
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
		            			{this.state.showResults[key] ? 
		            				<span>
			            				<Pokemon name={name.name} image={name.image}></Pokemon>
			            				<div>
			            					<Button bsStyle="primary" onClick={(event)=>this.selectPokemon({name: name.name, key: key}, event)}>Draft {name.name}</Button>  
			            				</div>
			            			</span>
			            			: null }
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
			<span>
	        	<div>
	        		<img src={this.props.image}></img>
	        	</div>
	        	<div className="pokemonName">
	        		{this.props.name}
	            </div>
			</span>
		);
	}
}

class SocketBanner extends React.Component {
	render(){
		return(
			<h>{this.props.value}</h>
		);
	}
}

var output = ReactDOM.render(
	<App/>, 
	document.getElementById('app')
);
