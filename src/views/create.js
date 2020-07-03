import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import { db } from '../firebase-config';

import theme from '../theme'

const Input = styled.div`
    display: flex;
    flex-direction: row; 
`;


export default class CreatePage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            title: (this.props.location.state == null) ? '' : this.props.location.state.title,
            post: (this.props.location.state == null) ? '' : this.props.location.state.post,
            created: '',
        }
    }

    handleSubmit = (e) => { 
    // Add a new document in collection "posts"
        e.preventDefault();
       
        if(this.props.location.state == null){
            db.collection('posts').doc().set({
                title: this.state.title,
                post: this.state.post, 
         
            }, {merge: false})
    
            this.setState({
                title: '',
                post: '',
              });
        }
        else{
            
            db.collection('posts')
            .where('title','==',this.props.location.state.title)
            .where('post','==', this.props.location.state.post)
            .get()
            .then(snap => {
                snap.forEach(doc => {
                    this.updatePost(doc.id)
                })
            })
        }    
    };

    updatePost = (id) => {

        db.collection('posts')
        .doc(id)
        .update({
            title: this.state.title,
            post: this.state.post, 
        })
        .then(console.log('success!')) 

        this.setState({
            title: '',
            post: '',
          });
    };

    render(){
        console.log(this.state)
        return(
            <MuiThemeProvider theme={theme}>
                <Button href="/">views</Button>
                <Input>
                    <Typography variant="h3">
                        Aliah 
                    </Typography>
                   <form>
                    <InputLabel>Title</InputLabel>
                        <TextField variant="outlined"
                            InputProps={{ style: { fontSize: 20 } }}
                            InputLabelProps = {{ style: {fontSize: 20 }}}
                            value={this.state.title}
                            onInput={e => this.setState({title: e.target.value})} >
                        </TextField>
                    <InputLabel>Post</InputLabel>
                        <TextField variant="outlined" multiline rows = {20}
                            InputProps={{ style: { fontSize: 20 } }}
                            value={this.state.post}
                            onInput={e => this.setState({post:e.target.value})}>
                        </TextField>     
                    <Button onClick={this.handleSubmit}>Submit</Button>
                    </form>
                </Input>
            </MuiThemeProvider>
        );
    }
}