import  React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';


const NavBar = () => {

  return (
    <AppBar style={{background:"#121d33f7"}} position="sticky" >
        <Container maxWidth="md">
          <Toolbar style={{justifyContent: 'space-between'}}>
            <Typography
              variant="h5"
              style={{fontFamily: 'Inter', color: '#fff', cursor: 'pointer'}}
            >
              Blockhain Solutions
            </Typography>

            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Link to="/" style={{textDecoration:'none'}}>
                <Button>home</Button>
              </Link>
              <Link to="/portfolio" style={{textDecoration:'none'}}>
                <Button>portfolio</Button>
              </Link>
            </ButtonGroup>
          </Toolbar>
        </Container>
      </AppBar>
  );
};

export default NavBar;
