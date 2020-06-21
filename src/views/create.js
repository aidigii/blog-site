import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components';

import theme from '../theme'

const Input = styled.div`
    display: flex;
    flex-direction: row; 
`;


export default class CreatePage extends React.Component{
    render(){
        return(
            <MuiThemeProvider theme={theme}>
                <Input>
                    <Typography variant="h3">
                        Aliah 
                    </Typography>
                    <form>
                    <InputLabel>Title</InputLabel>
                        <TextField variant="outlined"
                            InputProps={{ style: { fontSize: 20 } }}
                            InputLabelProps = {{ style: {fontSize: 20 }}} >
                        </TextField>
                    <InputLabel>Post</InputLabel>
                        <TextField variant="outlined" multiline rows = {20}
                            InputProps={{ style: { fontSize: 20 } }}>
                        </TextField>
                    </form>
                </Input>
            </MuiThemeProvider>
        );
    }
}