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
import Typography from '@mui/material/Typography';
import {useSelector, useDispatch} from 'react-redux';
import {getAllPost} from '../redux/actions/postAction'
import {AllPosts} from '../redux/selectors'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CircularProgress from "react-cssfx-loading/lib/CircularProgress";
const useStyles = makeStyles({
    container:{
        marginTop: 100,
        width: '200%'
    }
})

function Book() {
    const posts = useSelector(AllPosts);
    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(()=>{
        setRows(posts);
    },[posts])
    useEffect(async ()=>{
        const x = await dispatch(getAllPost())
    },[])
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
    return (
       <div className={classes.container}>
           <Typography variant="h5" style={{color: 'red', margin: 10}}>All Posts Data</Typography>
           {/* ------------------Dialog  */}
           <Dialog open={open2} onClose={()=>handleClose(setOpen2)}>
                <DialogTitle>Confirm</DialogTitle>
                <DialogContent>
                <DialogContentText>
                      {userSelected.accept? "Remove Accept Post: "+ userSelected.title: "Accept Post: "+ userSelected.title}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Confirm password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>handleClose(setOpen2)}>Cancel</Button>
                <Button onClick={()=>handleClose(setOpen2)} >OK</Button>
                </DialogActions>
            </Dialog>
            {/* ---------------------table data */}
           <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">Title</TableCell>
                        <TableCell align="left">Author</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Image</TableCell>
                        <TableCell align="left">Create At</TableCell>
                        <TableCell align="left">Details</TableCell>
                        <TableCell align="left">Accept</TableCell>

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
                        <TableCell align="left" style={{minWidth: 300}}>{row.title}</TableCell>
                        <TableCell align="left" style={{width: 100}}><p>{row.userID}</p></TableCell>
                        <TableCell align="left">{row.accept? "Accepted": (row.upload? "Uploaded": "Saved")}</TableCell>
                        <TableCell align="left">{row.image}</TableCell>
                        <TableCell align="left" style={{minWidth: 200}}>{row.createdAt}</TableCell>
                        <TableCell align="left" style={{minWidth: 800}}><Typography variant="string">{JSON.stringify(row.details)}</Typography></TableCell>
                        <TableCell align="center">
                            {row.accept?
                            <Button variant="outlined" color="error" onClick={()=> handleClickOpen(row,setOpen2)}>Accepted</Button>
                            : row.upload?
                            <Button variant="contained" onClick={()=> handleClickOpen(row,setOpen2)}>Accept</Button>
                            : null}
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

export default Book
