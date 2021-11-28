import React,{useState, useEffect} from 'react'
import Box from "@mui/material/Box"
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
import {getAllBook} from '../redux/actions/bookAction'
import {AllBooks} from '../redux/selectors'
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CircularProgress from "react-cssfx-loading/lib/CircularProgress";
import {AiOutlineClose} from 'react-icons/ai'
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';

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
    const defaultBook = {
        _id: "", 
        Title: "",
        Author: "", 
        Description: "", 
        Image: "", 
        Audio: [], 
        Company:"", 
        PDF:"", 
        PublishingCompany:"",
        Star:0 , 
        Type:"",
    }
    useEffect(()=>{
        setRows(books);
    },[books])
    useEffect(async ()=>{
        await dispatch(getAllBook())
    },[])
    const [userSelected, setSelected] = useState(defaultBook);
    const [bookNew, setBookNew] = useState(defaultBook);
    //open edit
    const [open, setOpen] = React.useState(false);
    //open delete
    const [open2, setOpen2] = React.useState(false);
    //open add
    const [open3, setOpen3] = React.useState(false);
    const handleClickOpen = (row,setOpenx) => {
        console.log(row);
        if (row !== -1) setSelected(row);
        else 
        if (userSelected._id === undefined||userSelected._id ===""){
            setSelected(defaultBook);
        }
        setOpenx(true);
    };
    const handleClose = (setOpenx) => {
        setOpenx(false);
    };
    return (
       <div className={classes.container} >
            <Box style={{marginBottom: 20}}>
                <Typography variant="h5" style={{color: 'red', margin: 10}}>All Books Data</Typography>
                <Button variant="contained" onClick={()=> handleClickOpen(-1,setOpen3)}>Add new book</Button>    
            </Box>
            {/* form edit book */}
            <Dialog open={open} onClose={()=>handleClose(setOpen)} fullScreen>
                <DialogTitle>
                     <IconButton
                    edge="start"
                    color="inherit"
                    onClick={()=>handleClose(setOpen)}
                    aria-label="close"
                    style={{marginRight: 10}}
                    >
                        <AiOutlineClose />
                    </IconButton>
                    Book Data
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    
                         View and Edit Book: {userSelected.Title}
                </DialogContentText>
                <TextField
                    margin="dense"
                    id="password"
                    label="Confirm password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>handleClose(setOpen)}>Cancel</Button>
                <Button onClick={()=>handleClose(setOpen)} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
            {/* Form add new book */}
            <Dialog open={open3} onClose={()=>handleClose(setOpen3)} fullScreen>
                <DialogTitle>
                    <IconButton
                    edge="start"
                    color="inherit"
                    onClick={()=>handleClose(setOpen3)}
                    aria-label="close"
                    style={{marginRight: 10}}
                    >
                        <AiOutlineClose />
                    </IconButton>
                    Add new book
                </DialogTitle>
                <DialogContent>
                <Typography variant="h6" style={{marginTop: 15}}>Title:</Typography>
                <TextField
                    margin="dense"
                    id="title"
                    label="Title of book"
                    type="text"
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>Author:</Typography>
                <TextField
                    margin="dense"
                    id="author"
                    label="Author name"
                    type="text"
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>Type:</Typography>
                <TextField
                    margin="dense"
                    id="type"
                    label="Type"
                    select
                    style={{width: 200}}
                >
                    { [...Array(5).keys()].map(i=>
                        <MenuItem key={i} value={i}>{i}</MenuItem>
                    )
                    }
                </TextField>
                <Typography variant="h6" style={{marginTop: 15}}>Description:</Typography>
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    multiline
                />
                <Typography variant="h6" style={{marginTop: 15}}>Company:</Typography>
                <TextField
                    margin="dense"
                    id="company"
                    label="Company "
                    type="text"
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>PublishingCompany:</Typography>
                <TextField
                    margin="dense"
                    id="publicer"
                    label="Publishing Company "
                    type="text"
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>Stars:</Typography>
                <TextField
                    margin="dense"
                    id="stars"
                    label="Stars"
                    select
                    style={{width: 200}}
                >
                    { [...Array(5).keys()].map(i=>
                        <MenuItem key={i} value={i}>{i+1}</MenuItem>
                    )
                    }
                </TextField>
                <Typography variant="h6" style={{marginTop: 15}}>Image:</Typography>
                <TextField
                    margin="dense"
                    id="image"
                    label="Image link"
                    type="text"
                    fullWidth
                />
               
                <TextField
                    margin="dense"
                    id="password"
                    label="Confirm admin password to add new book"
                    type="password"
                    fullWidth  
                    variant="standard" 
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>handleClose(setOpen3)}>Cancel</Button>
                <Button onClick={()=>handleClose(setOpen3)}>Add Book</Button>
                </DialogActions>
            </Dialog>
            {/* Delete dig */}
            <Dialog open={open2} onClose={()=>handleClose(setOpen2)}>
                <DialogTitle>Delete {userSelected.Title}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                        Are you sure you want to delete this Book?
                </DialogContentText>
                <TextField
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
            {/* -------------------------data--------------- */}
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
                        <TableCell align="center"><Button variant="contained" onClick={()=> handleClickOpen(row,setOpen)}>View</Button></TableCell>
                        <TableCell align="center"><Button variant="contained" color="error" onClick={()=> handleClickOpen(row,setOpen2)}>Delete</Button></TableCell>
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
