import React,{useState, useEffect} from 'react'
import Box from "@mui/material/Box"
import {makeStyles} from '@mui/styles'
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useSelector, useDispatch} from 'react-redux';
import {getAllUser} from '../redux/actions/userAction'
import {AllUsers} from '../redux/selectors'
const useStyles = makeStyles({
    container:{
        marginTop: 100,
        width: '100%'
    }
})
function User() {
    const users = useSelector(AllUsers);
    const [rows, setRows] = useState([]);

    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(()=>{
        setRows(users);
    },[users])
    useEffect(async ()=>{
        await dispatch(getAllUser())
    },[])
    return (
       <div className={classes.container}>
           USER
           <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">User</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="left">Avatar</TableCell>
                        <TableCell align="left">Message</TableCell>
                        <TableCell align="left">Delete</TableCell>

                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row._id}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.role}</TableCell>
                        <TableCell align="left">{row.avatar}</TableCell>
                        <TableCell align="center"><Button variant="contained">Message</Button></TableCell>
                        <TableCell align="center"><Button variant="contained">Delete</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
       </div>
    )
}

export default User
