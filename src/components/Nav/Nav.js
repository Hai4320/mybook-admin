import React from 'react'
import{useNavigate} from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import {makeStyles} from '@mui/styles'
const drawerWidth = 240
const useStyles = makeStyles({
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    }
})

function Nav() {
    const navigate = useNavigate();
    const classes = useStyles();
    return (
        <div className="container">
            <Drawer 
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{paper: classes.drawerPaper}}>
                <Typography variant='h5'>MyBooks</Typography>
            </Drawer>
        </div>
    )
}

export default Nav
