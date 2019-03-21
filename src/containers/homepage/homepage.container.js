import React from 'react';
import {Redirect} from 'react-router-dom';
import {isLoggedIn} from '../../utils/global';
import HomePageComponent from '../../components/homepage/homepage.component'

 
export const HomePageContainer  =  ()=> {
    
    return (
        <>
            {isLoggedIn() ? 
            (
                <Redirect to="dashboard" />
            ) : (
                <>
                    <HomePageComponent /> 
                </>
            )
            }
        </>
    ) 
}