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
import {getAllBook} from '../redux/actions/bookAction'
import {AllBooks} from '../redux/selectors'
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {FcAddImage} from 'react-icons/fc'
const useStyles = makeStyles({
    container:{
        marginTop: 100,
        width: '100%'
    }
})
function Book() {

    const books = useSelector(AllBooks);
    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(()=>{
        setRows(books);
    },[books])
    useEffect(async ()=>{
        await dispatch(getAllBook())
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
       <div className={classes.container} >
            <Box style={{marginBottom: 20}}>
                <Typography variant="h5" style={{color: 'red', margin: 10}}>All Books Data</Typography>
                <Button variant="contained">Add new book</Button>    
            </Box>
            <Dialog open={open2} onClose={()=>handleClose(setOpen2)}>
                <DialogTitle>Delete {userSelected.Title}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                        Are you sure you want to delete this Book?
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
                <Button onClick={()=>handleClose(setOpen2)} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">TitLe</TableCell>
                        <TableCell align="left">Author</TableCell>
                        <TableCell align="left">Type</TableCell>
                        <TableCell align="left">Image</TableCell>
                        <TableCell align="left">View</TableCell>
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
                        <TableCell align="left">{row.Title}</TableCell>
                        <TableCell align="left">{row.Author}</TableCell>
                        <TableCell align="left">{row.Type}</TableCell>
                        <TableCell align="left">{row.Image}</TableCell>
                        <TableCell align="center"><Button variant="contained">View</Button></TableCell>
                        <TableCell align="center"><Button variant="contained" color="error" onClick={()=> handleClickOpen(row,setOpen2)}>Delete</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
       </div>
    )
}

export default Book
