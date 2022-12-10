import React from "react";
import myData from "../static/data.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const TablePage = () => {
  const [data, setdata] = React.useState(myData);
  const [orderBy, setOrderBy] = React.useState("id");
  const anchorRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [bgcolor, setbgcolor] = React.useState(0);
  const columnHeading = [
    { id: "id" },
    { id: "first_name" },
    { id: "last_name" },
    { id: "email" },
    { id: "gender" },
    { id: "ip_address" },
    { id: "airport code" },
    { id: "mobile" },
    { id: "area" },
    // "status",
    // "show",
    // "edit",
  ];
  const handleClick = (e, property) => {
    setOrderBy(property);
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleRequestSort = (order, property) => {
    setAnchorEl(null);
    stableSort(data, getComparator(order, orderBy));
    // console.log(od, property);
  };
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
    // console.log(order, orderBy);
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
    setdata(stabilizedThis.map((el) => el[0]));
  }
  const handleRowClick = (id) => {
    setbgcolor(id);
  };

  const openn = Boolean(anchorEl);
  return (
    <TableContainer style={{ overflowX: "initial" }} component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columnHeading.map((heading) => {
              return (
                <TableCell key={heading.id}>
                  {heading.id}
                  <IconButton
                    ref={anchorRef}
                    aria-label="more"
                    id="long-button"
                    aria-haspopup="true"
                    onClick={(e) => handleClick(e, heading.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={openn}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5,
                        width: "20ch",
                      },
                    }}
                    style={{ boxShadow: "none" }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleRequestSort("asc", heading.id);
                      }}
                    >
                      Sort by ASC
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleRequestSort("desc", heading.id);
                      }}
                    >
                      Sort by DESC
                    </MenuItem>
                  </Menu>
                </TableCell>
              );
            })}
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              onClick={() => handleRowClick(row.id)}
              key={row.id}
              style={{ background: bgcolor === row.id ? "#E9EFF6" : "#fff" }}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.ip_address}</TableCell>
              <TableCell>{row["airport code"]}</TableCell>
              <TableCell>{row.mobile}</TableCell>
              <TableCell>{row.area}</TableCell>
              <TableCell
                style={{ background: row.status ? "#DAF7A6" : "#FAA0A0" }}
              >
                {row.status ? "True" : "Failed"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePage;
