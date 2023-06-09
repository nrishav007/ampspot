import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { useSelector } from "react-redux";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { GET_USER_TRANSACTION, GET_DJ_TRANSACTION } from "../../constant/constants";



function createData(name, amount, transactionId, status) {
  return {
    name,
    amount,
    transactionId,
    status
  };
}
let headCells;

export default function Transactions() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [selected, setSelected] = React.useState([]);
  const [rows, setRows]= React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [transaction, setTransaction] = React.useState([]);
  const { user } = useSelector((state) => state.auth);

  headCells = [
    {
      id: "djName",
      numeric: false,
      disablePadding: false,
      label: user.data.user.userType === "user" ? "DJ NAME" : "USER MAIL",
    },
    {
      id: "amount",
      numeric: false,
      disablePadding: false,
      label: "AMOUNT",
    },
    {
      id: "transaction",
      numeric: false,
      disablePadding: false,
      label: "TRANSACTION ID",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "STATUS",
    }
  ];


  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }


  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }


  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead style={{ backgroundColor: " #F3F4F6" }}>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              // align={headCell.numeric ? "right" : "left"}
              align="left"
              // padding={headCell.disablePadding ? "none" : "normal"}
              padding="normal"
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box
                    component="span"
                    sx={visuallyHidden}
                    style={{ alignContent: "row-reverse" }}
                  >
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  const getTransaction = async (url) => {
    const data = await axios.get(`${url}/${user.data.user._id}`, {
      headers: { Authorization: `Bearer ${user.data.token}` }
    }).then(res => {
      return res.data.data.transaction.map(val => {
        const name = user.data.user.userType === "user" ? val.dj.djName : val.user.email
        return createData(name, val.amount, val.transactionId || '-', val.isSuccess)
      })
    }).
      catch(err => console.log(err))
    setRows(data);
  }



  useEffect(() => {
    const data = user.data.user.userType === "user" ? getTransaction(GET_USER_TRANSACTION) : getTransaction(GET_DJ_TRANSACTION)

  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  //   const handleClick = (event, name) => {
  //     const selectedIndex = selected.indexOf(name);
  //     let newSelected = [];

  //     if (selectedIndex === -1) {
  //       newSelected = newSelected.concat(selected, name);
  //     } else if (selectedIndex === 0) {
  //       newSelected = newSelected.concat(selected.slice(1));
  //     } else if (selectedIndex === selected.length - 1) {
  //       newSelected = newSelected.concat(selected.slice(0, -1));
  //     } else if (selectedIndex > 0) {
  //       newSelected = newSelected.concat(
  //         selected.slice(0, selectedIndex),
  //         selected.slice(selectedIndex + 1)
  //       );
  //     }

  //     setSelected(newSelected);
  //   };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //   const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div className="mx-[41px] max-sm:mx-4 max-2md:mt-[5rem] mt-[2rem] ">
      <h1 className="text-xl mb-4">Transactions</h1>
      {/* <Box sx={{ width: "100%" }}> */}
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  //   const isItemSelected = isSelected(row.name);
                  //   const labelId = `enhanced-table-checkbox-${index}`;
                  //   console.log(row);
                  return (
                    <TableRow
                      hover
                      //   onClick={(event) => handleClick(event, row.name)}
                      //   role="checkbox"
                      //   aria-checked={isItemSelected}
                      //   tabIndex={-1}
                      key={index}
                    //   selected={isItemSelected}
                    >
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.amount}</TableCell>
                      <TableCell align="left">{row.transactionId}</TableCell>
                      <TableCell align="left">{row.status?"APPROVED":"FAILED"}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* </Box> */}
    </div>
  );
}

