import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';  
import theme from '../theme';
import { db, auth } from '../firebase-config';
import { Redirect } from 'react-router-dom';

export default class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            uid: '',
            redirect: null,
        }
    }

    SignUp = () => {

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            console.log(user.user.uid)
            if(user) {
                db.collection('users')
                .doc(user.user.uid)
                .set({
                    email: this.state.email, 
                    firstname: this.state.firstname,
                    lastname: this.state.lastname, 
                })
                this.setState({redirect:true})
            }
        })
        .catch(function(error){
            var errorCode = error.code; 
            var errorMessage = error.message; 

            if(errorCode == 'auth/weak-password'){
                alert('The password is too weak.');
            } else{
                alert(errorMessage)
            }
            console.log(error);
        });
    
    };


    render(){
        //if true, redirects to the sign-in page
        if(this.state.redirect) {
            return <Redirect to={{pathname:'/sign-in',
                        state: {firstname: this.state.firstname, 
                                lastname: this.state.lastname,
                                uid: this.state.uid, 
                                email: this.state.email }}} />
        }



        return(
            <div>
                <MuiThemeProvider theme={theme}>
                <Typography variant="h3">Sign-up:</Typography>
                <TextField variant="outlined" 
                            label="First Name"
                            value={this.state.firstname}
                            onInput={e => this.setState({firstname:e.target.value})}></TextField>
                <TextField variant="outlined" 
                            label="Last Name"
                            value={this.state.lastname}
                            onInput={e => this.setState({lastname:e.target.value})}></TextField>
                <TextField variant="outlined" 
                            label="email"
                            value={this.state.email}
                            onInput={e => this.setState({email:e.target.value})}></TextField>
                <TextField variant="outlined" 
                            label="password"
                            value={this.state.password}
                            type="password"
                            onInput={e => this.setState({password:e.target.value})}></TextField>
                <Button onClick={this.SignUp}>Sign-up</Button>
                </MuiThemeProvider>
            </div>
        )
    }
}