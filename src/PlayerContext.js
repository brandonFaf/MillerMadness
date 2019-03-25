import React, { createContext } from 'react';
export const PlayerContext = createContext();

export default class PlayerStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initials: [],
      setInitials: this.setInitials
    };
  }
  setInitials = (newInitials, player) => {
    const { initials } = this.state;
    if (player === 1) {
      this.setState({ initials: [newInitials, initials[1]] });
    } else {
      this.setState({ initials: [initials[0], newInitials] });
    }
  };
  render() {
    return (
      <PlayerContext.Provider value={this.state}>
        {this.props.children}
      </PlayerContext.Provider>
    );
  }
}
