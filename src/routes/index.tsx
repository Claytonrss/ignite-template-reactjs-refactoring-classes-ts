import React from 'react'
import { Dashboard } from 'pages/Dashboard'
import { Switch, Route } from 'react-router-dom'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
  </Switch>
)

export default Routes
