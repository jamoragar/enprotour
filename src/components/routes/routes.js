import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import App from '../../App';
import Registered from '../registered/registered';
import Profile from '../profile/profile';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={App}/>
                <Route path='/Registered' component={Registered} />
                <Route path='/Profile/:id' component={Profile} />
            </Switch>
        </BrowserRouter>    
    )
}

export default Routes;