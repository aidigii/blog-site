import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import theme from '../theme';
import { db, auth } from '../firebase-config';
import { Redirect } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends React.Component{

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

    SignUp = (e) => {
      e.preventDefault();
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
      const { classes } = this.props; 
      if(this.state.redirect) {
        return <Redirect to={{pathname:'/sign-in',
                    state: {}}} />
    }
    return (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className={classes.form} noValidate>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="firstname"
                  label="First name"
                  name="firstname"
                  autoFocus
                  value={this.state.firstname}
                  onInput={e => this.setState({firstname:e.target.value})}
                />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  label="Last name"
                  name="lastname"
                  autoFocus
                  value={this.state.lastname}
                  onInput={e => this.setState({lastname:e.target.value})}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={this.state.email}
                  onInput={e => this.setState({email:e.target.value})}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  type="password"
                  onInput={e => this.setState({password:e.target.value})}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.SignUp}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/sign-in" variant="body2">
                      {"Already have an account? Sign-in"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      );
  }


}

export default withStyles(styles)(SignUp);