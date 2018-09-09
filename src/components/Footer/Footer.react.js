import React, { Component } from 'react';
import susi from '../../images/susi-logo.svg';
import './Footer.css';
import { Link } from 'react-router-dom';
import { urls } from '../../Utils';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: false,
    };
  }
  render() {
    // Footer Component
    return (
      <div className="footer">
        <div className="footer-container">
          <Link to="/">
            <img src={susi} alt="SUSI" className="susi-logo" />
          </Link>
          <ul className="alignLeft">
            <li>
              <a href={`${urls.CHAT_URL}/overview`}>Overview</a>
            </li>
            <li>
              <a href={`${urls.CHAT_URL}/blog`}>Blog</a>
            </li>
            <li>
              <a href={`${urls.API_URL}`}>API</a>
            </li>
            <li>
              <a href="https://github.com/fossasia?utf8=%E2%9C%93&q=susi">
                Code
              </a>
            </li>
          </ul>
          <ul className="alignRight">
            <li>
              <a href={`${urls.CHAT_URL}/contact`}>Contact</a>
            </li>
            <li>
              <a href={`${urls.CHAT_URL}/terms`}>Terms</a>
            </li>
            <li>
              <a href={`${urls.CHAT_URL}/privacy`}>Privacy</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Footer;
