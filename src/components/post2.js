import React from 'react';
import { Redirect } from 'react-router-dom';
import { db, auth } from '../firebase-config';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { render } from '@testing-library/react';


const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '40vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  text: {
    fontSize: '40px',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
});

class Post extends React.Component {

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
        const { classes } = this.props; 
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

        return (
            <div className={classes.root}>
            <CssBaseline />
            <Container component="main" className={classes.main} maxWidth="sm">
                <Typography className={classes.text} component="h2" gutterBottom>
                {this.props.post.title}
                </Typography>
                <Typography variant="body1">
                {this.props.post.post}
                </Typography>
                <Button onClick={() => this.EditPost(this.props.post.title, this.props.post.post)}>
                     Edit
                 </Button>
                 <Button onClick={() => this.queryPost(this.props.post.title, this.props.post.post)}>
                     Delete
                 </Button>
            </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Post);