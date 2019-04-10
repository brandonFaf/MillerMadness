import React, { createContext } from 'react';
export const SettingsContext = createContext();

export default class SettingsStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: 2,
      initials: ['AAA', 'BBB'],
      scores: [99, 98],
      time: 102,
      gameMode: 'KNOCK OUT',
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
      this.setState({ scores: [score1, score2] });
    } else {
      this.setState({ scores: [score1] });
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
