import React, { Component } from 'react';

export default class AddFishForm extends Component {
    createFish(evt) {
        evt.preventDefault();
        
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            description: this.description.value,
            image: this.image.value
        };

        this.props.addFish(fish);
        this.fishForm.reset();
    }

    render() {
        return(
            <form ref={input => this.fishForm = input} className="fish-edit" onSubmit={e => this.createFish(e)}>
                <input ref={input => this.name = input} type="text" placeholder="Fish Name" />
                <input ref={input => this.price = input} type="text" placeholder="Fish Price" />
                <select ref={input => this.status = input}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea ref={input => this.description = input} placeholder="Description"></textarea>
                <input ref={input => this.image = input} type="text" placeholder="Fish Image" />
                <button type="submit">+ Add Item</button>
            </form>
        )
    }
}