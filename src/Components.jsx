import React from "react";

const ABBREVS = {
  "OF": "Outfield",
  "IF": "Infield",
  "L": "Left",
  "R": "Right",
  "S": "Switch"
}

export default class PlayerManager extends React.Component {
  constructor(props) {
    super(props);

    let available_ids = this.props.players.map((_, index) => {
      return index;
    });
    let lineup_ids = Array(9).fill(null);

    this.state = {
      available_ids: available_ids,
      lineup_ids: lineup_ids
    }
  }

  reset = () => {
    let available_ids = this.props.players.map((_, index) => {
      return index;
    });
    let lineup_ids = Array(9).fill(null);

    this.setState({
      available_ids: available_ids,
      lineup_ids: lineup_ids
    })
  }

  addToLineup = (id) => {
    for (var i = 0; i < this.state.lineup_ids.length; i++) {
      if (this.state.lineup_ids[i] === null) {
        let available_ids = this.state.available_ids.slice();
        let lineup_ids = this.state.lineup_ids.slice();

        available_ids.splice(available_ids.indexOf(id), 1);
        lineup_ids[i] = id;

        this.setState({
          available_ids: available_ids,
          lineup_ids: lineup_ids
        })
        return;
      }
    }
  }

  removeFromLineup = (id) => {
    for (var i = 0; i < this.state.lineup_ids.length; i++) {
      if (this.state.lineup_ids[i] === id) {
        let available_ids = this.state.available_ids.slice();
        let lineup_ids = this.state.lineup_ids.slice();

        available_ids.push(id);
        lineup_ids[i] = null;

        this.setState({
          available_ids: available_ids,
          lineup_ids: lineup_ids
        })
        return;
      }
    }
  }

  swapLineup = (slot) => {
    if (slot < 1 || slot > 9) {
      return;
    }
    let lineup_ids = this.state.lineup_ids.slice();
    let temp = lineup_ids[slot - 1];
    lineup_ids[slot - 1] = lineup_ids[slot];
    lineup_ids[slot] = temp;
    this.setState({lineup_ids: lineup_ids})
  }

  lineupIsFull = () => {
    for (let id of this.state.lineup_ids) {
      if (id === null) {
        return false;
      }
    }
    return true;
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mx-2">
          <div className="col-6 pr-2">
            <div className="border">
              <AvailablePlayers allPlayers = {this.props.players} availableIDs={this.state.available_ids} remove={this.addToLineup} full={this.lineupIsFull()}></AvailablePlayers>
            </div>
          </div>
          <div className="col-6 pl-2">
            <div className="border">
              <Lineup allPlayers = {this.props.players} lineupIDs={this.state.lineup_ids} remove={this.removeFromLineup} swap={this.swapLineup} reset={this.reset}></Lineup>
            </div>
          </div>
        </div>
      </div>);
  }
}

class AvailablePlayers extends React.Component {
  constructor(props) {
      super(props);

      this.handedness_filters = {
        "ALL": (_) => {return true;},
        "L": (id) => {return this.props.allPlayers[id].bats === "L";},
        "R": (id) => {return this.props.allPlayers[id].bats === "R";},
        "S": (id) => {return this.props.allPlayers[id].bats === "S";},
      }

      this.position_filters = {
        "ALL": (_) => {return true;},
        "IF": (id) => {return this.props.allPlayers[id].position === "IF";},
        "OF": (id) => {return this.props.allPlayers[id].position === "OF";},
      }

      this.sorters = {
        "NAME_ASC": (id1, id2) => {
          return this.props.allPlayers[id1].name.localeCompare( this.props.allPlayers[id2].name);},
        "NAME_DESC": (id1, id2) => {
          return this.props.allPlayers[id2].name.localeCompare( this.props.allPlayers[id1].name);},
        "HR_ASC": (id1, id2) => {
          return this.props.allPlayers[id1].home_runs - this.props.allPlayers[id2].home_runs;},
        "HR_DESC": (id1, id2) => {
          return this.props.allPlayers[id2].home_runs - this.props.allPlayers[id1].home_runs;},
      }

      this.state = {
        handedness_filter_setting: "ALL",
        position_filter_setting: "ALL",
        sort_setting: "NAME_ASC",
      }
  }

  setHandednessFilter = (event) => {
    this.setState({handedness_filter_setting: event.target.value})
  }

  setPositionFilter = (event) => {
    this.setState({position_filter_setting: event.target.value})
  }

  setSortingType = (event) => {
    this.setState({sort_setting: event.target.value})
  }

  remove = (id) => {
    this.props.remove(id);
  }

  createList() {
    return this.props.availableIDs
    .filter(this.handedness_filters[this.state.handedness_filter_setting])
    .filter(this.position_filters[this.state.position_filter_setting])
    .sort(this.sorters[this.state.sort_setting])
    .map(((id) => {
      let player = this.props.allPlayers[id];
      return (<AvailablePlayerCard key={id} info={player} id={id} remove={this.remove} showButton={!this.props.full}></AvailablePlayerCard>)
    }))
  }

