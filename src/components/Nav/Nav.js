import React,{useState, useEffect} from 'react'
import{useNavigate} from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import {makeStyles} from '@mui/styles'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {ImBooks} from 'react-icons/im';
import {FiUsers} from 'react-icons/fi';
import {IoNewspaperOutline, IoLogOutOutline} from 'react-icons/io5';
const drawerWidth = 240
const useStyles = makeStyles({
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    }
})

function Nav({label=0}) {
    const navigate = useNavigate();
    const [select,setSelected] = useState(0)
    const classes = useStyles();
    const handleListItemClick = (event, index) => {
        setSelected(index);
      };
    return (
        <div className="container">
            <Drawer 
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{paper: classes.drawerPaper}}>
                <Typography variant='h6'>MyBooks</Typography>
                <List>
                    <ListItemButton
                    selected={select === 0}
                    onClick={(event) => handleListItemClick(event, 0)}>
                        <ListItemIcon>
                            <ImBooks/>
                        </ListItemIcon>
                        <ListItemText primary="Books" />
                    </ListItemButton>
                    <ListItemButton
                    selected={select === 1}
                    onClick={(event) => handleListItemClick(event, 1)}>
                        <ListItemIcon>
                            <IoNewspaperOutline/>
                        </ListItemIcon>
                        <ListItemText primary="Posts" />
                    </ListItemButton>
                    <ListItemButton
                    selected={select === 2}
                    onClick={(event) => handleListItemClick(event, 2)}>
                        <ListItemIcon>
                            <FiUsers/>
                        </ListItemIcon>
                        <ListItemText primary="Users    " />
                    </ListItemButton>
                    <ListItemButton
                    selected={select === 3}
                    onClick={(event) => handleListItemClick(event, 3)}>
                        <ListItemText primary="Log out" />
                        <ListItemIcon>
                            <IoLogOutOutline/>
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
        </div>
    )
}

export default Nav
