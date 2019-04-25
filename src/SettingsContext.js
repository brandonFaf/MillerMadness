import React, { createContext } from 'react';
export const SettingsContext = createContext();

export default class SettingsStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: 1,
      initials: [],
      scores: [],
      time: 100,
      gameMode: 'Classic',
      setInitials: this.setInitials,
      setTime: this.setTime,
      setGameMode: this.setGameMode,
      setScores: this.setScores,
      setPlayers: this.setPlayers
    };
  }
  setPlayers = players => {
    if (players === 1) {
      const [player] = this.state.initials;
      const [score] = this.state.scores;
      this.setState({ players, initials: [player], scores: [score] });
    } else {
      this.setState({ players });
    }
  };
  setScores = (score1, score2) => {
    if (score2) {
      if (score1) {
        this.setState({ scores: [score1, score2] });
      } else {
        this.setState(state => {
          let score0 = state.scores[0] || 0;
          return { scores: [score0, score2] };
        });
      }
    } else {
      this.setState(state => {
        if (state.scores.length > 1) {
          return { scores: [score1, state.scores[1]] };
        }
        return { scores: [score1] };
      });
    }
  };
  setTime = time => {
    this.setState({ time });
  };
  setGameMode = gameMode => {
    this.setState({ gameMode });
  };
  setInitials = (newInitials, player) => {
    const { initials } = this.state;
    if (player === 1) {
      if (this.state.players === 1) {
        this.setState({ initials: [newInitials] });
      } else {
        this.setState({ initials: [newInitials, initials[1]] });
      }
    } else {
      this.setState({ initials: [initials[0], newInitials] });
    }
  };
  render() {
    return (
      <SettingsContext.Provider value={this.state}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}
