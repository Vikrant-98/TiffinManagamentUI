import React, { Component } from "react";
import "./AdminDashboard.css";
// import GetMenuItem from "../Product/GetMenuItem";
// import GetUserMenus from "../Product/GetUserMenus";
// import ProductServices from "../../services/ProductServices";
import TextField from "@material-ui/core/TextField";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import moment from 'moment';

// import CustomerServices from "../../services/CustomerServices";

import AppBar from "@material-ui/core/AppBar";
import KitchenIcon from '@material-ui/icons/Kitchen';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import ViewListIcon from "@material-ui/icons/ViewList";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import DeleteIcon from "@material-ui/icons/Delete";
import Backdrop from "@material-ui/core/Backdrop";
import Pagination from "@material-ui/lab/Pagination";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Rating from "@material-ui/lab/Rating";

//Table Library
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
// import { authServices } from "../../configurations/Dataservice";
import AuthServices from "../../configurations/AuthServices";



const authServices = new AuthServices();

// const productServices = new ProductServices();
// const customerServices = new CustomerServices();

export default class DeliveryboyDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {


            orderTableData: [],
            updatebtn: true,
            //
            Message: "",
            //
            NumberOfRecordPerPage: 6,
            PageNumber: 0,

            FeedbackPageNumber: 1,
            //
            TotalPages: 0,
            TotalRecords: 0,

            Open: false,
            OpenEdit: false, // Open Editing Booking Model
            OpenLoader: false,
            OpenSnackBar: false,

            OpenHome: true,
            OpenAddProduct: false,
            OpenOrderList: false,
            OpenFeedBack: false,

