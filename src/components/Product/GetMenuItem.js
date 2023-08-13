import React, { useState, useEffect } from "react";
import "./GetProduct.css";
// import ProductServices from "../../services/ProductServices";

import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from "@material-ui/icons/Clear";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import PaymentIcon from "@material-ui/icons/Payment";
import TextField from "@material-ui/core/TextField";

// const productServices = new ProductServices();

export default function GetProduct(props) {
  const [Message, setMessage] = useState("");
  const [OpenSnackBar, setOpenSnackBar] = useState(false);
  const [OpenLoader, setOpenLoader] = useState(false);
  const [PageNumber, setPageNumber] = useState(0);

  const [Data, setData] = useState({
    Update: false,
    Open: false,
    AppointmentID: 0,
    PatientID: 0,
    PatientName: "",
    PatientDescription: "",
    AppointmentDate: "",
    AppointmentStatus: "",
    UserID: "",
    PatientNameFlag: false,
    PatientDescriptionFlag: false,
    AppointmentDateFlag: false,
  });

  useEffect(() => {
    setPageNumber(props.PageNumber);
  }, []);

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleClose = () => {
    setData({ ...Data, Open: false });
  };

  //
  // const RegisterAppointment = async () => {
  //   console.log("Add Menu Patient Calling ... ");

  //   if (
  //     Data.PatientName === "" ||
  //     Data.PatientDescription === "" ||
  //     Data.AppointmentDate === ""
  //   ) {
  //     console.log("Please Fill All Field. Data : ", Data);
  //     alert("Please Enter mandatory Field");
  //     return;
  //   }

  //   let data = {
  //     appointmentDate: Data.AppointmentDate,
  //     patientID: Number(localStorage.getItem("Customer_UserID")),
  //     patientName: Data.PatientName,
  //     patientDescription: Data.PatientDescription,
  //   };
  //   setOpenLoader(true);
  //   productServices
  //     .RegisterAppointment(data)
  //     .then((data) => {
  //       console.log("RegisterAppointment Data : ", data);
  //       // debugger
  //       if (data.data.data === null && props.PageNumber > 1) {
  //         setPageNumber(PageNumber - 1);
  //         props.GetUserAppointments(props.PageNumber);
  //       } else {
  //         setOpenLoader(false);
  //         setOpenSnackBar(true);
  //         setMessage(data.data.message);
  //         props.GetUserAppointments(PageNumber);
  //         setData({
  //           ...Data,
  //           Update: false,
  //           PatientID: 0,
  //           PatientName: "",
  //           PatientDescription: "",
  //           AppointmentDate: "",
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("RegisterAppointment Error : ", error);
  //       setOpenLoader(false);
  //       setOpenSnackBar(true);
  //       setMessage("Something Went Wrong");
  //     });
  // };

  const handleEdit = async (data) => {
    setData({
      ...Data,
      Update: true,
      PatientID: data.patientID,
      PatientName: data.patientName,
      PatientDescription: data.patientDescription,
      AppointmentDate: data.appointmentDate,
      AppointmentID: data.appointmentID,
    });
    setOpenSnackBar(true);
    setMessage("Update Menu Activating");
  };

  // const UpdateAppointment = async () => {
  //   let data = {
  //     appointmentID: Data.AppointmentID,
  //     patientName: Data.PatientName,
  //     patientDescription: Data.PatientDescription,
  //     appointmentDate: Data.AppointmentDate,
  //     patientID: Data.PatientID,
  //   };
  //   //
  //   setOpenLoader(true);
  //   //
  //   productServices
  //     .UpdateAppointment(data)
  //     .then((data) => {
  //       console.log("UpdateAppointment Data : ", data);
  //       // debugger
  //       if (data.data.data === null && props.PageNumber > 1) {
  //         setPageNumber(PageNumber - 1);
  //         props.Patient(props.PageNumber);
  //       } else {
  //         setOpenLoader(false);
  //         setOpenSnackBar(true);
  //         setMessage(data.data.message);
  //         props.GetUserAppointments(PageNumber);
  //         setData({
  //           ...Data,
  //           Update: false,
  //           PatientID: 0,
  //           PatientName: "",
  //           PatientDescription: "",
  //           AppointmentDate: "",
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("UpdateAppointment Error : ", error);
  //       setOpenLoader(false);
  //       setOpenSnackBar(true);
  //       setMessage("Something Went Wrong");
  //       props.GetUserAppointments(PageNumber);
  //     });
  // };

  // const CancelAppointments = async (PatientID) => {
  //   productServices
  //     .CancelAppointments(PatientID)
  //     .then((data) => {
  //       console.log("CancelAppointments Data : ", data);
  //       // debugger
  //       setOpenLoader(false);
  //       setOpenSnackBar(true);
  //       setMessage(data.data.message);
  //       props.GetUserAppointments(PageNumber);
  //     })
  //     .catch((error) => {
  //       console.log("CancelAppointments Error : ", error);
  //       setOpenLoader(false);
  //       setOpenSnackBar(true);
  //       setMessage("Something Went Wrong");
  //       props.GetUserAppointments(PageNumber);
  //     });
  // };

  const handleClearEdit = async () => {
    setData({
      ...Data,
      Update: false,
      PatientName: "",
      PatientDescription: "",
      AppointmentDate: "",
    });
  };

  // const handlePay = async () => {
  //   //
  //   setOpenLoader(true);
  //   //
  //   productServices
  //     .PayBill(Data.AppointmentID)
  //     .then((data) => {
  //       console.log("PayBill Data : ", data);
  //       setData({ ...Data, Open: false });
  //       setOpenLoader(false);
  //       setOpenSnackBar(true);
  //       setMessage(data.data.message);
  //       props.GetUserAppointments(PageNumber);
  //     })
  //     .catch((error) => {
  //       console.log("UpdateAppointment Error : ", error);
  //       setData({ ...Data, Open: false });
  //       setOpenLoader(false);
  //       setOpenSnackBar(true);
  //       setMessage("Something Went Wrong");
  //       props.GetUserAppointments(PageNumber);
  //     });
  // };

  return (
    <div className="GetProduct-Container">
      <div className="GetProduct-SubContainer">
        <div className="GetProduct-SubContainer1">
          <div className="GetProduct-SubContainer11">
            <TableContainer component={Paper}>
              <Table className="" aria-label="simple table">
                <TableHead></TableHead>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                    >
                      Apnt. ID
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: 150, fontWeight: 600, fontSize: 15 }}
                    >
                      PatientName
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: 250, fontWeight: 600, fontSize: 15 }}
                    >
                      Appointment Date Time
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                    >
                      Pay Status
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: 200, fontWeight: 600, fontSize: 15 }}
                    >
                      Setting
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(props.List) && props.List.length > 0
                    ? props.List.map(function (data, index) {
                        return (
                          <TableRow key={index}>
                            <TableCell align="center" style={{ width: 50 }}>
                              {data.appointmentID}
                            </TableCell>
                            <TableCell align="center" style={{ width: 200 }}>
                              {data.patientName}
                            </TableCell>
                            <TableCell align="center" style={{ width: 100 }}>
                              {data.appointmentStatus}
                            </TableCell>
                            <TableCell align="center" style={{ width: 50 }}>
                              {data.appointmentDate}
                            </TableCell>
                            <TableCell align="center" style={{ width: 50 }}>
                              {!data.isPayment ? (
                                <IconButton
                                  color="primary"
                                  component="span"
                                  onClick={(e) => {
                                    setData({
                                      ...Data,
                                      Open: true,
                                      AppointmentID: data.appointmentID,
                                    });
                                  }}
                                >
                                  <PaymentIcon
                                    style={{ color: "black" }}
                                    fontSize="small"
                                  />
                                </IconButton>
                              ) : (
                                <>Paid</>
                              )}
                            </TableCell>
                            <TableCell align="center" style={{ width: 200 }}>
                              <IconButton
                                color="primary"
                                component="span"
                                onClick={() => {
                                  handleEdit(data);
                                }}
                              >
                                <EditIcon
                                  style={{ color: "black" }}
                                  fontSize="small"
                                />
                              </IconButton>
                              <IconButton
                                color="primary"
                                component="span"
                                // onClick={() => {
                                //   CancelAppointments(data.appointmentID);
                                // }}
                              >
                                <DeleteIcon
                                  style={{ color: "black" }}
                                  fontSize="small"
                                />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Pagination
            count={props.TotalPages}
            Page={props.PageNumber}
            onChange={props.handlePaging}
            variant="outlined"
            shape="rounded"
            color="secondary"
          />
        </div>
        <div className="GetProduct-SubContainer2">
          <Paper className="GetProduct-SubContainer-Paper">
            <TextField
              error={Data.PatientNameFlag}
              label="Patient Name"
              variant="outlined"
              size="small"
              style={{ margin: 15, width: "80%" }}
              value={Data.PatientName}
              onChange={(e) => {
                setData({ ...Data, PatientName: e.target.value });
              }}
            />
            <TextField
              error={Data.PatientDescriptionFlag}
              label="Patient Description"
              variant="outlined"
              size="small"
              style={{ margin: 15, width: "80%" }}
              rows={5}
              multiline
              value={Data.PatientDescription}
              onChange={(e) => {
                setData({ ...Data, PatientDescription: e.target.value });
              }}
            />
            <TextField
              error={Data.AppointmentDateFlag}
              // label="Date"
              variant="outlined"
              size="small"
              type="datetime-local"
              style={{ margin: "15px 0 15px 0", width: "80%" }}
              value={Data.AppointmentDate}
              onChange={(e) => {
                setData({ ...Data, AppointmentDate: e.target.value });
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                // onClick={() => {
                //   Data.Update ? UpdateAppointment() : RegisterAppointment();
                // }}
              >
                {Data.Update ? <>Update Appointment</> : <>Book Appointment</>}
              </Button>
              {Data.Update ? (
                <Button
                  style={{ backgroundColor: "black", color: "white" }}
                  onClick={() => {
                    handleClearEdit();
                  }}
                >
                  <ClearIcon style={{ color: "white" }} fontSize="small" />{" "}
                  Clear
                </Button>
              ) : null}
            </div>
          </Paper>
        </div>
      </div>

      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={Data.Open}
        // open={true}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={Data.Open}>
          <div
            style={{
              backgroundColor: "white",
              boxShadow: "5",
              padding: "2px 4px 3px",
              width: "600px",
              height: "350px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontWidth: "600",
                fontSize: "18px",
                fontFamily: "Roboto",
                margin: "20px",
              }}
            >
              Appointment ID : {Data.AppointmentID}
            </div>
            <div
              className=""
              style={{
                fontWidth: "600",
                fontSize: "18px",
                fontFamily: "Roboto",
                margin: "20px",
              }}
            >
              Are You Sure To Pay Bill ?
            </div>
            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                color="primary"
                component="span"
                style={{ margin: "10px 10px 0 0" }}
                // onClick={() => {
                //   handlePay();
                // }}
              >
                Pay
              </Button>
              <Button
                variant="outlined"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleClose}
              >
                Cancle
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>

      <Backdrop style={{ zIndex: "1", color: "#fff" }} open={OpenLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={OpenSnackBar}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
        message={Message}
        action={
          <React.Fragment>
            <Button
              color="secondary"
              size="small"
              onClick={handleSnackBarClose}
            >
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackBarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
