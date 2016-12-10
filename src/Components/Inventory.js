import React, { Component } from 'react';
import AddFishForm from './AddFishForm.js';

export default class Inventory extends Component {
    render() {
        return(
            <div>
                <h2>Inventory</h2>
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Samples</button>
            </div>
        )
    }
}