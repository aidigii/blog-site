import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import theme from '../theme'

export default class Post extends React.Component{
    render(){
        return(
            <MuiThemeProvider theme = {theme}>
                <Paper>
                 <Typography variant="h1">
                     Hongjoong and Seonghwa
                 </Typography>
                 <Typography variant="h2">
                     Yunho
                 </Typography>

                </Paper>
            </MuiThemeProvider>
        );
    }
}