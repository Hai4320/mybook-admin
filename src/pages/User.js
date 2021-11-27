import React,{useState, useEffect} from 'react'
import {makeStyles} from '@mui/styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useSelector, useDispatch} from 'react-redux';
import {getAllUser, deleteUser} from '../redux/actions/userAction'
import {AllUsers} from '../redux/selectors'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import CircularProgress from "react-cssfx-loading/lib/CircularProgress";
import FormControl from '@mui/material/FormControl';
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
        const x = await dispatch(getAllUser())
    },[]);
    //dia Log
    const [userSelected, setSelected] = useState({});
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const handleClickOpen = (row,setOpenx) => {
        setSelected(row);
        setOpenx(true);
    };

    const handleClose = (setOpenx) => {
        setOpenx(false);
    };
    //delete User Selected
    const [password,setPassword] = useState('');
    const handleDelete = async (event) => {
        event.preventDefault();
        const data = {id: userSelected._id, password: password}; 
        handleClose(setOpen2)
        setPassword('');
        const result = await dispatch(deleteUser(data));
        if (result.status){
            alert(result.data.message);
        } else {
            alert("something went wrong");
        }

        
    }
    console.log("password",password);
    return (
       <div className={classes.container}>
           <FormControl>
            <Typography variant="h5" style={{color: 'red', margin: 10}}>All Users</Typography>
           {/*---------------------------- Message */}
           <Dialog open={open} onClose={()=>handleClose(setOpen)}>
                <DialogTitle>Send Message</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Send a new message to [ user:{userSelected.name}, ID:{userSelected._id} ]
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="massage"
                    label="Message"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>handleClose(setOpen)}>Cancel</Button>
                <Button onClick={()=>handleClose(setOpen)}>Send</Button>
                </DialogActions>
            </Dialog>
            {/* ----------------------------Delete User */}
            <Dialog open={open2} onClose={()=>handleClose(setOpen2)}>
                <DialogTitle>Delete {userSelected.name}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                      Are you sure you want to delete this account?
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Confirm password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(event)=> setPassword(event.target.value)}
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>handleClose(setOpen2)}>Cancel</Button>
                <Button onClick={(event)=>handleDelete(event)} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
            </FormControl>
            {/* -----------------------------data */}
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
                        <TableCell align="center">
                            <Button 
                            variant="contained" 
                            onClick={()=> handleClickOpen(row,setOpen)}>
                                Message
                            </Button>
                        </TableCell>
                        <TableCell align="center">
                            <Button 
                            variant="contained"
                            color="error"  
                            onClick={()=> handleClickOpen(row,setOpen2)}>
                                Delete
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {rows.length===0 ? <CircularProgress color="#1e90ff" width="50px" height="50px" duration="2s" />: null}
       </div>
    )
}

export default User
