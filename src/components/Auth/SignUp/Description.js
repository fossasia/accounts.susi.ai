import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './SignUp.css';

const button = {
  minWidth: '20%',
};

const Description = () => {
  return (
    <div className="app-body">
      <div className="About">
        <h1 className="description-heading">
          Meet SUSI.AI, Your Artificial Intelligence for Personal Assistants,
          Robots, Help Desks and Chatbots.
        </h1>
        <div className="description-text">
          <p>Ask it questions.</p>
          <p>Tell it to do things.</p>
          <p>Always ready to help.</p>
        </div>
        <a
          href="https://chat.susi.ai/overview"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="learnMoreButton">
            <RaisedButton
              label="Learn More"
              style={button}
              backgroundColor="#E5E5E5"
              labelColor="#000000"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Description;
