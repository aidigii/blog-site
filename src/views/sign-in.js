import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';  
import theme from '../theme';
import { auth } from '../firebase-config';
import { Redirect } from 'react-router-dom';

export default class SignIn extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: null, 
        }
    }

    SignIn = () => {

        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(function(error){
            var errorCode = error.code; 
            var errorMessage = error.message; 

            if(errorCode == 'auth/wrong-password'){
                alert('Wrong password.');
            } else{
                alert(errorMessage)
            }
            console.log(error);
        })


    };


    render(){
        
        if(this.state.redirect) {
            return <Redirect to={{pathname:'/create',
                        state: {title: this.state.title, post: this.state.post}}} />
        }
        
        auth.onAuthStateChanged((user) => {
            if(user){
               this.setState({redirect:true})
            }
            else{
                console.log('you are not signed in')
            }
        })

        return(
            <div>
                <MuiThemeProvider theme={theme}>
                <Typography variant="h3">Sign-in:</Typography>
                <TextField variant="outlined" 
                            label="email"
                            value={this.state.email}
                            onInput={e => this.setState({email:e.target.value})}></TextField>
                <TextField variant="outlined" 
                            label="password"
                            value={this.state.password}
                            type="password"
                            onInput={e => this.setState({password:e.target.value})}></TextField>
                <Button onClick={this.SignIn}>Sign-in</Button>
                </MuiThemeProvider>
            </div>
        )
    }
}