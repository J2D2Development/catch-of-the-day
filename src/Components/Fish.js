import React, { Component } from 'react';

export default class Fish extends Component {
    constructor() {
        super();
    }

    render() {
        const details = this.props.details;
        return(
            <li className="menu-fish">
                <img src={details.image} alt={details.name} />
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{details.price}</span>
                </h3>
                <p>{details.desc}</p>
                <button>Add to Order</button>
            </li>
        )
    }
}