import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {getAllUsers, clearErrors, deleteUser} from "../../actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {

    const navigate = useNavigate();
  
  
    const dispatch = useDispatch();
  
    const alert = useAlert();
  
    const {
        error: deleteError,
        isDeleted,
        message,
    } = useSelector((state) => state.profile);
    const { error, users } = useSelector((state) => state.allUsers);
  
  
    const deleteUserHandler = (id) =>{
      dispatch(deleteUser(id));
    }
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
      if(isDeleted){
        alert.success(message);
        navigate("/admin/users");
        dispatch({type : DELETE_USER_RESET});
      }
  
      dispatch(getAllUsers());
    }, [dispatch, alert, error, navigate, isDeleted,deleteError , message ]);
  
  
  
    const columns = [
      { field: "id", headerName: "User ID", minWidth: 140, flex: 0.7 },
  
      {
        field: "email",
        headerName: "Email",
        minWidth: 100,
        flex: 1,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 130,
        flex: 0.4,
      },
  
      {
        field: "role",
        headerName: "Role",
        type: "number",
        minWidth: 150,
        flex: 0.2,
        cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin"
              ? "greenColor"
              : "redColor";
          },
      },
  
      {
        field: "actions",
        flex: 0.2,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Fragment>
              <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>
  
              <Button onClick={()=>deleteUserHandler(params.getValue(params.id, "id"))}
              >
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
      },
    ];
  
    const rows = [];
  
    users &&
      users.forEach((item) => {
        rows.push({
          id: item._id,
          role: item.role,
          email: item.email,
          name: item.name,
        });
      });
    return <Fragment>
      <MetaData title={`ALL Users - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
  
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
    </div>
  
  
    </Fragment >;
  };
  

export default UsersList;
