import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import theme from '../theme'
import { Redirect } from 'react-router-dom';


export default class Post extends React.Component{

   state = { redirect: null, title: '', post: '' }
    
   EditPost = (title, post) => {
       console.log('something')
        this.setState({ redirect: true , title: title, post: post});
    }

    render(){
        if(this.state.redirect) {
            return <Redirect to={{pathname:'/create',
                        state: {title: this.state.title, post: this.state.post}}} />
        }
        return(
            <MuiThemeProvider theme = {theme}>
                <Paper>
                 <Typography variant="h1">
                     {this.props.post.title}
                 </Typography>
                 <Typography variant="h2">
                     {this.props.post.post}
                 </Typography>
                 </Paper>
                 <Button onClick={() => this.EditPost(this.props.post.title, this.props.post.post)}>
                     Edit
                 </Button>
               
            </MuiThemeProvider>
        );
    }
}