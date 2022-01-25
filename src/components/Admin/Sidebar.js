import React from 'react';
import "./Sidebar.css"
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeItem } from '@material-ui/lab';
import { TreeView } from '@material-ui/lab';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return <div className="sidebar">
    <Link to="/">
        <img src={logo} alt="EShooper" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
    {/* <Link> */}
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ImportExportIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem nodeId="1" label="Products" multiSelect="false">
      <Link to="/admin/products">
      <TreeItem modeId="2" label="All" icon={<PostAddIcon />} />
      </Link>
      <Link to="/admin/product">
      <TreeItem modeId="3" label="Create" icon={<AddIcon />} />
      </Link>
      </TreeItem>
    </TreeView>
    {/* </Link> */}
    <Link to="/admin/orders">
      <p>
        <ListAltIcon />
        Orders
      </p>
    </Link>
    <Link to="/admin/users">
      <p>
        <PeopleIcon />
        Users
      </p>
    </Link>
    <Link to="/admin/reviews">
      <p>
        <RateReviewIcon />
        Reviews
      </p>
    </Link>



  </div>
};

export default Sidebar;
