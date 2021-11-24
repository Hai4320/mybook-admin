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
    item:{
        color: "white"
    }
})

function Nav() {
    const navigate = useNavigate();
    const [select,setSelected] = useState(0)
    const classes = useStyles();
    const handleListItemClick = (event, index) => {
        setSelected(index);
      };
    const handleLogout= (event,index) => {
        setSelected(index);
        localStorage.removeItem('islogin');
        localStorage.removeItem('userData');
        window.location.reload();
    }
    return (
        <div className="container">
            <Drawer 
             sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  background: "#333",
                  color: 'white',
                },
              }}
              variant="permanent"
              anchor="left">
                <Typography variant='h6'>MyBooks</Typography>
                <List>
                    <ListItemButton
                    selected={select === 0}
                    onClick={(event) => 
                    {
                        handleListItemClick(event, 0);
                        navigate('/book')
                    }}>
                        <ListItemIcon>
                            <ImBooks className={classes.item}/>
                        </ListItemIcon>
                        <ListItemText primary="Books"  className={classes.item} />
                    </ListItemButton>
                    <ListItemButton
                    selected={select === 1}
                    onClick={(event) =>  {
                        handleListItemClick(event, 1);
                        navigate('/post')
                    }}>
                        <ListItemIcon>
                            <IoNewspaperOutline  className={classes.item}/>
                        </ListItemIcon>
                        <ListItemText primary="Posts"  className={classes.item}/>
                    </ListItemButton>
                    <ListItemButton
                    selected={select === 2}
                    onClick={(event) =>  {
                        handleListItemClick(event, 2);
                        navigate('/user')
                    }}>
                        <ListItemIcon>
                            <FiUsers  className={classes.item}/>
                        </ListItemIcon>
                        <ListItemText primary="Users"  className={classes.item}/>
                    </ListItemButton>
                    <ListItemButton
                    selected={select === 3}
                    onClick={(event) =>handleLogout(event, 3)}>
                        <ListItemText primary="Log out" />
                        <ListItemIcon>
                            <IoLogOutOutline className={classes.item}/>
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
        </div>
    )
}

export default Nav
