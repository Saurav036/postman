import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";
import { makeStyles } from "@mui/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const RequestList = ({ allRequests, setFormData }) => {
  const useStyles = makeStyles({
    // logo: {
    //     width: 100,
    //     padding: 5
    // },
    // navbar: {
    //     background: ['#000', '!important'],
    //     position: ['static', '!important'],
    //     height: [50, '!important']
    // },
    tab: {
      marginBottom: 100,
    },
    list: {
      // width:250,
      // paddingLeft:10,
      // paddingTop:50
    },
    "&::hover": {
      border: "1px solid #fff",
      // borderLeft:'#F26B3A solid 3px',
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "-4px 5px 0px 0px",
      width: "100%",
      // height:'50px',
      // marginBottom:12,
      borderBottom: "grey solid 1px",
      // border:'grey solid 1px'
      // borderLeft:'#F26B3A solid 3px'
    },
    type: {
      borderRadius: 5,
      backgroundColor: "orange",
      color: "white",
      border: "#F26B3A solid 1px",
      minWidth: "40px",
      maxWidth: "40px",
      padding: "2px 2px 2px 2px",
      fontSize: 12,
    },
    url: {
      marginTop: 6,
      color: "grey",
      fontSize: 10,
      marginRight: 5,
    },
  });

  // const [reqData, setReqData] = useState(allRequests)
  const [tab, setTab] = useState(0);

  const classes = useStyles();
  const selectRequest = (e, r, i) => {
    console.log(e, r, i);
    let selectedReq =
      allRequests &&
      allRequests.length > 0 &&
      allRequests.find((e) => e.url === r.url && e.type === r.type);
    setFormData(selectedReq);
    setTab(selectedReq);
    localStorage.setItem("current-request", JSON.stringify(selectedReq));
  };

  return (
    // <div className={classes.list}>
    <Box
      sx={{
        flexGrow: 0,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        height: 500,
      }}
    >
      <Button>Add</Button>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tab}
        scrollButtons={false}
        onChange={(d, data) => selectRequest(null, data)}
        aria-label="Vertical tabs example"
        TabIndicatorProps={{
          sx: { backgroundColor: "#F26B3A", height: 100, top: 0 },
        }}
        sx={{ ...classes.list, borderColor: "divider" }}
      >
        {allRequests &&
          allRequests.length > 0 &&
          allRequests.map((r, i) => (
            <Tab
              // onClick={(e) => selectRequest(e, r, i)}
              className={classes.tab}
              value={r}
              label={
                <div className={classes.listItem}>
                  <div>
                    <div className={classes.type}>{r.type.toUpperCase()}</div>
                    <div className={classes.url}>{r.url}</div>
                  </div>
                  <Button>
                    <MdOutlineDelete />
                  </Button>
                </div>
              }
            >
              {/* <div>{r.id}</div> */}
            </Tab>
          ))}
      </Tabs>
    </Box>
  );
};

export default RequestList;