  render() {
    return (<div>
      <h2>Available Players</h2>
      <div><span>Filter by Handedness: </span>
        <select onChange={this.setHandednessFilter} value={this.state.handedness_filter_setting}>
          <option value="ALL">All</option>
          <option value="L">Left</option>
          <option value="R">Right</option>
          <option value="S">Switch</option>
        </select>
      </div>
      <div><span>Filter by Position: </span>
        <select onChange={this.setPositionFilter} value={this.state.position_filter_setting}>
          <option value="ALL">All</option>
          <option value="IF">Infielders</option>
          <option value="OF">Outfielders</option>
        </select>
      </div>
      <div><span>Sort by: </span>
        <select onChange={this.setSortingType} value={this.state.sort_setting}>
          <option value="NAME_ASC">Name: A to Z</option>
          <option value="NAME_DESC">Name: Z to A</option>
          <option value="HR_DESC">Home Runs: Most to Least</option>
          <option value="HR_ASC">Home Runs: Least to Most</option>
        </select>
      </div>
      <div className="d-inline-flex flex-wrap p-2">{this.createList()}</div>
    </div>);
  }
}

class AvailablePlayerCard extends React.Component {
  remove = () => {
    this.props.remove(this.props.id);
  }

  createButton = () => {
    if (this.props.showButton) {
      return (<div><button onClick={this.remove}>Add to Lineup</button></div>);
    } else {
      return (<div><button>Lineup is full!</button></div>);
    }
  }

  render() {
    return (<div className="container border">
      <h3>{this.props.info.name}</h3>
      <div className="row">
        <div className="col-6">
          <img className="playerCardImage" src={this.props.info.img} alt=""></img>
        </div>
        <div className="col-6">
          <ul className="text-left">
            <li>Position: {ABBREVS[this.props.info.position]}</li>
            <li>Handedness: {ABBREVS[this.props.info.bats]}</li>
            <li>Home Runs: {this.props.info.home_runs}</li>
          </ul>
          {this.createButton()}
        </div>
      </div>
    </div>);
  }
}


class Lineup extends React.Component {
  remove = (id) => {
    this.props.remove(id);
  }

  // swap this slot and the slot below it (index + 1)
  swap = (slot) => {
    this.props.swap(slot);
  }

  sumHomeRuns = () => {
    let total = 0;
    for (let id of this.props.lineupIDs) {
      if (id === null) {
        continue;
      } else {
        total += this.props.allPlayers[id].home_runs;
      }
    }
    return total;
  }

  createList() {
    return this.props.lineupIDs.map(((id, index) => {
      if (id === null) {
        return (<div key={index}><div className="my-2 border lineupSlot">{index + 1}. Empty slot</div><br></br></div>);
      } else {
        let player = this.props.allPlayers[id];
        return (<PlayerLineupEntry key={index} info={player} id={id} slot={index + 1} swap={this.swap} remove={this.remove}></PlayerLineupEntry>)
      }
    }))
  }

  render() {
    return (<div>
      <h2>Your Lineup</h2>
      <div>Total Home Runs: {this.sumHomeRuns()}</div>
      <div><button onClick={this.props.reset}>Reset</button></div>
      <div className="p-2">{this.createList()}</div>
    </div>);
  }
}

class PlayerLineupEntry extends React.Component {
  remove = () => {
    this.props.remove(this.props.id);
  }

  moveUp = () => {
    this.props.swap(this.props.slot - 1)
  }

  moveDown = () => {
    this.props.swap(this.props.slot)
  }

  createButtons = () => {
    let up_button = (<button onClick={this.moveUp}>&uarr;</button>);
    let down_button = (<button onClick={this.moveDown}>&darr;</button>);
    let remove_button = (<button onClick={this.remove}>Remove from Lineup</button>);
    if (this.props.slot === 1) {
      return (<div>{down_button}{remove_button}</div>);
    } else if (this.props.slot === 9) {
      return (<div>{up_button}{remove_button}</div>);
    } else {
      return (<div>{up_button}{down_button}{remove_button}</div>);
    }
  }

  render() {
    return (<div className="container border">
      <h3>{this.props.slot}. {this.props.info.name}</h3>
      <div className="row">
        <div className="col-6">
          <img className="playerCardImage" src={this.props.info.img} alt=""></img>
        </div>
        <div className="col-6">
          <ul className="text-left">
            <li>Position: {ABBREVS[this.props.info.position]}</li>
            <li>Handedness: {ABBREVS[this.props.info.bats]}</li>
            <li>Home Runs: {this.props.info.home_runs}</li>
          </ul>
          {this.createButtons()}
        </div>
      </div>
    </div>);
  }
}
