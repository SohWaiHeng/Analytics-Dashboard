import React, { Component } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';

class Hoverable extends Component {
    state = { hovered: false };
    render() {
        return (
            <div>
            <FontAwesomeIcon icon={faInfoCircle}
                onMouseEnter={() => this.setState({ hovered: true })}
                onMouseLeave={() => this.setState({ hovered: false })}
            />
                {this.props.children(this.state.hovered)}
            </div>
        );
    }
}

export default Hoverable;