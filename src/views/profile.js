import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography';
import Post from '../components/post';
import Button from '@material-ui/core/Button';
import theme from '../theme';
import { LinkRoute, Link, BrowserRouter as Router } from 'react-router-dom';
import { db } from '../firebase-config'; 
import { Redirect } from 'react-router-dom';



export default class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            uidArray: [],
            firstname: '',
            secondname: '',
            redirect: false, 
        }
    }

    componentDidMount(){
        let query = db.collection('users');

        let observer = query.onSnapshot(querySnapshot => {
            const docSnapshots = querySnapshot.docs;
            let newArray = [];
            for (var i in docSnapshots) {
                //each document 
                const doc = docSnapshots[i];
                let myMap = new Map()
                myMap.set(doc.id, doc.data().firstname);

                newArray = newArray.concat(myMap);
            }

            this.setState({ uidArray:
                [...new Set([...newArray])]
            });
            
        }, err => {
          console.log(`Encountered error: ${err}`);
        });

    }

    showProfile = (id) => {

        if(this.isEmpty(this.props.match.params)){
            console.log('empty')
        }else{

            db.collection('users')
            .doc(id)
            .get()
            .then(doc => this.setState({
                firstname: doc.data().firstname,
                lastname: doc.data().lastname,
            }))
    
            return (
                <Typography variant="h5">
                    {this.state.firstname} {this.state.lastname}
                </Typography>
            )
        }


    }

    showList = (id) => {

        if(this.isEmpty(this.props.match.params)){
            const users = this.state.uidArray.map((user, index) => (
                <Typography variant="h4" key={index}>
                  <Link to={`/profile/${user.keys().next().value}`}>{user.get(user.keys().next().value)}</Link>
                </Typography>
              ))
              return users
        }
    };

    isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    redirectHome = () => {
        this.setState({redirect: true})
    }

    render(){
   
        if(this.state.redirect) {
            return <Redirect to={{pathname:'/',
                        state: {title: this.state.title, post: this.state.post}}} />
        }

        return(
            <div>
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h3">
                        Profiles
                    </Typography>
                    {this.showList(this.props.match.params.userId)}
                    {this.showProfile(this.props.match.params.userId)}
                  <Button onClick={this.redirectHome}>Home</Button>
                </MuiThemeProvider>
            </div>
        )
    }
}