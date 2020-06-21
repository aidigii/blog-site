import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography';
import Post from '../components/post';

import theme from '../theme'

export default class Landing extends React.Component{
    render(){
        return(
            <MuiThemeProvider theme={theme}>
                <Typography variant="h3">
                    Aliah 
                </Typography>
                <Post />
            </MuiThemeProvider>
        );
    }
}