            Update: false,
            ShowApplicantInfo: false,
            OpenBookModel: false, //Editing Booking Application
            OrderStatusDB: ""
        };
    }

    //
    componentWillMount() {



        this.GetAllOrderDetails(this.state.PageNumber);

    }

    //AddMenuItem GetMenuItem UpdateMenuItem DeleteMenuItem GetCustomerOrderList UpdateOrderStatus

    GetAllOrderDetails = async (CurrentPage) => {
        console.log("Get User Appointments Calling ... ");

        this.setState({ OpenLoader: true });

        authServices
            .AllAdminOrders(CurrentPage, 5)
            .then((data) => {
                console.log("GetUserAppointments Data : ", data);
                // debugger
                if (data.data !== null) {

                    this.setState({
                        orderTableData: data.data,
                        OpenLoader: false,
                    });
                }
            })
            .catch((error) => {
                console.log("GetUserAppointments Error : ", error);
                this.setState({ OpenLoader: false });
            });
    };

    handleDEliverystatus = (orderid,status) => {
        debugger
        this.setState({ OpenLoader: true });

        let res ={
            "orderId": parseInt(orderid),
            "status": status
          }
        authServices
            .DeliveredStatus(res)
            .then((data) => {
                if (data.data !== null) {
                    this.setState({
                        OpenLoader: false,
                        OpenSnackBar: true,
                        Message: data.data.message,

                    });
                    this.GetAllOrderDetails(this.state.PageNumber)


                }
                window.location.reload();
            })
            .catch((error) => {

                this.setState({ OpenLoader: false });
            });
    }
    handleInputChangeDeliveryboy = (e) => {
        let val = e.target.value
        if (e.target.name === "Firstname") {
            this.setState({
                Firstname: e.target.value,
                FirstnameFlag: false
            })
        }
        if (e.target.name === "Lastname") {
            this.setState({
                Lastname: e.target.value,
                LastnameFlag: false
            })
        }
        if (e.target.name === "EmailId") {
            this.setState({
                EmailId: e.target.value,
                EmailIdFlag: false
            })
        }
        if (e.target.name === "Password") {
            this.setState({
                Password: e.target.value,
                PasswordFlag: false
            })
        }
        if (e.target.name === "AdharNo") {
            this.setState({
                AdharNo: e.target.value,
                AdharNoFlag: false
            })
        }
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log("e.target.name", e.target.value))

    }

    CheckValidationDeliveryboy = () => {
        const { Firstname, Lastname, EmailId, Password, AdharNo } = this.state
        console.log("CheckValidation Calling...");


        // this.setState({ EmailIDFlag: false, PasswordFlag: false });

        if (Firstname === "") {
            this.setState({
                FirstnameFlag: true
            })
        }
        if (Lastname === "") {
            this.setState({
                LastnameFlag: true
            })
        }
        if (EmailId === "") {
            this.setState({
                EmailIdFlag: true
            })
        }
        if (Password === "") {
            this.setState({
                PasswordFlag: true
            })
        }
        if (AdharNo === "") {
            this.setState({
                AdharNoFlag: true
            })
        }
    }



    handleSubmitDeliveryboy = (e) => {
        e.preventDefault()
        let valid = this.CheckValidationDeliveryboy()
        if (valid) {
            console.log("successfull edited")
            this.setState({
                Firstname: "",
                Lastname: "",
                EmailId: "",
                Password: "",
                AdharNo: "",
            })
        }

    }



    handleInputChangeTiffin = (e) => {
        let val = e.target.value
        if (e.target.name === "NameTiffin") {
            this.setState({
                NameTiffin: e.target.value,
                NameTiffinFlag: false
            })
        }
        if (e.target.name === "PriceTiffin") {
            this.setState({
                PriceTiffin: e.target.value,
                PriceTiffinFlag: false
            })
        }
        if (e.target.name === "ImageTiffin") {
            this.setState({
                ImageTiffin: e.target.value,
                ImageTiffinFlag: false
            })
        }
        if (e.target.name === "description") {
            this.setState({
                description: e.target.value,
                descriptionFlag: false
            })
        }

        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log("e.target.name", e.target.value))
    }

    handleClose = () => {
        console.log("Handle Close Calling ...");
        this.setState({
            open: false,
            Update: false,
            OpenEdit: false,
            OpenBookModel: false,
        });
    };

    handleSnackBarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ OpenSnackBar: false });
    };



    handlePaging = async (e, value) => {
        let state = this.state;
        console.log("Current Page : ", value);

        this.setState({
            PageNumber: value,
        });

        if (this.state.OpenHome) {
            await this.GetAllOrderDetails(value);
        }
    };



    SignOut = async () => {
        await localStorage.removeItem("Admin_token");
        await localStorage.removeItem("Customer_UserID");
        await localStorage.removeItem("OpenHome");
        await localStorage.removeItem("OpenOrderList");
        await localStorage.removeItem("OpenFeedBack");

        this.props.history.push("/SignIn");
    };



    //

    handleHomeNav = () => {


        this.setState({
            PageNumber: 0,

            OpenUserHome: true,
            DeliveryBoyManagement: false,
            CustomerListManagement: false,
            TiffinManagement: false,
            DeliveryAddressManagement: false,
            OpenCard: false,
        });

        this.GetAllOrderDetails(this.state.PageNumber);
    };

    handleDeliveryBoy = () => {
        this.setState({
            OpenUserHome: false,
            DeliveryBoyManagement: true,
            DeliveryAddressManagement: false,
            CustomerListManagement: false,
            TiffinManagement: false,
            OpenCard: false,
        });
    }

    handleCustomerList = () => {
        this.setState({
            OpenUserHome: false,
            DeliveryBoyManagement: false,
            CustomerListManagement: true,
            TiffinManagement: false,
            DeliveryAddressManagement: false
            // OpenCard: false,
        });
    }

    handleTiffinManangement = () => {
        this.setState({
            OpenUserHome: false,
            DeliveryBoyManagement: false,
            CustomerListManagement: false,
            TiffinManagement: true,
            OpenCard: false,
            DeliveryAddressManagement: false
        });
    }

    handleDeliveryAddressManagement = () => {
        this.setState({
            OpenUserHome: false,
            DeliveryBoyManagement: false,
            CustomerListManagement: false,
            TiffinManagement: false,
            OpenCard: false,
            DeliveryAddressManagement: true
        });
    }
    //
    handleOpenCartNav = () => {
        console.log("Handle Open Cart Nav Calling .....");

        localStorage.setItem("OpenUserHome", false);
        localStorage.setItem("OpenCart", true);

        this.setState({
            PageNumber: 1,
            OpenUserHome: false,
            OpenCard: true,
        });

        this.GetAllCardDetails(this.state.PageNumber);
    };

    //

    handlePluseIcon = () => {
        this.setState({
            tableDataDeliveryBoy: false,
            pluseCreateDataDeliveryBoy: true
        })

    }

    handlePluseIconCustomerList = () => {
        this.setState({
            tableDatCustomerListManagement: false,
            PluseCustomerListManagement: true
        })
    }

    handlePluseIconTiffinManagement = () => {
        this.setState({
            tableDataTiffinManagement: false,
            pluseDataTiffinManagement: true
        })
    }
    handleInputDelveryboy = (e,id) => {
        this.setState({
            OrderStatusDB: e.target.value
        })
        this.handleDEliverystatus(id,e.target.value)

    }
    render() {
        let state = this.state;
        let self = this;

        const { orderTableData, OrderStatusDB } = this.state
        console.log("state : ", state);
        return (
            <div className="AdminDashboard-Container">

                <div className="Sub-Container">
                    <div className="Header">
                        <AppBar position="static" style={{ backgroundColor: "#202020" }}>
                            <Toolbar>
                                <Typography
                                    variant="h6"
                                    style={{
                                        flexGrow: 3,
                                        display: "flex",
                                        padding: "5px 0 0 200px",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    Online Food Delivery &nbsp;
                                    <div style={{ margin: "3px 0 0 0" }}>
                                        <KitchenIcon />
                                    </div>
                                </Typography>
                                <div className="search" style={{ flexGrow: 0.5 }}>
                                    <div className="searchIcon">
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search OrderList"
                                        classes={{
                                            root: "inputRoot",
                                            input: "inputInput",
                                        }}
                                        inputProps={{ "aria-label": "search" }}
                                    />
                                </div>

                                <Button
                                    color="inherit"
                                    onClick={() => {
                                        this.SignOut();
                                    }}
                                >
                                    LogOut
                                </Button>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <div className="Body">
                        <div className="Sub-Body">

                            <div className="SubBody31">
                                <div className="bodyContent" style={{ height: "100%", width: "100%" }}>


                                    <div className="deliveryboybtn mb-4">Order List </div>

                                    <div className="GetUserMenus-SubContainerAdmin ">
                                        <TableContainer component={Paper}>
                                            <Table className="" aria-label="simple table">

                                                <>
                                                    <TableHead></TableHead>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell
                                                                align="center"
                                                                style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                                            >
                                                                ID
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                                            >
                                                                Customer Name
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                                            >
                                                                Image
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                                            >
                                                                Order Name
                                                            </TableCell>


                                                            <TableCell
                                                                align="center"
                                                                style={{ width: 200, fontWeight: 600, fontSize: 15 }}
                                                            >
                                                                Start Date
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                                            >
                                                                End Date
                                                            </TableCell>

                                                            <TableCell
                                                                align="center"
                                                                style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                                            >
                                                                Total Days
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                                            >
                                                                Order Status
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                                            >
                                                                Actions
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                </>
                                                {/* ) : ( */}
                                                <></>
                                                {/* )} */}
                                                <TableBody>
                                                    {orderTableData.length > 0
                                                        ? orderTableData.map((data, index) => {
                                                            var date1 = new Date(data.startDate);
                                                            var date2 = new Date(data.endDate);
                                                            var diffDays = date2.getDate() - date1.getDate();
                                                            return (
                                                                <TableRow >
                                                                    {/* {props.State === "UserHome" ? ( */}
                                                                    <>
                                                                        <TableCell align="center" style={{ width: 200 }}>
                                                                            {data.orderId}
                                                                        </TableCell>
                                                                        <TableCell align="center" style={{ width: 200 }}>
                                                                            {data.firstName}
                                                                        </TableCell>
                                                                        <TableCell align="center" style={{ width: 100 }}>
                                                                            <img className="bannerurl" src={data.imageURL} alt="Girl in a jacket" />
                                                                        </TableCell>
                                                                        <TableCell align="center" style={{ width: 200 }}>
                                                                            {data.tiffinName}
                                                                        </TableCell>

                                                                        <TableCell align="center" style={{ width: 200 }}>
                                                                            {moment(data.startDate).format("DD-MM-YYYY").toString()}

                                                                        </TableCell>
                                                                        <TableCell align="center" style={{ width: 100 }}>
                                                                            {moment(data.endDate).format("DD-MM-YYYY").toString()}


                                                                        </TableCell>

                                                                        <TableCell align="center" style={{ width: 100 }}>
                                                                            {diffDays}
                                                                        </TableCell>

                                                                        <TableCell align="center" style={{ width: 100 }}>
                                                                            {data.orderStatus}
                                                                        </TableCell>
                                                                        <TableCell align="center" style={{ width: 100 }}>

                                                                            <select className="TextFieldmodel"
                                                                                name="deliveryboylist"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                id="deliveryboylist"
                                                                                style={{ margin: 20 }}
                                                                                // error={SportNameFlag}
                                                                                value={OrderStatusDB}
                                                                                onChange={(e) => this.handleInputDelveryboy(e,data.orderId)}
                                                                            >

                                                                                <option value="" disabled selected >Select Status</option>
                                                                                <option value="Picked">Picked</option>
                                                                                <option value="Dispatched">Dispatched</option>
                                                                                <option value="Delivered">Delivered</option>




                                                                            </select>
                                                                            {/* {data.orderStatus === "DELIVERED" ?
                                                                                <button className="DoneBtn" disabled>Done</button>
                                                                                :
                                                                                <button className="Deliveredbtn" onClick={() => this.handleDEliverystatus(data.id)}>Delivered</button>
                                                                            } */}


                                                                        </TableCell>


                                                                    </>
                                                                    {/* ) : ( */}
                                                                    <></>
                                                                    {/* )} */}
                                                                </TableRow>
                                                            );
                                                        })
                                                        : null}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>


                                    </div>




                                    <Pagination
                                        className="Pagination"
                                        count={this.state.TotalPages}
                                        Page={this.state.PageNumber}
                                        onChange={() => this.handlePaging()}
                                        variant="outlined"
                                        shape="rounded"
                                        color="secondary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Backdrop
                    style={{ zIndex: "1", color: "#fff" }}
                    open={this.state.OpenLoader}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={state.OpenSnackBar}
                    autoHideDuration={2000}
                    onClose={this.handleSnackBarClose}
                    message={state.Message}
                    action={
                        <React.Fragment>
                            <Button
                                color="secondary"
                                size="small"
                                onClick={this.handleSnackBarClose}
                            >
                                UNDO
                            </Button>
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={this.handleSnackBarClose}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </div>
        );
    }
}
