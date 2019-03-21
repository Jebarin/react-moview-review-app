import React from 'react';
import ReactDOM from 'react-dom'; 
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {HomePageContainer} from './homepage/homepage.container';
import {DashBoardContainer} from './dashboard/dashboard.container';
import ErrorPageComponent from './errorpage/errorpage.container';


export default class App extends React.Component {
    render() {
      return (
        <Router> 
            <Switch>
                <Route exact path="/" component={HomePageContainer} /> 
                <DashBoardContainer /> 
                <Route component={ErrorPageComponent} />
            </Switch>
        </Router>
      )
    }
  }

ReactDOM.render(<App/>, document.getElementById('root'));
