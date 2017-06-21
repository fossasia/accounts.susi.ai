import React from "react";

export class Home extends React.Component {
    render() {
        return (
            <div>
                <h3>Hello {this.props.name}!</h3>
            </div>
        );
    }
}