import React, { createContext } from 'react';
export const SettingsContext = createContext();

export default class SettingsStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initials: [],
      time: 0,
      gameMode: 'Classic',
      setInitials: this.setInitials,
      setTime: this.setTime
    };
  }
  setTime = time => {
    this.setState({ time });
  };
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
      <SettingsContext.Provider value={this.state}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}
