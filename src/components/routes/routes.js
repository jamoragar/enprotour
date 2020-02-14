import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import App from '../../App';
import Registered from '../registered/registered';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={App}/>
                <Route path='/Registered' component={Registered} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;