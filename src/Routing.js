import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import App from './App';
import StorePicker from './Components/StorePicker';
import NotFound from './Components/NotFound';

const Root = () => {
    return(
        <BrowserRouter>
            <div>
                <Match exactly pattern="/" component={StorePicker} />
                <Match exactly pattern="/store/:storeId" component={App} />
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    )
}

export default Root;