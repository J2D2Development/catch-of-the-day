import React, { Component } from 'react';
import AddFishForm from './AddFishForm.js';

export default class Inventory extends Component {
    constructor() {
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, key) {
        const fish = this.props.fishes[key];
        const updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        };
        this.props.updateFish(key, updatedFish);
    }

    renderInventory(key) {
        const fish = this.props.fishes[key];

        return (
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name} onChange={e => this.handleChange(e, key)} placeholder="Fish Name" />
                <input type="text" name="price" value={fish.price} onChange={e => this.handleChange(e, key)} placeholder="Fish Price" />
                <select name="status" value={fish.status} onChange={e => this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" value={fish.desc} onChange={e => this.handleChange(e, key)} placeholder="Description"></textarea>
                <input type="text" value={fish.image} name="image" onChange={e => this.handleChange(e, key)} placeholder="Fish Image" />
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }

    render() {
        const allFishes = Object.keys(this.props.fishes).map(this.renderInventory);

        return(
            <div>
                <h2>Inventory</h2>
                {allFishes}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Samples</button>
            </div>
        )
    }
}

Inventory.PropTypes = {
    fishes: React.PropTypes.object.isRequired,
    addFish: React.PropTypes.func.isRequired,
    updateFish: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func
}