import React, { Component } from "react";
import "./AdminDashboard.css";
// import GetMenuItem from "../Product/GetMenuItem";
// import GetUserMenus from "../Product/GetUserMenus";
import AuthServices from "../../configurations/AuthServices";
import TextField from "@material-ui/core/TextField";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import moment from 'moment';
// import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
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



const authServices = new AuthServices();

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

// const productServices = new ProductServices();
// const customerServices = new CustomerServices();


class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModel: false,
      OpenUserHome: true,
      DeliveryBoyManagement: false,
      CustomerListManagement: false,
      TiffinManagement: false,
      DeliveryAddressManagement: false,

      pluseCreateDataDeliveryBoy: false,
      tableDataDeliveryBoy: true,

      tableDatCustomerListManagement: true,
      PluseCustomerListManagement: false,

      tableDataTiffinManagement: true,
      pluseDataTiffinManagement: false,

      FirstnameFlag: false,
      LastnameFlag: false,
      EmailIdFlag: false,
      PasswordFlag: false,
      AdharNoFlag: false,
      Firstname: "",
      Lastname: "",
      EmailId: "",
      Password: "",
      AdharNo: "",
      fdata: new FormData(),
      ImageSelectFlag: false,


      NameTiffinFlag: false,
      PriceTiffinFlag: false,
      ImageTiffinFlag: false,
      descriptionFlag: false,
      SelectAddressFlag: false,

      NameTiffin: "",
      PriceTiffin: "",
      ImageTiffin: "",
      description: "",
      SelectAddress: "",
      choosetype: "",
      Address: "",
      AddressFlag: false,
      EnterArea: "",
      EnterAreaFlag: false,
      EnterPin: "",
      EnterPinFlag: false,




      orderTableData: [],
      deliveryboyTableDate: [],
      CustomerListData: [],
      ActiveUserCustomerList: [],
      CurrentUser: [],
      TiffinData: [],
      AddressData: [],
      forceUpdate: false,
      Message: "",
      //
      NumberOfRecordPerPage: 6,
      PageNumber: 0,

      FeedbackPageNumber: 1,
      deliveryboodby: "",
      boyiddelivery: "",
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
      buttonTiffinChange: true,
      tiffinidSave: 0,
      TableHomeData: true,
      PlusHomeDataCurrent: false,
      deliveryboylist: "",
      Update: false,
      ShowApplicantInfo: false,
      OpenBookModel: false, //Editing Booking Application
    };
  }

  //
  componentWillMount() {
    this.GetAllOrderDetails();
    this.handleAllDeliveryBoy(this.state.PageNumber)
  }

  //AddMenuItem GetMenuItem UpdateMenuItem DeleteMenuItem GetCustomerOrderList UpdateOrderStatus

  GetAllOrderDetails = async () => {
    console.log("Get User Appointments Calling ... ");

    // this.setState({ OpenLoader: true });

    authServices
      .AllAdminOrders()
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
  GetAlladdress = async () => {
    console.log("Get User Appointments Calling ... ");

    // this.setState({ OpenLoader: true });

    authServices
      .GetAlladdress()
      .then((data) => {
        console.log("AddressData Data : ", data);
        // debugger
        if (data.data !== null) {

          this.setState({
            AddressData: data.data,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  };



  GetALlTtffines = () => {

    authServices
      .GETALLTiffins()
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger
        if (data.data !== null) {

          this.setState({
            TiffinData: data.data,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
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

    // if (e.target.name === "choosetype" ) {
    //   this.setState({
    //     fdata: e.target.file[0],

    //   })

    //   document.getElementById("myfile").classList.remove("validation")
    // }

    if (e.target.name === "description") {
      this.setState({
        description: e.target.value,

      })
      document.getElementById("description").classList.remove("validation")

    }
    if (e.target.name === "SelectAddress") {
      this.setState({
        SelectAddress: e.target.value,

      })
      document.getElementById("SelectAddress").classList.remove("validation")
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


  handleInputChange = (e) => {
    if (e.target.name === "Address") {
      this.setState({
        Address: e.target.value,

      })
      document.getElementById("Address").classList.remove("validation")

    }
    if (e.target.name === "EnterArea") {
      this.setState({
        EnterArea: e.target.value,
        EnterAreaFlag: false
      })
    }
    if (e.target.name === "EnterPin") {
      this.setState({
        EnterPin: e.target.value,
        EnterPinFlag: false
      })
    }
  }

  CheckValidationDeliveryAddress = () => {

    const { Address, EnterArea, EnterPin } = this.state
    console.log("CheckValidation Calling...");


    // this.setState({ EmailIDFlag: false, PasswordFlag: false });

    if (EnterArea === "") {
      this.setState({
        EnterAreaFlag: true
      })

    }
    if (EnterPin === "") {
      this.setState({
        EnterPinFlag: true
      })

    }
    if (Address === "") {
      document.getElementById("Address").classList.add("validation")

    }




  }

  handleSubmitDeliveryAddress = (e) => {
    e.preventDefault()
    debugger
    this.CheckValidationDeliveryAddress()
    let data = {
      "address": this.state.Address.toString(),
      "area": this.state.EnterArea.toString().toUpperCase(),
      "pin": this.state.EnterPin.toString()
    }
    authServices
      .SaveAddressAdmin(data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger
        if (data.data !== null) {

          this.setState({
            TiffinData: data.data,
            OpenSnackBar: true,
            Message: data.data.message,
            OpenLoader: false,
            Address: "",
            EnterArea: "",
            EnterPin: ""
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });


  }


  handlePaging = async (e, value) => {
    debugger
    let state = this.state;
    console.log("Current Page : ", value);

    this.setState({
      PageNumber: value,
    });

    if (this.state.OpenHome) {
      await this.GetAllOrderDetails(value);

    }
    if (this.state.DeliveryBoyManagement) {
      await this.handleAllDeliveryBoy(value)
    }
    if (this.state.CustomerListManagement) {
      this.handleCustomerListData(value)
    }
  };

  // setItemTypeRadioValue = async (ID, value) => {
  //   console.log("setItemTypeRadioValue Value : ", value);

  //   if (this.state.OpenHome) {
  //     this.setState({ ItemTypeRadioValue: value });
  //     this.GetMenuItem(1, value);
  //   } else if (this.state.OpenOrderList) {
  //     this.setState({ OrderStatusRadioValue: value });
  //     await this.UpdateOrderStatus(ID, value);
  //   }
  // };

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
    this.handleAllDeliveryBoy(this.state.PageNumber)
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
    this.handleCustomerListData(this.state.PageNumber)
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
    this.GetALlTtffines()
    this.GetAlladdress()
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


  //


  handlePluseIcon = () => {
    this.setState({
      tableDataDeliveryBoy: false,
      pluseCreateDataDeliveryBoy: true
    })

  }

  handlePluseIconCustomerList = (CurrentPage) => {
    this.setState({
      tableDatCustomerListManagement: false,
      PluseCustomerListManagement: true
    })
    authServices
      .ActiveUserCustomerList(CurrentPage, 5)
      .then((data) => {
        console.log("ActiveUserCustomerList : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            ActiveUserCustomerList: data.data.data.content,
            TotalPages: data.data.data.totalPages,
            PageNumber: data.data.data.number,
            OpenLoader: false,
            tableDatCustomerListManagement: false,
            PluseCustomerListManagement: true
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });

  }

  handlePluseIconTiffinManagement = () => {
    this.setState({
      tableDataTiffinManagement: false,
      pluseDataTiffinManagement: true
    })
  }


  handleAllDeliveryBoy = () => {

    authServices
      .DeliveryBoy()
      .then((data) => {
        console.log("deliveryboyTableDate : ", data);
        // debugger
        if (data.data !== null) {

          this.setState({
            deliveryboyTableDate: data.data,
           
            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  handleSubmitDeliveryboy = (e) => {
    e.preventDefault();
    this.CheckValidationDeliveryboy();

    if (
      this.state.LastName !== "" &&
      this.state.FirstName !== "" &&
      this.state.Password !== ""

    ) {
      const data = {
        "firstName": this.state.Firstname,
        "lastName": this.state.Lastname,
        "emailID": this.state.EmailId,
        "aadharNumber": this.state.AdharNo.toString(),
        "password": this.state.Password,
        "role": "Delivery"

      };

      authServices
        .SignUp(data)
        .then((data) => {
          debugger
          console.log("data : ", data);
          if (data) {
            this.setState({

              Firstname: "",
              Lastname: "",
              EmailId: "",
              Password: "",
              AdharNo: "",
              tableDataDeliveryBoy: true,
              pluseCreateDataDeliveryBoy: false,

            })
            this.handleAllDeliveryBoy(this.state.PageNumber)

          } else {
            console.log("Sign Up Failed");
            this.setState({ open: true, Message: data.message });
          }
        })
        .catch((error) => {
          console.log("error : ", error);
          this.setState({ open: true, Message: "Something Went Wrong" });
        });
    } else {
      console.log("Not Acceptable");
      this.setState({ open: true, Message: "Please Fill Required Field" });
    }

  };


  handleCustomerListData = (CurrentPage) => {

    authServices
      .CustomerList()
      .then((data) => {
        console.log("deliveryboyTableDate : ", data);
        // debugger
        if (data.data !== null) {

          this.setState({
            CustomerListData: data.data,
            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  filechangehandler = (e) => {
    console.log("filename", e.target.files)
    this.setState({
      fdata: e.target.files[0],
      forceUpdate: !this.state.forceUpdate
    })

  }

  CheckValidationTiifin = () => {

    debugger
    const { NameTiffin, PriceTiffin, fdata, description, SelectAddress, choosetype } = this.state
    console.log("CheckValidation Calling...");


    // this.setState({ EmailIDFlag: false, PasswordFlag: false });

    if (NameTiffin === "") {
      this.setState({
        NameTiffinFlag: true
      })

    }
    if (PriceTiffin === "") {
      this.setState({
        PriceTiffinFlag: true
      })

    }
    if (description === "") {
      document.getElementById("description").classList.add("validation")

    }
    if (SelectAddress === "") {
      document.getElementById("SelectAddress").classList.add("validation")

    }
    // if ( choosetype === "") {
    //   document.getElementById("myfile").classList.add("validation")
    //   isvalid=false
    // }



  }
  handleSubmitTiffinData = (e) => {
    e.preventDefault()
    debugger;
    const { NameTiffin, PriceTiffin, fdata, description, SelectAddress } = this.state
    this.CheckValidationTiifin()

    let fdataa = new FormData();
    fdataa.append("Image", fdata)
    authServices

      .TiffinInsertData(fdataa,NameTiffin,PriceTiffin,description,SelectAddress)
      .then((data) => {
        console.log("filedata : ", data);
        
        if (data.data !== null) {
          debugger
          this.setState({
            pluseDataTiffinManagement: false,
            tableDataTiffinManagement: true,
            NameTiffin:"",
            PriceTiffin:"",
            description:"",
            SelectAddress:"",
            fdata:new FormData(),
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetALlTtffines()
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });

  }

  handleEditTiffin = (id, planName, bannerUrl, pricePerDay, description) => {
    this.setState({
      NameTiffin: planName,
      description: description,
      PriceTiffin: pricePerDay,
      tableDataTiffinManagement: false,
      pluseDataTiffinManagement: true,
      tiffinidSave: parseInt(id),
      buttonTiffinChange: false
    })

  }
  handledeletetiffin = (id) => {
    authServices

      .DeleteTiffin(id)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data.data !== null) {

          this.setState({
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.data.message
          });
          this.GetALlTtffines()
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  handleSubmitTiffinDataUpdate = (e) => {
    e.preventDefault()

    const { NameTiffin, PriceTiffin, fdata, description, SelectAddress, tiffinidSave } = this.state
    this.CheckValidationTiifin()

    let fdataa = new FormData();

   
    fdataa.append("Image", fdata)
 
    authServices
      .TiffinIUpdateData(fdataa,tiffinidSave,NameTiffin,PriceTiffin,description,SelectAddress)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data.data !== null) {

          this.setState({
            pluseDataTiffinManagement: false,
            tableDataTiffinManagement: true,
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetALlTtffines()
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });

  }
  handlePluseIconHome = (CurrentPage) => {
    this.setState({
      TableHomeData: false,
      PlusHomeDataCurrent: true
    })
    debugger;
    authServices
      .CurrentUserList(CurrentPage, 5)
      .then((data) => {
        console.log("deliveryboyTableDate : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            CurrentUser: data.data.data.content,
            TotalPages: data.data.data.totalPages,
            PageNumber: data.data.data.number,
            OpenLoader: false,
            TableHomeData: false,
            PlusHomeDataCurrent: true
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });


  }
  handlePandingassign = (orderId) => {
    this.setState({ OpenLoader: true })
    authServices
      .AssignPendingstatus(this.state.boyiddelivery, this.state.deliveryboylist)
      .then((data) => {
        console.log("deliveryboyTableDate : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            deliveryboylist: "",
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message,
            openModel: false

          });
          this.GetAllOrderDetails(this.state.PageNumber)
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });

  }
  handleAssignBtn = (boyid) => {
    this.setState({
      openModel: true,
      // deliveryboodby: bookbyid,
      boyiddelivery: boyid
    }, () => console.log("boyiddelivery", this.state.boyiddelivery))
  }
  handleClose = () => {
    this.setState({
      openModel: false
    })

  };
  handleInputDelveryboy = (e) => {
    this.setState({
      deliveryboylist: e.target.value
    }, () => console.log("target", e.target.value))
  }

  getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  render() {

    let state = this.state;
    let self = this;

    const { OpenUserHome, FirstnameFlag, Firstname, LastnameFlag, Lastname, EmailId, EmailIdFlag, Password, choosetype, buttonTiffinChange, TableHomeData, PlusHomeDataCurrent,
      PasswordFlag, AdharNo, AdharNoFlag, orderTableData, deliveryboyTableDate, CustomerListData, ActiveUserCustomerList, CurrentUser,
      OpenSnackBar, Message, tableDatCustomerListManagement, PluseCustomerListManagement, tableDataDeliveryBoy, TiffinData, openModel,
      pluseCreateDataDeliveryBoy, DeliveryBoyManagement, CustomerListManagement, TiffinManagement, DeliveryAddressManagement, deliveryboylist,
      tableDataTiffinManagement, pluseDataTiffinManagement, NameTiffin, NameTiffinFlag, PriceTiffin, PriceTiffinFlag, ImageSelectFlag,
      ImageTiffin, ImageTiffinFlag, description, descriptionFlag, SelectAddress, SelectAddressFlag, AddressData, AddressFlag, Address, EnterArea, EnterAreaFlag, EnterPin, EnterPinFlag } = this.state
    console.log("state : ", state);
    const { classes } = this.props;
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
                  Food Box Express &nbsp;
                  <div style={{ margin: "3px 0 0 0" }}>
                    <KitchenIcon />
                  </div>
                </Typography>
                <div className="search" style={{ flexGrow: 0.5 }}>
                  <div className="searchIcon">
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search"
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
              <div className="SubBody11">
                <div
                  className={OpenUserHome ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleHomeNav();
                  }}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <HomeIcon style={{ color: "white" }} />
                  </IconButton>
                  <div className="NavButtonText">Home</div>
                </div>
                <div
                  className={DeliveryBoyManagement ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleDeliveryBoy();
                  }}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <HomeIcon style={{ color: "white" }} />
                  </IconButton>
                  <div className="NavButtonText">Delivery Boy Management</div>
                </div>
                <div
                  className={CustomerListManagement ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleCustomerList();
                  }}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <HomeIcon style={{ color: "white" }} />
                  </IconButton>
                  <div className="NavButtonText">Customer List</div>
                </div>
                <div
                  className={TiffinManagement ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleTiffinManangement();
                  }}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <HomeIcon style={{ color: "white" }} />
                  </IconButton>
                  <div className="NavButtonText">Tiffin Management</div>
                </div>
                <div
                  className={DeliveryAddressManagement ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleDeliveryAddressManagement();
                  }}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <HomeIcon style={{ color: "white" }} />
                  </IconButton>
                  <div className="NavButtonText">Delivery Address Management</div>
                </div>
              </div>
              <div className="SubBody21">
                <div className="bodyContent" style={{ height: "100%", width: "100%" }}>
                  {OpenUserHome &&
                    <>
                      {/* <div>
                        <TextField
                          type="date"
                          className="textFieldDate"
                          id="OrderDate"
                          name="OrderDate"
                          label="Order Date"
                          placeholder="dd-mm-yyyy"
                          size="small"
                          style={{ margin: 20 }}
                          // error={OrderDateFlag}
                          // value={OrderDate}
                          // onChange={(e) => this.handleInputChangeMyorder(e)}
                          InputLabelProps={{
                            shrink: true,
                          }}

                        />
                      </div> */}

                      {TableHomeData &&
                        <>
                          <div className="deliveryboybtn mb-4">Orders</div>
                          <div className="GetUserMenus-SubContainerAdmin ">
                            <TableContainer component={Paper}>
                              <Table className="" aria-label="simple table">
                                {/* {props.State === "UserHome" ? ( */}
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
                                        style={{ width: 200, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Customer Name
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 200, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Order Name
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 200, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Order Description
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
                                        Order Status
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
                                            <TableCell align="center" style={{ width: 200 }}>
                                              {data.tiffinName}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 200 }}>
                                              {data.tiffinDescription}
                                            </TableCell>

                                            <TableCell align="center" style={{ width: 200 }}>
                                              {moment(data.startDate).format("DD-MM-YYYY").toString()}

                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {moment(data.endDate).format("DD-MM-YYYY").toString()}


                                            </TableCell>
                                            


                                            <TableCell align="center" style={{ width: 100 }}>
                                              {data.orderStatus}
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
                          <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={openModel}
                            onClose={() => this.handleClose()}
                          >
                            <div style={getModalStyle()} className={classes.paper}>
                              <select className="TextFieldmodel"
                                name="deliveryboylist"
                                variant="outlined"
                                size="small"
                                id="deliveryboylist"
                                style={{ margin: 20 }}
                                // error={SportNameFlag}
                                value={deliveryboylist}
                                onChange={(e) => this.handleInputDelveryboy(e)}
                              >

                                <option value="" disabled selected >Select Delivery boy</option>

                                {deliveryboyTableDate?.length > 0
                                  && deliveryboyTableDate?.map((ele, ind) => {
                                    return (
                                      <>
                                        <option key={ind} value={ele.id}>{ele.firstName}</option>
                                      </>
                                    )
                                  })}


                              </select>

                              <div className="btndivmodel">
                                <Button className="Submitmodel" onClick={() => this.handlePandingassign()}>Submit</Button>
                                <Button className="Submitmodel" onClick={() => this.handleClose()}>Cancel</Button></div>

                            </div>
                          </Modal>

                          {/* <Modal
                            hideBackdrop
                            open={openModel}
                            onClose={() => this.handleClose()}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                          >
                            <Box >
                             
                            </Box>
                          </Modal> */}

                        </>


                      }
                      {
                        PlusHomeDataCurrent &&
                        <>

                          <div className="GetUserMenus-SubContainerAdmin">
                            <TableContainer component={Paper}>
                              <Table className="tableDeliveryboy" aria-label="simple table">

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
                                        style={{ width: 200, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Start From
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        End To
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Status Date
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

                                    </TableRow>
                                  </TableHead>
                                </>

                                <TableBody>
                                  {CurrentUser?.length > 0
                                    ? CurrentUser.map((data, index) => {
                                      return (
                                        <TableRow >
                                          {/* {props.State === "UserHome" ? ( */}
                                          <>
                                            <TableCell align="center" style={{ width: 200 }}>
                                              {data.id}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 200 }}>
                                              {moment(data.startFrom).format("DD-MM-YYYY").toString()}

                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {moment(data.endTo).format("DD-MM-YYYY").toString()}


                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {moment(data.statusDate).format("DD-MM-YYYY").toString()}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {data.totalDays}
                                            </TableCell>

                                            <TableCell align="center" style={{ width: 100 }}>
                                              {data.orderStatus}
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
                        </>
                      }

                    </>

                  }
                  {DeliveryBoyManagement &&
                    <>
                      {/* <div className="GetUserMenus-ContainerAdmin"> */}

                      {tableDataDeliveryBoy &&
                        // <div>
                        <>

                          <div className="deliveryboybtn mb-4">Delivery Boy <ControlPointIcon onClick={() => this.handlePluseIcon()} /> </div>
                          <div className="GetUserMenus-SubContainerAdmin">
                            <TableContainer component={Paper}>
                              <Table className="tableDeliveryboy" aria-label="simple table">

                                <>
                                  <TableHead></TableHead>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Id
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Fristname
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 150, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Lastname
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 193, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Email ID
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Adhar Number
                                      </TableCell>

                                    </TableRow>
                                  </TableHead>
                                </>

                                <TableBody>
                                  {deliveryboyTableDate.length > 0
                                    ? deliveryboyTableDate.map((data, index) => {
                                      return (
                                        <TableRow key={index}>

                                          <>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.id}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.firstName}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.lastName}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.emailId}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.aadharNumber}
                                            </TableCell>

                                          </>

                                          {/* )} */}
                                        </TableRow>
                                      );
                                    })
                                    : null}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </>
                        // </div>
                      }


                      {pluseCreateDataDeliveryBoy &&
                        <>
                          <div className="plusContent">
                            <div className="plusContent_sub">
                              <div className="sportstitlePlus">Add Delivery Boy</div>
                              <div>
                                <form className="form">

                                  <TextField
                                    className="TextField1"
                                    name="Firstname"
                                    label="FirstName"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={FirstnameFlag}
                                    value={Firstname}
                                    onChange={(e) => this.handleInputChangeDeliveryboy(e)}
                                  />
                                  <TextField
                                    className="TextField1"
                                    name="Lastname"
                                    label="Lastname"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={LastnameFlag}
                                    value={Lastname}
                                    onChange={(e) => this.handleInputChangeDeliveryboy(e)}
                                  />
                                  <TextField
                                    className="TextField1"
                                    name="EmailId"
                                    label="Email Id"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={EmailIdFlag}
                                    value={EmailId}
                                    onChange={(e) => this.handleInputChangeDeliveryboy(e)}
                                  />
                                  <TextField
                                    type="password"
                                    className="TextField1"
                                    name="Password"
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={PasswordFlag}
                                    value={Password}
                                    onChange={(e) => this.handleInputChangeDeliveryboy(e)}
                                  />
                                  <TextField
                                    type="number"
                                    className="TextField1"
                                    name="AdharNo"
                                    label="Adhar Card Number"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={AdharNoFlag}
                                    value={AdharNo}
                                    onChange={(e) => this.handleInputChangeDeliveryboy(e)}
                                  />

                                  <div className="buttons">
                                    <button className="submitbtn1"
                                      onClick={(e) => this.handleSubmitDeliveryboy(e)}
                                    >Submit</button>
                                    <button className="cancelbhn">Cancel</button>
                                  </div>

                                </form>
                              </div>
                            </div>


                          </div>
                        </>}

                      {/* </div> */}


                      {/* </div> */}
                    </>}

                  {CustomerListManagement &&
                    <>
                      {tableDatCustomerListManagement &&
                        // <div>
                        <>
                          <div className="deliveryboybtn mb-4"> Customers List </div>
                          <div className="GetUserMenus-SubContainerAdmin">
                            <TableContainer component={Paper}>
                              <Table className="tableDeliveryboy" aria-label="simple table">

                                <>
                                  <TableHead></TableHead>
                                  <TableHead>
                                    <TableRow>

                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        First Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 150, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Last Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 193, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Email Id
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Adhar Number
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Role
                                      </TableCell>

                                    </TableRow>
                                  </TableHead>
                                </>

                                <TableBody>
                                  {CustomerListData.length > 0
                                    ? CustomerListData.map((data, index) => {
                                      return (
                                        <TableRow >

                                          <>

                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.firstName}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.lastName}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.emailId}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.aadharNumber}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.role}
                                            </TableCell>

                                          </>

                                          {/* )} */}
                                        </TableRow>
                                      );
                                    })
                                    : null}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </>
                        // </div>
                      }
                      {PluseCustomerListManagement &&
                        <>

                          <div className="GetUserMenus-SubContainerAdmin">
                            <TableContainer component={Paper}>
                              <Table className="tableDeliveryboy" aria-label="simple table">

                                <>
                                  <TableHead></TableHead>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Id
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        First Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 150, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Last Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 193, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Email Id
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Adhar Number
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Role
                                      </TableCell>

                                    </TableRow>
                                  </TableHead>
                                </>

                                <TableBody>
                                  {ActiveUserCustomerList.length > 0
                                    ? ActiveUserCustomerList.map((data, index) => {
                                      return (
                                        <TableRow >

                                          <>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.id}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.firstName}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.lastName}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.email}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.aadharNumber}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.role}
                                            </TableCell>

                                          </>

                                          {/* )} */}
                                        </TableRow>
                                      );
                                    })
                                    : null}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </>


                      }
                    </>}

                  {TiffinManagement &&
                    <>
                      {pluseDataTiffinManagement &&
                        <div className="plusContent">
                          <div className="plusContent_sub">
                            <div className="sportstitlePlus">Add Tiffin</div>
                            <div>
                              <form className="form">

                                <TextField
                                  className="TextField1"
                                  name="NameTiffin"
                                  label="Name"
                                  variant="outlined"
                                  size="small"
                                  style={{ margin: 20 }}
                                  error={NameTiffinFlag}
                                  value={NameTiffin}
                                  onChange={(e) => this.handleInputChangeTiffin(e)}
                                />

                                <TextField
                                  type="number"
                                  className="TextField1"
                                  name="PriceTiffin"
                                  label="Price"
                                  variant="outlined"
                                  size="small"
                                  style={{ margin: 20 }}
                                  error={PriceTiffinFlag}
                                  value={PriceTiffin}
                                  onChange={(e) => this.handleInputChangeTiffin(e)}
                                />
                                <div className="fileImage">
                                  <label for="myfile">Select a Image :</label>
                                  <input className="inputFile" type="file" id="myfile" name="choosetype" value={choosetype} onChange={(e) => this.filechangehandler(e)} />
                                  <label>{this.state.fdata.name}</label></div>
                                {buttonTiffinChange ?
                                  <></> :
                                  <>
                                  
                                 
                                    <div className="text-div">Please Select the Image</div></>}


                                <div className="titleSimple">Enter Description:</div>
                                <textarea
                                  className="TextField3"
                                  name="description"
                                  label="Description"
                                  id="description"
                                  variant="outlined"
                                  size="small"
                                  style={{ margin: 20 }}
                                  error={descriptionFlag}
                                  value={description}
                                  onChange={(e) => this.handleInputChangeTiffin(e)}
                                />
                                <select className="TextField2"
                                  name="SelectAddress"
                                  variant="outlined"
                                  size="small"
                                  id="SelectAddress"
                                  style={{ margin: 20 }}
                                  error={SelectAddressFlag}
                                  value={SelectAddress}
                                  onChange={(e) => this.handleInputChangeTiffin(e)}
                                >

                                  <option value="" disabled selected >Select Address</option>
                                  {AddressData.length > 0 && AddressData.map((ele, ind) => {
                                    return (
                                      <option value={ele.addressId} >{ele.address}{ele.area}{ele.pin}</option>
                                    )
                                  })}
                                </select>


                                <div className="buttons">
                                  {buttonTiffinChange ?
                                    <button className="submitbtn1"
                                      onClick={(e) => this.handleSubmitTiffinData(e)}
                                    >Submit</button> : <button className="submitbtn1"
                                      onClick={(e) => this.handleSubmitTiffinDataUpdate(e)}
                                    >Save</button>}
                                  <button className="cancelbhn">Cancel</button>
                                </div>

                              </form>
                            </div>
                          </div>


                        </div>}
                      {tableDataTiffinManagement &&
                        <>
                          <div className="deliveryboybtn mb-4"> Add Tiffin <ControlPointIcon onClick={() => this.handlePluseIconTiffinManagement()} /> </div>
                          <div className="GetUserMenus-SubContainerAdmin">
                            <TableContainer component={Paper}>
                              <Table className="tableDeliveryboy" aria-label="simple table">

                                <>
                                  <TableHead></TableHead>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Id
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 200, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Plan Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Banner
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Price PerDay
                                      </TableCell>


                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Description
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Actions
                                      </TableCell>

                                    </TableRow>
                                  </TableHead>
                                </>

                                <TableBody>
                                  {TiffinData.length > 0
                                    ? TiffinData.map((data, index) => {
                                      return (
                                        <TableRow >

                                          <>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.id}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.name}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              <img className="bannerurl" src={data.image} alt="Girl in a jacket" />
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.price}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.description}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              <div className="icons">
                                                <CreateIcon style={{ cursor: "pointer" }} onClick={() => this.handleEditTiffin(data.id, data.name, data.image, data.price, data.description)} />
                                                <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledeletetiffin(data.id)} />
                                              </div>

                                            </TableCell>

                                          </>

                                          {/* )} */}
                                        </TableRow>
                                      );
                                    })
                                    : null}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </>}
                    </>
                  }
                  {DeliveryAddressManagement &&
                    <>

                      <div className="plusContent">
                        <div className="plusContent_sub">
                          <div className="sportstitlePlus">Add User Address</div>
                          <div>
                            <form className="form">
                              <div className="titleSimple">Enter Address:</div>
                              <textarea
                                className="TextField3"
                                name="Address"
                                id="Address"
                                label="Number of Players"
                                variant="outlined"
                                size="small"
                                style={{ margin: 20 }}
                                error={AddressFlag}
                                value={Address}
                                onChange={(e) => this.handleInputChange(e)}
                              />
                              <TextField
                                className="TextField1"
                                name="EnterArea"
                                label="Enter Area"
                                variant="outlined"
                                size="small"
                                style={{ margin: 20 }}
                                error={EnterAreaFlag}
                                value={EnterArea}
                                onChange={(e) => this.handleInputChange(e)}
                              />
                              <TextField
                                className="TextField1"
                                name="EnterPin"
                                label="Enter Pin"
                                variant="outlined"
                                size="small"
                                style={{ margin: 20 }}
                                error={EnterPinFlag}
                                value={EnterPin}
                                onChange={(e) => this.handleInputChange(e)}
                              />

                              <div className="buttons">
                                <button className="submitbtn1"
                                  onClick={(e) => this.handleSubmitDeliveryAddress(e)}
                                >Submit</button>
                                <button className="cancelbhn">Cancel</button>
                              </div>

                            </form>
                          </div>
                        </div>


                      </div>
                    </>}
                  {(OpenUserHome || DeliveryBoyManagement || CustomerListManagement) &&
                    <Pagination
                      className="Pagination"
                      count={this.state.TotalPages}
                      Page={this.state.PageNumber}
                      onChange={(e) => this.handlePaging(e, this.state.TotalPages)}
                      variant="outlined"
                      shape="rounded"
                      color="secondary"
                    />}
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

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(AdminDashboard);
