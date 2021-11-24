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
const useStyles = makeStyles({
    container:{
        marginTop: 100,
        width: '100%'
    }
})


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
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
    return (
       <div className={classes.container}>
            BOOK
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
                        <TableCell align="center"><Button variant="contained">Delete</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
       </div>
    )
}

export default Book
