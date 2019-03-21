import React from 'react'; 
import {Redirect, Route} from 'react-router-dom';
import {isLoggedIn} from '../../utils/global';
import DashBoardComponent from '../../components/dashboard/dashboard.component';
import ExploreComponent from '../../components/explore/explore.component';
import Ratingomponent from '../../components/rating/rating.component';
import SettingsComponent from '../../components/settings/settings.component';

export const DashBoardContainer = ({component: Component, ...rest})=>{
 
    return (
        <>
            {isLoggedIn() ? 
            (
                <> 
                    <Route exact path="/dashboard" component={DashBoardComponent} /> 
                    <Route exact path="/dashboard/explore" component={ExploreComponent} /> 
                    <Route exact path="/dashboard/rating/:id" component={Ratingomponent} /> 
                    <Route exact path="/dashboard/settings" component={SettingsComponent} />  
                </>
            )  : (
                <Redirect to="/" />
            )
            }
        </>
    ) 
}

