import React, { Component,useState, useEffect  } from 'react'
import Box from '@material-ui/core/Box';
import SplitPane, { Pane } from 'react-split-pane';

const styles = {
    background: '#E1E1E1',
    width: '1px',
    cursor: 'col-resize',
    margin: '0 1px',
    height: '100%',
};
  
export default class CreatePost extends React.Component {
   
    render(){
        return(
            <SplitPane
            split="vertical"
            minSize={100}
            defaultSize={300}
            resizerStyle={styles}
          >
          </SplitPane>
            // <Box m={15} >
            //     <h1>Hi</h1>
            // </Box>
       
            
        )
    }
}
  