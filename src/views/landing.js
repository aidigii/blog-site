import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography';
import Post from '../components/post';
import Button from '@material-ui/core/Button';
import theme from '../theme'

import { db } from '../firebase-config';


export default class Landing extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){
        let query = db.collection('posts');

        let observer = query.onSnapshot(querySnapshot => {
            const docSnapshots = querySnapshot.docs;

            for (var i in docSnapshots) {
                const doc = docSnapshots[i].data();
                 console.log(doc)
            }
        }, err => {
          console.log(`Encountered error: ${err}`);
        });

    }


    render(){
        return(
            <MuiThemeProvider theme={theme}>
                <Typography variant="h3">
                    Aliah 
                </Typography>
                <Button href="/create">
                    Create
                </Button>
             
                <Post />
            </MuiThemeProvider>
        );
    }
}