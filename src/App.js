import React, { Component } from 'react';
import Header from './Components/Header';
import Inventory from './Components/Inventory';
import Order from './Components/Order';
import Fish from './Components/Fish';
import sampleFishes from '../sample-fishes.js';
import base from './base';

export default class App extends Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);
        
        this.state = {
            fishes: {},
            order: {}
        };
    }

    componentWillMount() {
        //runs befoe app is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        //check if order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        if(localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish(fish) {
        const fishes = {...this.state.fishes};
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;

        this.setState({ fishes });
    }

    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    removeFish(key) {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.removeFromOrder(key);
        this.setState({ fishes });
    }

    addToOrder(key) {
        const order = { ...this.state.order };
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    }

    removeFromOrder(key) {
        //copy state first
        const order = { ...this.state.order };
        delete order[key];
        //update state with edited copy
        this.setState({ order });
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }

    render() {
        let fishList = Object.keys(this.state.fishes)
            .map(key => <Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]} />);

        return(
            <div className="catch-of-the-day">
              <div className="menu">
                <Header tagline="Fresh Seafood Market" />
                <ul className="list-of-fishes">
                    {fishList}
                </ul>
              </div>
              <Order params={this.props.params} fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
              <Inventory fishes={this.state.fishes} addFish={this.addFish} updateFish={this.updateFish} removeFish={this.removeFish} loadSamples={this.loadSamples} />
            </div>
        )
    }
}

App.PropTypes = {
    params: React.PropTypes.object.isRequired
}
