import React, { Component } from 'react';
import Header from './Components/Header';
import Inventory from './Components/Inventory';
import Order from './Components/Order';

export default class App extends Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        
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

    render() {
        return(
            <div className="catch-of-the-day">
              <div className="menu">
                <Header tagline="Fresh Seafood Market" />
              </div>
              <Order />
              <Inventory addFish={this.addFish} />
            </div>
        )
    }
}
