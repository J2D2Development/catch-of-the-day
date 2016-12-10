import React, { Component } from 'react';
import Header from './Components/Header';
import Inventory from './Components/Inventory';
import Order from './Components/Order';
import Fish from './Components/Fish';
import sampleFishes from '../sample-fishes.js';

export default class App extends Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        
        this.state = {
            fishes: {},
            order: {}
        };
    }

    addFish(fish) {
        const fishes = {...this.state.fishes};
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;

        this.setState({ fishes });
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }

    render() {
        return(
            <div className="catch-of-the-day">
              <div className="menu">
                <Header tagline="Fresh Seafood Market" />
                <ul className="list-of-fishes">
                    {Object.keys(this.state.fishes)
                        .map(fish => <Fish key={fish} details={this.state.fishes[fish]} />)}
                </ul>
              </div>
              <Order />
              <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
            </div>
        )
    }
}
