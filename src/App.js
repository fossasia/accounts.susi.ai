import React from 'react';
import ReactDOM from 'react-dom';
const NavComponent = React.createClass({
  render: function() {
    return (
      <nav>
        <div className="navWide">
          <div className="wideDiv">
            <a href="http://accounts.susi.ai/index.html" onClick={this.burgerToggle}>Home</a>
            <a href="http://accounts.susi.ai/api/html" onClick={this.burgerToggle}>API</a>
            <a href="http://accounts.susi.ai/apps/applist/index.html" onClick={this.burgerToggle}>Accounts </a>
          </div>
        </div>
        <div className="navNarrow">
          <i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
          <div className="narrowLinks">
            <a href="http://accounts.susi.ai/index.html" onClick={this.burgerToggle}>Home</a>
            <a href="http://accounts.susi.ai/api/html" onClick={this.burgerToggle}>API</a>
            <a href="http://accounts.susi.ai/apps/applist/index.html" onClick={this.burgerToggle}>Accounts </a>
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