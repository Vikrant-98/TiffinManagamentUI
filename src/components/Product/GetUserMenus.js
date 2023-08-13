import React, { useState, useEffect } from "react";
import "./GetUserMenus.css";
// import CustomerServices from "../../services/CustomerServices";

import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import PaymentIcon from "@material-ui/icons/Payment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";

// const customerServices = new CustomerServices();

export default function GetUserMenus(props) {
  const [Message, setMessage] = useState("");
  const [OpenSnackBar, setOpenSnackBar] = useState(false);
  const [OpenLoader, setOpenLoader] = useState(false);
  const [PageNumber, setPageNumber] = useState(0);
  const [OpenModel, setOpenModel] = useState(false);
  const [OrderID, setOrderID] = useState(0);

  useEffect(() => {
    setPageNumber(props.PageNumber);
  }, []);

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  // const handleOrderItem = (CartID) => {
  //   let data = {
  //     cartID: CartID,
  //   };

  //   setOpenLoader(true);
  //   customerServices
  //     .OrderItem(data)
  //     .then((data) => {
  //       console.log("Add To Cart Data : ", data);
  //       setOpenLoader(false);
  //       setOpenSnackBar(true);
  //       setMessage(data.data.message);
  //       props.GetAllCardDetails(PageNumber);
  //     })
  //     .catch((error) => {
  //       console.log("Add To Cart Error : ", error);
  //       setOpenLoader(false);
  //       setOpenSnackBar(true);
  //       setMessage("Something Went Wrong");
  //       props.GetAllCardDetails(PageNumber);
  //     });
  // };

  // const handleCancelOrder = (CartID) => {
  //   console.log("handleCancelOrder Calling... Data : ", CartID);
  //   setOpenLoader(true);
  //   customerServices
  //     .CancleOrder(CartID)
  //     .then((data) => {
  //       console.log("Cancle Order Data : ", data);
  //       setOpenLoader(false);
  //       setOpenSnackBar(true);
  //       setMessage(data.data.message);
  //       if (props.State === "AllOrder") {
  //         props.GetAllOrderList(PageNumber);
  //       } else if (props.State === "MyOrder") {
  //         props.GetMyOrderList(PageNumber);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Cancle Order Error : ", error);
  //       setOpenLoader(false);
  //       setOpenSnackBar(true);
  //       setMessage("Something Went Wrong");
  //       if (props.State === "AllOrder") {
  //         props.GetAllOrderList(PageNumber);
  //       } else if (props.State === "MyOrder") {
  //         props.GetMyOrderList(PageNumber);
  //       }
  //     });
  // };

  const OpenPaymentModel = (OrderID) => {
    console.log("OpenPaymentModel Calling...");
    setOrderID(OrderID);
    setOpenModel(true);
  };

  const handleCloseModel = () => {
    console.log("handleCloseModel");
    setOpenModel(false);
  };

  // const handlePaymentGateway = (PaymentType) => {
  //   console.log("Payment Type : ", PaymentType, "Order Id : ", OrderID);
  //   let data = {
  //     orderID: OrderID,
  //     paymentType: PaymentType,
  //   };
  //   setOpenLoader(true);
  //   customerServices
  //     .PaymentGetaway(data)
  //     .then((data) => {
  //       // debugger;
  //       console.log("handlePaymentGateway Data : ", data);
  //       setOpenLoader(false);
  //       setOpenModel(false);
  //       setOpenSnackBar(true);
  //       setMessage(data.data.message);
  //       props.GetMyOrderList(PageNumber);
  //     })
  //     .catch((error) => {
  //       // debugger;
  //       console.log("handlePaymentGateway Error : ", error);
  //       setOpenLoader(false);
  //       setOpenModel(false);
  //       setOpenSnackBar(true);
  //       setMessage("Something Went Wrong");
  //       props.GetMyOrderList(PageNumber);
  //     });
  // };

  return (
    <div className="GetUserMenus-Container">
      <div className="GetUserMenus-SubContainer">
        <TableContainer component={Paper}>
          <Table className="" aria-label="simple table">
            {props.State === "UserHome" ? (
              <>
                <TableHead></TableHead>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                    >
                      Apmt. ID
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: 200, fontWeight: 600, fontSize: 15 }}
                    >
                      Patient Name
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                    >
                      Apmt. Date
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                    >
                      Payment Status
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
              </>
            ) : (
              <></>
            )}
            <TableBody>
              {Array.isArray(props.List) && props.List.length > 0
                ? props.List.map(function (data, index) {
                    return (
                      <TableRow key={index}>
                        {props.State === "UserHome" ? (
                          <>
                            <TableCell align="center" style={{ width: 200 }}>
                              {data.appointmentID}
                            </TableCell>
                            <TableCell align="center" style={{ width: 200 }}>
                              {data.patientName}
                            </TableCell>
                            <TableCell align="center" style={{ width: 100 }}>
                              {data.appointmentDate}
                            </TableCell>
                            <TableCell align="center" style={{ width: 100 }}>
                              {data.isPayment ? <>Paid</> : <>Not Pay</>}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                width: 210,
                                // border: "0.5px solid black",
                              }}
                            >
                              <RadioGroup
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                                name="AppointmentStatus"
                                value={
                                  data.appointmentStatus === "Pending"
                                    ? "Pending"
                                    : "Confirm"
                                }
                                onChange={(e) => {
                                  props.setItemTypeRadioValue(
                                    e.target.value,
                                    data.appointmentID
                                  );
                                }}
                              >
                                <FormControlLabel
                                  value="Pending"
                                  style={{
                                    width: 100,
                                    // border: "0.5px solid black",
                                  }}
                                  control={<Radio />}
                                  label="Pending"
                                />
                                <FormControlLabel
                                  value="Confirm"
                                  style={{
                                    width: 100,
                                    // border: "0.5px solid black",
                                  }}
                                  control={<Radio />}
                                  label="Confirm"
                                />
                              </RadioGroup>
                            </TableCell>
                          </>
                        ) : (
                          <></>
                        )}
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={OpenModel}
          // open={true}
          onClose={() => {
            handleCloseModel();
          }}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={OpenModel}>
            <div
              style={{
                backgroundColor: "white",
                boxShadow: "5",
                padding: "2px 4px 3px",
                width: "500px",
                height: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div
                className="Input-Field"
                style={{
                  width: "100%",
                  margin: "20px 0",
                  fontFamily: "Roboto",
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ margin: "10px", fontSize: 18, color: "red" }}>
                  ORDER ID : {OrderID}
                </div>
                <div>Choose Payment Gateway & Pay</div>
              </div>
              <div style={{ display: "flex" }}>
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{ margin: "10px 0px 0 10px" }}
                 
                >
                  Card
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "10px 0 0 10px" }}
                  // onClick={() => {
                  //   handlePaymentGateway("UPI");
                  // }}
                >
                  UPI
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "10px 0 0 10px" }}
                  // onClick={() => {
                  //   handlePaymentGateway("Cash");
                  // }}
                >
                  Cash
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    margin: "10px 0 0 10px",
                    color: "white",
                    backgroundColor: "black",
                  }}
                  onClick={() => {
                    handleCloseModel();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
      <Pagination
        count={props.TotalPages}
        Page={props.PageNumber}
        onChange={props.handlePaging}
        variant="outlined"
        shape="rounded"
        color="secondary"
      />
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
