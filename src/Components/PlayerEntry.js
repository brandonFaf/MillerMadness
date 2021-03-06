import React from 'react';
import classnames from 'classnames';
import up from '../img/up.png';
import down from '../img/down.png';
import basketball from '../img/Basketball.png';
const alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export default class PlayerEntry extends React.Component {
  constructor(props) {
    super(props);
    this.ul = React.createRef();
  }
  state = {
    cursors: [
      {
        cursor: 19,
        letter: 'T'
      },
      {
        cursor: 0,
        letter: 'A'
      },
      {
        cursor: 12,
        letter: 'M'
      }
    ],
    activeCursor: 0
  };
  componentDidMount = () => {
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
    this.ul.current.focus();
  };

  makeInitials = () => this.state.cursors.map(c => c.letter).join('');

  handleKeyDown = e => {
    e.preventDefault();
    const { goNext, goBack } = this.props;
    if (e.keyCode === 65) {
      if (this.state.activeCursor === 0) {
        goBack(this.makeInitials());
      }
      this.setState(({ activeCursor }) => ({
        activeCursor: --activeCursor
      }));
    } else if (e.keyCode === 68) {
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
      if (e.keyCode === 87) c.cursor = --c.cursor < 0 ? 25 : c.cursor;
      else if (e.keyCode === 83) c.cursor = ++c.cursor % 26;

      c.letter = alph[c.cursor];
      return c;
    });
    this.setState({ cursors: newCursors });
  };
  render() {
    const {
      activeCursor,
      cursors: [cursor1, cursor2, cursor3]
    } = this.state;
    return (
      <div className="stacked">
        <div
          ref={this.ul}
          tabIndex="0"
          className="initials"
          onKeyDown={this.handleKeyDown}
        >
          <div className="vertical-selection">
            {activeCursor === 0 && (
              <img alt="arrow" className="arrow" src={up} />
            )}
            <p className={classnames(activeCursor === 0 && 'selected')}>
              {alph[cursor1.cursor]}
            </p>
            {activeCursor === 0 && (
              <img alt="arrow" className="arrow" src={down} />
            )}
          </div>
          <div className="vertical-selection">
            {activeCursor === 1 && (
              <img alt="arrow" className="arrow" src={up} />
            )}
            <p className={classnames(activeCursor === 1 && 'selected')}>
              {alph[cursor2.cursor]}
            </p>
            {activeCursor === 1 && (
              <img alt="arrow" className="arrow" src={down} />
            )}
          </div>
          <div className="vertical-selection">
            {activeCursor === 2 && (
              <img alt="arrow" className="arrow" src={up} />
            )}
            <p className={classnames(activeCursor === 2 && 'selected')}>
              {alph[cursor3.cursor]}
            </p>
            {activeCursor === 2 && (
              <img alt="arrow" className="arrow" src={down} />
            )}
          </div>
        </div>
        {activeCursor === 3 && (
          <div className="horizontal-selection">
            {activeCursor === 3 && <img alt="basketball" src={basketball} />}
            <p className={classnames(activeCursor === 3 && 'selected')}>
              Continue
            </p>

            {activeCursor === 3 && <img alt="basketball" src={basketball} />}
          </div>
        )}
      </div>
    );
  }
}
