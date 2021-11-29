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
import LoadingButton from '@mui/lab/LoadingButton';
import {addBook, updateBook, deleteBook} from '../redux/actions/bookAction'

const useStyles = makeStyles({
    container:{
        marginTop: 100,
        width: '100%'
    }
})
function Book() {
    const books = useSelector(AllBooks);
    const [rows, setRows] = useState([]);
    const [loading,setloading] = useState(false);
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
        Status:"",
        PublishingCompany:"",
        Star:0 , 
        Type:"",
    }
    const types =["NOVEL","SELF HELP","CHILDREN'S BOOK", "WORK STYLE","SCIENCE","OTHERS"]
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
    const handleUpdateBook = async()=>{
        setloading(true);
        const data = {...userSelected};
        const result = await dispatch(updateBook(data));
        setloading(false);
        if (result.status){
            alert(result.data.message);
        } else {
            alert("something went wrong");
        }

        setloading(false);
        
    }
    //open delete
    const [open2, setOpen2] = React.useState(false);
    const [password,setPassword] = useState('');
    const handleDelete = async (event) => {
        event.preventDefault();
        const data = {id: userSelected._id, password: password}; 
        handleClose(setOpen2)
        setPassword('');
        const result = await dispatch(deleteBook(data));
        if (result.status){
            alert(result.data.message);
        } else {
            alert("something went wrong");
        }

        
    }
    //open add
    const [open3, setOpen3] = React.useState(false);
    const handleAddBook = async()=>{
        setloading(true);
        const data = {...bookNew};
        const result = await dispatch(addBook(data));
        setloading(false);
        if (result.status){
            alert(result.data.message);
        } else {
            alert("something went wrong");
        }

        setloading(false);
        
    }
    //open and close
    const handleClickOpen = (row,setOpenx) => {
        if (row !== -1) setSelected(row);
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
                    
                         View and edit: {userSelected.Title}
                </DialogContentText>
                <Typography variant="h6" style={{marginTop: 15}}>Title:</Typography>
                <TextField
                    margin="dense"
                    id="title"
                    label="Title of book"
                    type="text"
                    value={userSelected.Title}
                    onChange={(event) => setSelected({...userSelected,Title: event.target.value})}
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>Author:</Typography>
                <TextField
                    margin="dense"
                    id="author"
                    label="Author name"
                    value={userSelected.Author}
                    onChange={(event) => setSelected({...userSelected,Author: event.target.value})}
                    type="text"
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>Type:</Typography>
                <TextField
                    margin="dense"
                    id="type"
                    label="Type"
                    select
                    value={userSelected.Type}
                    onChange={(event) => setSelected({...userSelected,Type: event.target.value})}
                    
                    style={{width: 200}}
                >
                    { types.map(i=>
                        <MenuItem key={i} value={i}>{i}</MenuItem>
                    )
                    }
                </TextField>
                <Typography variant="h6" style={{marginTop: 15}}>Description:</Typography>
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    value={userSelected.Description}
                    onChange={(event) => setSelected({...userSelected,Description: event.target.value})}
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
                    value={userSelected.Company}
                    onChange={(event) => setSelected({...userSelected,Company: event.target.value})}
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>PublishingCompany:</Typography>
                <TextField
                    margin="dense"
                    id="publicer"
                    label="Publishing Company "
                    value={userSelected.PublishingCompany}
                    onChange={(event) => setSelected({...userSelected,PublishingCompany: event.target.value})}
                    type="text"
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>Stars:</Typography>
                <TextField
                    margin="dense"
                    id="stars"
                    label="Stars"
                    value={userSelected.Star}
                    type="number"
                    error={userSelected.Star<0||userSelected.Star>5}
                    onChange={(event) => setSelected({...userSelected,Star: event.target.value})}
                    style={{width: 200}}
                >
                </TextField>
                <Typography variant="h6" style={{marginTop: 15}}>Image:</Typography>
                <TextField
                    margin="dense"
                    id="image"
                    label="Image link"
                    value={userSelected.Image}
                    onChange={(event) => setSelected({...userSelected,Image: event.target.value})}
                    type="text"
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>PDF:</Typography>
                <TextField
                    margin="dense"
                    id="pdf"
                    label="PDF link"
                    value={userSelected.PDF}
                    onChange={(event) => setSelected({...userSelected,PDF: event.target.value})}
                    type="text"
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>Status:</Typography>
                <TextField
                    margin="dense"
                    id="st"
                    label="Status"
                    value={userSelected.Status}
                    onChange={(event) => setSelected({...userSelected,Status: event.target.value})}
                    type="text"
                    fullWidth
                />
               {/* <Typography variant="h6" style={{marginTop: 15}}>Audio List:</Typography>
               <Typography variant="subtitle1">a audio/line</Typography>
                <TextField
                    margin="dense"
                    id="audio"
                    label="Audio List"
                    type="week"
                    fullWidth
                    multiline
                />
                <TextField
                    margin="dense"
                    id="password"
                    label="Confirm admin password to add new book"
                    type="password"
                    fullWidth  
                /> */}
                </DialogContent>
                <DialogActions style={{marginBottom:20}}>
                <Button onClick={()=>handleClose(setOpen)} >Cancel</Button>
                <LoadingButton onClick={()=>handleUpdateBook()} variant="contained" loading={loading}>Update Book</LoadingButton>
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
                    value={bookNew.Title}
                    onChange={(event) => setBookNew({...bookNew,Title: event.target.value})}
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>Author:</Typography>
                <TextField
                    margin="dense"
                    id="author"
                    label="Author name"
                    value={bookNew.Author}
                    onChange={(event) => setBookNew({...bookNew,Author: event.target.value})}
                    type="text"
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>Type:</Typography>
                <TextField
                    margin="dense"
                    id="type"
                    label="Type"
                    select
                    value={bookNew.Type}
                    onChange={(event) => setBookNew({...bookNew,Type: event.target.value})}
                    
                    style={{width: 200}}
                >
                    { types.map(i=>
                        <MenuItem key={i} value={i}>{i}</MenuItem>
                    )
                    }
                </TextField>
                <Typography variant="h6" style={{marginTop: 15}}>Description:</Typography>
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    value={bookNew.Description}
                    onChange={(event) => setBookNew({...bookNew,Description: event.target.value})}
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
                    value={bookNew.Company}
                    onChange={(event) => setBookNew({...bookNew,Company: event.target.value})}
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>PublishingCompany:</Typography>
                <TextField
                    margin="dense"
                    id="publicer"
                    label="Publishing Company "
                    value={bookNew.PublishingCompany}
                    onChange={(event) => setBookNew({...bookNew,PublishingCompany: event.target.value})}
                    type="text"
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>Stars:</Typography>
                <TextField
                    margin="dense"
                    id="stars"
                    label="Stars"
                    value={bookNew.Star}
                    type="number"
                    error={bookNew.Star<0||bookNew.Star>5}
                    onChange={(event) => setBookNew({...bookNew,Star: event.target.value})}
                    style={{width: 200}}
                >
                </TextField>
                <Typography variant="h6" style={{marginTop: 15}}>Image:</Typography>
                <TextField
                    margin="dense"
                    id="image"
                    label="Image link"
                    value={bookNew.Image}
                    onChange={(event) => setBookNew({...bookNew,Image: event.target.value})}
                    type="text"
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>PDF:</Typography>
                <TextField
                    margin="dense"
                    id="pdf"
                    label="PDF link"
                    value={bookNew.PDF}
                    onChange={(event) => setBookNew({...bookNew,PDF: event.target.value})}
                    type="text"
                    fullWidth
                />
                <Typography variant="h6" style={{marginTop: 15}}>Status:</Typography>
                <TextField
                    margin="dense"
                    id="st"
                    label="Status"
                    value={bookNew.Status}
                    onChange={(event) => setBookNew({...bookNew,Status: event.target.value})}
                    type="text"
                    fullWidth
                />
                </DialogContent>
                <DialogActions style={{marginBottom:20}}>
                <Button onClick={()=> setBookNew(defaultBook)} color="error">Clear Data</Button>
                <LoadingButton onClick={()=>handleAddBook()} variant="contained" loading={loading}>Add Book</LoadingButton>
                </DialogActions>
            </Dialog>
            {/* Delete Book */}
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
