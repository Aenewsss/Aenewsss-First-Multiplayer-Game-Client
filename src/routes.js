import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import GameScreen from './screens/Game/GameScreen'
import Home from './screens/Game/Home'
import ErrorScreen from './screens/Error/ErrorScreen'

const Routes = () => (

    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path='/game' component={GameScreen} />
            <Route path="*" component={ErrorScreen} />
        </Switch>
    </BrowserRouter>
)


export default Routes