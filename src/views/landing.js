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
            docArray: [],
        }
    }

    componentDidMount(){
        let query = db.collection('posts');

        let observer = query.onSnapshot(querySnapshot => {
            const docSnapshots = querySnapshot.docs;
            let newArray = [];
            for (var i in docSnapshots) {
                //each document 
                const doc = docSnapshots[i];
               newArray = newArray.concat(doc.data());
     
            }

            this.setState({ docArray:
                [...new Set([...newArray])]
            });

            
        }, err => {
          console.log(`Encountered error: ${err}`);
        });

    }


    render(){
        const posts = this.state.docArray.map(post => {
            return <Post post = {post} />});
            
        return(
            <MuiThemeProvider theme={theme}>
                <Typography variant="h3">
                    Aliah 
                </Typography>
                <Button href="/create">
                    Create
                </Button>
                {posts}
                
            </MuiThemeProvider>
        );
    }
}