import React from 'react';
import classnames from 'classnames';
const alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export default class PlayerEntry extends React.Component {
  constructor(props) {
    super(props);
    this.ul = React.createRef();
    console.log('here');
  }
  state = {
    cursors: [
      {
        cursor: 0,
        letter: 'A'
      },
      {
        cursor: 0,
        letter: 'A'
      },
      {
        cursor: 0,
        letter: 'A'
      }
    ],
    activeCursor: 0
  };
  componentWillMount = () => {
    const { initials } = this.props;
    if (initials) {
      const cursors = initials.split('').map(i => {
        return {
          cursor: alph.indexOf(i),
          letter: i
        };
      });
      this.setState({ cursors, activeCursor: 3 });
    }
  };

  makeInitials = () => this.state.cursors.map(c => c.letter).join('');

  handleKeyDown = e => {
    e.preventDefault();
    const { goNext, goBack } = this.props;
    if (e.keyCode === 37) {
      if (this.state.activeCursor === 0) {
        goBack(this.makeInitials());
      }
      this.setState(({ activeCursor }) => ({
        activeCursor: --activeCursor
      }));
    } else if (e.keyCode === 39) {
      if (this.state.activeCursor === 3) {
        goNext(this.makeInitials());
      }
      this.setState(({ activeCursor }) => ({
        activeCursor: ++activeCursor
      }));
    }
    const { activeCursor, cursors } = this.state;
    const newCursors = cursors.map((c, i) => {
      if (i !== activeCursor) return c;
      if (e.keyCode === 38) c.cursor = --c.cursor < 0 ? 25 : c.cursor;
      else if (e.keyCode === 40) c.cursor = ++c.cursor % 26;

      c.letter = alph[c.cursor];
      return c;
    });
    this.setState({ cursors: newCursors });
  };
  componentDidMount() {
    this.ul.current.focus();
  }
  render() {
    const {
      activeCursor,
      cursors: [cursor1, cursor2, cursor3]
    } = this.state;
    return (
      <div className="stacked">
        <ul
          ref={this.ul}
          tabIndex="0"
          className="initials"
          onKeyDown={this.handleKeyDown}
        >
          <li className={classnames(activeCursor === 0 && 'selected')}>
            {alph[cursor1.cursor]}
          </li>
          <li className={classnames(activeCursor === 1 && 'selected')}>
            {alph[cursor2.cursor]}
          </li>
          <li className={classnames(activeCursor === 2 && 'selected')}>
            {alph[cursor3.cursor]}
          </li>
        </ul>
        {activeCursor === 3 && (
          <p className={classnames(activeCursor === 3 && 'selected')}>
            Continue
          </p>
        )}
      </div>
    );
  }
}
