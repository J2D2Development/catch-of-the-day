import React, { Component } from 'react';
import { nameify } from '../Utilities/helpers';

export default class StorePicker extends Component {
    goToStore(evt) {
        evt.preventDefault();
        const storeId = this.storeInput.value;
        this.context.router.transitionTo(`/store/${storeId}`);
    }

    render() {
        return(
            <div>
                <h1>Welcome to the Store!</h1>
                <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
                    <h2>Please enter a store</h2>
                    <input type="text" required placeholder="Store Name" defaultValue={nameify()} ref={input => this.storeInput = input } />
                    <button type="submit">Visit Store</button>
                </form>
            </div>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}