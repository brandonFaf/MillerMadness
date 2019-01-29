import React, { Component } from "react";
class GamePlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.match.params.time,
      players: props.match.params.players
    };
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.state.time > 0) {
        this.setState(prevState => {
          return {
            time: --prevState.time
          };
        });
      } else {
        this.props.history.push(
          "/game-over/" +
            this.props.match.params.time +
            "/" +
            this.props.match.params.players
        );
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    console.log("clearing timer");
  }
  render() {
    return (
      <div>
        <h3>{this.state.time} </h3>
        <h3>{this.state.players} Players</h3>
      </div>
    );
  }
}

export default GamePlay;
