import React, { Component } from 'react';
import AddFishForm from './AddFishForm.js';
import base from '../base';

export default class Inventory extends Component {
    constructor() {
        super();
        this.state = {
            uid: null,
            owner: null
        };

        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
    }
    
    componentDidMount() {
        base.onAuth(user => {
            if(user) {
                this.authHandler(null, { user });
            }
        });
    }

    handleChange(e, key) {
        const fish = this.props.fishes[key];
        const updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        };
        this.props.updateFish(key, updatedFish);
    }

    authenticate(provider) {
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    logout() {
        base.unauth(); //firebase remove authData
        this.setState({
            uid: null
        });
    }

    authHandler(err, authData) {
        if(err) {
            console.log(err);
            return;
        }

        //get store info
        const storeRef = base.database().ref(this.props.storeId);

        //get ref to store
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};

            //claim if no owner
            if(!data.owner) {
                storeRef.set({
                    owner: authData.user.uid
                });
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            });
        });
    }

    renderLogin() {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory.</p>
                <button className="github" onClick={() => this.authenticate('github')}>
                    Log in with github
                </button>
            </nav>
        )
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
        const logout = <button onClick={this.logout}>Log Out</button>

        //check if user is not logged in
        if(!this.state.uid) {
            return (
                <div>{this.renderLogin()}</div>
            )
        }

        //user is logged in but not the owner of this store.
        if(this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry- you are not the owner of this store!</p>
                    {logout}
                </div>
            )
        }

        return(
            <div>
                <h2>Inventory</h2>
                {logout}
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
    loadSamples: React.PropTypes.func,
    storeId: React.PropTypes.string.isRequired
}