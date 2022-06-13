import React from 'react';
import { Box, Column, Heading } from 'gestalt';
import 'gestalt/dist/gestalt.css';

const Header = () =>  {
    return (<Box display="flex" direction="row" paddingY={2} color={'lightGray'}>
    <Column span={10}>
      
      
        {/* <Heading size="lg">ipostbox</Heading> */}
      
    </Column>
    </Box>);
}

export default Header;