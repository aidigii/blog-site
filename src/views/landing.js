import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography';
import Post from '../components/post';
import Button from '@material-ui/core/Button';
import theme from '../theme'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../views/header';
import Grid from '@material-ui/core/Grid';
import { db } from '../firebase-config';
import FeaturedPost from './FeaturedPost';


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
            return <Post key = {post.title}  post={post}/>});

        return(
            <React.Fragment>
            <MuiThemeProvider theme={theme}>
                <Container maxWidth="lg">
                <Header title="Aliah's Medium" />
                {posts}
                </Container>
            </MuiThemeProvider>
            </React.Fragment>
        );
    }
}

/**
 *              <Grid container spacing={4}>
                {featuredPosts.map((post) => (
                 <FeaturedPost key={post.title} post={post} />
                 ))}
             </Grid>
 */