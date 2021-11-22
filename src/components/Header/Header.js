import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header() {
    return (
        <div>
             <AppBar>
                <Toolbar>
                    <Typography>
                        MYBOOK ADMIN MANAGER
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
