import React from 'react';
import ReactDOM from 'react-dom';
const NavComponent = React.createClass({
  render: function() {
    return (
      <nav>
        <div className="navWide">
          <div className="wideDiv">
            <a href="#">test1</a>
            <a href="#">test2</a>
            <a href="#">test3</a>
          </div>
        </div>
        <div className="navNarrow">
          <i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
          <div className="narrowLinks">
            <a href="#" onClick={this.burgerToggle}>Link 1</a>
            <a href="#" onClick={this.burgerToggle}>Link 2</a>
            <a href="#" onClick={this.burgerToggle}>Link 3</a>
          </div>
        </div>
      </nav>
    );
  },
  burgerToggle: function() {
    let linksEl = document.querySelector('.narrowLinks');
    if (linksEl.style.display === 'block') {
      linksEl.style.display = 'none';
    } else {
      linksEl.style.display = 'block';
    }
  }
});

ReactDOM.render(<NavComponent />, document.querySelector('navbar'));