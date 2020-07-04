import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import theme from '../theme';
import { Redirect } from 'react-router-dom';
import { db, auth } from '../firebase-config';


export default class Post extends React.Component{

   state = { redirect: null, 
                title: '', 
                post: '' }
    
   EditPost = (title, post) => {
       console.log('something')
        this.setState({ redirect: true , title: title, post: post});
    }

    queryPost = (title, post) => {
        db.collection('posts')
        .where('title','==', title)
        .where('post','==', post)
        .get()
        .then(snap => {
            snap.forEach(doc => {
                this.updatePost(doc.id)
            })
        })
    }

    updatePost = (id) => {
        db.collection('posts')
        .doc(id)
        .delete()
        .then(console.log('successfully deleted!'))       
    }

    render(){
        if(this.state.redirect) {
            return <Redirect to={{pathname:'/create',
                        state: {title: this.state.title, post: this.state.post}}} />
        }

        auth.onAuthStateChanged(function(user) {
            if(user){
                let email = user.email;
                let uid = user.uid; 
            } else {
                console.log('signed out')
            }
        });
        
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
                 <Button onClick={() => this.queryPost(this.props.post.title, this.props.post.post)}>
                     Delete
                 </Button>
               
            </MuiThemeProvider>
        );
    }
}