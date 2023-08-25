import React, { Component } from "react";

import "./UserDashBoard.css";
import "../Product/GetUserMenus.css"
import GetUserMenus from "../Product/GetUserMenus";
// import ProductServices from "../../services/ProductServices";
// import CustomerServices from "../../services/CustomerServices";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from 'moment';
import DeleteIcon from "@material-ui/icons/Delete";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@mui/material/Rating';

import Modal from '@mui/material/Modal';
import RestaurantIcon from "@material-ui/icons/Restaurant";

import KitchenIcon from '@material-ui/icons/Kitchen';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import FeedbackIcon from "@material-ui/icons/Feedback";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import AuthServices from "../../configurations/AuthServices";

// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Pagination from "@material-ui/lab/Pagination";

const authServices = new AuthServices();
// const customerServices = new CustomerServices();

export default class UserDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //
      UserDataTable: [],
      ItemTypeRadioValue: "Pending",
      //
      FeedBack: "",
      RatingValue: 1,
      FeedBackFlag: false,
      //
      Message: "",
      //
      NumberOfRecordPerPage: 6,
      //
      PageNumber: 0,
      //
      TotalPages: 0,
      TotalRecords: 0,

      Open: false, // Flag For Open Feedback
      OpenLoader: false,
      OpenSnackBar: false,

      Update: false,

      OpenUserHome: true,
      ADDAddressFlag: false,
      editProfileFlag: false,
      MyOrder: false,
      OpenMyOrder: false,
      Address: "",
      SelectArea: "",
      MyOrderData: [],
      TiffinData: [],

      FirstnameFlag: false,
      LastnameFlag: false,
      EmailIdFlag: false,
      PasswordFlag: false,
      MobileNoFlag: false,
      Firstname: "",
      Lastname: "",
      EmailId: "",
      Password: "",
      MobileNo: "",

      OrderDateFlag: false,
      OrdernameFlag: false,
      OrderPriceFlag: false,
      OrderDate: "",
      Ordername: "",
      OrderPrice: "",

      OrderDetails: true,

      FromDate: "",
      FromDateFlag: false,
      ToDate: "",
      ToDateFlag: false,
      TiifinPanId: "",
      TiifinPanIdFlag: false,
      TotalDays: "",
      TotalDaysFlag: false,
      BookedBy: "",
      BookedByFlag: false,

      paymentPage: true,
      PaymentModeSelect: "",

      AccountNumberFlag: false,
      AccountNumber: "",
      CVV: "",
      CVVFlag: false,
      CustomerName: "",
      CustomerNameFlag: false,

      orderId: "",
      TiffinIDPlan: "",
      addressDetails: [],
      addressAllDetails: [],
      UserAddressetails: "",

      OpenCard: false,
      openModel: false,
      valueRating: 0,
      RatingComment: ""
    };
  }

  componentWillMount() {
    this.GetALlTtffines()

  }

  handleRatingComment = (e) => {
    this.setState({
      RatingComment: e.target.value
    })
  }

  handleInputChange = (e) => {

    if (e.target.name === "Address") {
      this.setState({
        Address: e.target.value
      })
      document.getElementById("Address")?.classList.remove('validation')

    }
    if (e.target.name === "SelectArea") {
      this.setState({
        SelectArea: e.target.value
      })
      document.getElementById("SelectArea")?.classList.remove('validation')

    }
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))
  }

  handleCloseModel = () => {
    debugger
    var x = document.getElementById("Modal_Rating");
    if (x.style.display === "block") {
      x.style.display = "none";
    }
  }
  handleOpen = () => {
    var x = document.getElementById("Modal_Rating");
    if (x.style.display === "none") {
      x.style.display = "block";
    }

  }

  handleSubmitRating = (id) => {
    let res = {
      "tiffinId": parseInt(id),
      "rating": parseInt(this.state.valueRating),
      "review": this.state.RatingComment
    }
    authServices
      .RatingUser(res)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger
        if (data.data !== null) {

          this.setState({
            OpenSnackBar: true,
            Message: data.data.message,
            OpenLoader: false,
          });
          var x = document.getElementById("Modal_Rating");
          if (x.style.display === "block") {
            x.style.display = "none";
          }
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

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

  UserOrderData = () => {

    authServices
      .UserOrderData()
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger  
        if (data.data !== null) {

          this.setState({
            MyOrderData: data.data,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }




  handleClose = () => {
    console.log("Handle Close Calling ...");
    this.setState({
      Open: false,
      Update: false,
      OpenBookModel: false,
      FeedBackFlag: false,
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

    if (state.MyOrder) {
      await this.UserOrderData(value);
    }
  };

  SignOut = async () => {
    await localStorage.removeItem("customer_token");
    await localStorage.removeItem("Admin_UserID");
    await localStorage.removeItem("Customer_UserName");
    await localStorage.removeItem("OpenUserHome");
    this.props.history.push("/SignIn");
  };

  //
  handleOpenHomeNav = () => {


    this.setState({
      OpenUserHome: true,
      ADDAddressFlag: false,
      editProfileFlag: false,
      MyOrder: false,
      OpenCard: false,
    });

    this.GetUserAppointments(this.state.PageNumber);
  };

  handleAddAddress = () => {
    this.setState({
      OpenUserHome: false,
      ADDAddressFlag: true,
      editProfileFlag: false,
      MyOrder: false,
      OpenCard: false,
    });
    this.GetAllAddress()
  }

  handleEditAddress = () => {
    this.setState({
      OpenUserHome: false,
      ADDAddressFlag: false,
      editProfileFlag: true,
      MyOrder: false,
      // OpenCard: false,
    });

  }
  handleMyOrder = () => {
    this.setState({
      OpenUserHome: false,
      ADDAddressFlag: false,
      editProfileFlag: false,
      MyOrder: true,
      OpenCard: false,
    });
    this.UserOrderData(this.state.PageNumber)
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

  isValidHandler = () => {
    let isValid = true;

    if (this.state.Address === "") {
      document.getElementById("Address")?.classList.add('validation')
      isValid = false;
    }
    if (this.state.SelectArea === "") {
      document.getElementById("SelectArea")?.classList.add('validation')
      isValid = false;
    }
    return isValid
  }

  handleSubmitAddress = (e) => {
    e.preventDefault()
    debugger


    this.isValidHandler()
    // let UserId = localStorage.getItem("UserId")
    let data = {

      "address": this.state.Address.toString(),
      "areaId": this.state.SelectArea.toString().toUpperCase(),

    }
    authServices
      .SaveAddressUser(data)
      .then((data) => {
        debugger
        console.log("data : ", data);
        if (data.data.status) {
          this.setState({

            Address: "",
            SelectArea: "",
            OpenSnackBar: true,
            Message: data.data.message

          })


        } else {
          console.log("Sign Up Failed");
          this.setState({ open: true, Message: data.message });
        }
      })
      .catch((error) => {
        console.log("error : ", error);
        this.setState({ open: true, Message: "Something Went Wrong" });
      });

  }


  handleInputChangeEdit = (e) => {
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
    if (e.target.name === "MobileNo") {
      if(e.target.value.length <= 10){
      this.setState({
        MobileNo: e.target.value,
        MobileNoFlag: false
      })}
      else{
        this.setState({
          MobileNoFlag:true,
          open:true,
          Message:"10 digit mobile number is allowed"
        })
      }
    }
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))

  }

  CheckValidationEdit = () => {
    const { Firstname, Lastname, EmailId, Password, MobileNo } = this.state
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
    if (MobileNo === "") {
      this.setState({
        MobileNoFlag: true
      })
    }
  }

  handleRating = (e) => {
    console.log("rating", e.target.value);
    this.setState({
      valueRating: e.target.value
    })
  }


  handleSubmitEdit = (e) => {
    let UserId = localStorage.getItem("UserId")
    debugger
    e.preventDefault()
    this.CheckValidationEdit()



    if (
      this.state.LastName !== "" &&
      this.state.FirstName !== "" &&
      this.state.Password !== ""

    ) {
      const data = {
        "firstName": this.state.Firstname,
        "lastName": this.state.Lastname,
        // "emailID": localStorage.getItem("Email"),
        "aadharNumber": this.state.MobileNo.toString(),
        "password": this.state.Password,
        "role": "Customer"

      };

      authServices
        .USerEditProfile(data)
        .then((data) => {
          
          console.log("data : ", data);
          if (data.data) {
            this.setState({
              Firstname: "",
              Lastname: "",
              EmailId: "",
              Password: "",
              MobileNo: "",
              OpenSnackBar: true,
              Message: data.data.message

            })


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


  }



  CheckValidationMyOrder = () => {
    const { Ordername, OrderDate, OrderPrice } = this.state
    if (Ordername === "") {
      this.setState({
        OrdernameFlag: true
      })
    }
    if (OrderDate === "") {
      this.setState({
        OrderDateFlag: true
      })
    }
    if (OrderPrice === "") {
      this.setState({
        OrderPriceFlag: true
      })
    }

  }
  handleInputChangeMyorder = (e) => {

    let val = e.target.value
    if (e.target.name === "Ordername") {
      this.setState({
        Ordername: e.target.value,
        OrdernameFlag: false
      })
    }
    if (e.target.name === "OrderDate") {
      this.setState({
        OrderDate: e.target.value,
        OrderDateFlag: false
      })

    }
    if (e.target.name === "OrderPrice") {
      this.setState({
        OrderPrice: e.target.value,
        OrderPriceFlag: false
      })
    }
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))
  }




  handleOrderDetailsPage = (e) => {
    const { FromDate, ToDate, TotalDays, BookedBy, TotalDaysFlag, BookedByFlag, ToDateFlag, FromDateFlag } = this.state;
    if (e.target.name === "FromDate") {
      this.setState({
        FromDate: e.target.value,
        FromDateFlag: false
      })
    }
    if (e.target.name === "ToDate") {
      this.setState({
        ToDate: e.target.value,
        ToDateFlag: false

      })
    }
    if (e.target.name === "TiifinPanId") {
      this.setState({
        TiifinPanId: e.target.value,
        TiifinPanIdFlag: false

      })
    }
    if (e.target.name === "TotalDays") {
      this.setState({
        TotalDays: e.target.value,
        TotalDaysFlag: false
      })
    }
    if (e.target.name === "BookedBy") {
      this.setState({
        BookedBy: e.target.value,
        BookedByFlag: false
      })
    }
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))





  }
  CheckValidationOrderDetails = () => {
    const { FromDate, ToDate, TotalDays, BookedBy, TiifinPanId, TotalDaysFlag, BookedByFlag, ToDateFlag, FromDateFlag } = this.state;
    if (FromDate === "") {
      this.setState({
        FromDateFlag: true
      })
    }
    if (ToDate === "") {
      this.setState({
        ToDateFlag: true
      })
    }


    if (TotalDays === "") {
      this.setState({
        TotalDaysFlag: true
      })
    }
    // if (BookedBy === "") {
    //   this.setState({
    //     BookedByFlag: true
    //   })
    // }

  }

  handleSubmitDetails = (e) => {

    e.preventDefault();
    var date1 = new Date(this.state.FromDate);
    var date2 = new Date(this.state.ToDate);
    var diffDays = date2.getDate() - date1.getDate();
    this.setState({
      TotalDays: diffDays
    })
    console.log("diddfff", diffDays)
    let data = {
      "tiffinId": parseInt(this.state.TiffinIDPlan),
      "addressId": parseInt(this.state.UserAddressetails),
      "startDate": moment(this.state.FromDate).format("YYYY-MM-DD").toString(),
      "endDate": moment(this.state.ToDate).format("YYYY-MM-DD").toString(),
      "paymentMode": this.state.PaymentModeSelect
    }
    this.setState({ OpenLoader: true })
    authServices
      .SaveOrders(data)
      .then((data) => {

        this.setState({

          FromDate: "",
          tiffinPlan: "",
          ToDate: "",
          TotalDays: "",
          BookedBy: "",
          PaymentModeSelect: "",
          OpenLoader: false,
          OpenSnackBar: true,
          Message: data.data.message,
          OrderDetails: true

        })
        this.GetALlTtffines();

      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });



  }


  handleSubmitDetailsNext = (e) => {
    debugger
    e.preventDefault();
    let valid = this.CheckValidationOrderDetails()
    if (this.state.FromDate !== "" && this.state.ToDate !== "" && this.state.UserAddressetails !== "") {
      this.setState({
        paymentPage: false,
      })
    }
  }

  handleShowDetails = (id) => {
    this.setState({
      OrderDetails: false,
      TiffinIDPlan: id
    })
    this.GetAllAddressByUserId()

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

  handleInputChangePayment = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.namepayment", e.target.value))
  }


  GetAllAddressByUserId = () => {
    authServices

      .GetAllAddressByUserId()
      .then((data) => {
        console.log("filedata : ", data);

        if (data.data !== null) {

          this.setState({
            addressDetails: data.data,
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
  GetAllAddress = () => {
    authServices

      .GetAllAddress()
      .then((data) => {
        console.log("filedata : ", data);

        if (data.data !== null) {

          this.setState({
            addressAllDetails: data.data,
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });

        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }
  render() {

    const { FirstnameFlag, Firstname, LastnameFlag, Lastname, EmailId, EmailIdFlag, Password, addressDetails, addressAllDetails, UserAddressetails,
      PasswordFlag, MobileNo, MobileNoFlag, Address, SelectArea, OpenUserHome, TiffinData, MyOrderData,
      OpenSnackBar, Message, ADDAddressFlag, editProfileFlag, MyOrder, OrderDate,
      OrderDateFlag, OrderPrice, OrderPriceFlag, Ordername, OrdernameFlag, OrderDetails,
      FromDate, FromDateFlag, ToDate, ToDateFlag, TotalDays, TotalDaysFlag, BookedBy, BookedByFlag, TiifinPanIdFlag, TiifinPanId
      , paymentPage, PaymentModeSelect, UserDataTable, AccountNumberFlag, AccountNumber, CVV, CVVFlag, CustomerName, CustomerNameFlag } = this.state
    return (
      <div className="UserDashBoard-Container">
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
                  Food Box Express&nbsp;
                  <div style={{ margin: "3px 0 0 0" }}>
                    <KitchenIcon />
                  </div>
                </Typography>
              
                {/* <Button
                  variant="outlined"
                  style={{
                    color: "white",
                    margin: "0 50px",
                  }}
                  onClick={() => {
                    this.handleFeedOpen();
                  }}
                >
                  Feedback &nbsp;
                  <FeedbackIcon />
                </Button> */}
                <Button
                  // style={{ flexGrow: 1 }}
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
                    this.handleOpenHomeNav();
                  }}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <HomeIcon style={{ color: "white" }} />
                  </IconButton>
                  <div className="NavButtonText">Home </div>
                </div>
                <div
                  className={ADDAddressFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleAddAddress();
                  }}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <HomeIcon style={{ color: "white" }} />
                  </IconButton>
                  <div className="NavButtonText">Add Address</div>
                </div>
                <div
                  className={editProfileFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleEditAddress();
                  }}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <HomeIcon style={{ color: "white" }} />
                  </IconButton>
                  <div className="NavButtonText">Edit Profile</div>
                </div>
                <div
                  className={MyOrder ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleMyOrder();
                  }}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <HomeIcon style={{ color: "white" }} />
                  </IconButton>
                  <div className="NavButtonText">My Orders</div>
                </div>

              </div>
              <div className="SubBody22">
                <div className="bodyContent" style={{ height: "100%", width: "100%" }}>
                  {OpenUserHome &&
                    <>

                      {OrderDetails ?
                        <>
                          <div className="GetUserMenus-SubContainerAdmin">
                            <TableContainer component={Paper}>
                              <Table className="tableDeliveryboy" aria-label="simple table">

                                <>
                                  <TableHead></TableHead>
                                  <TableHead>
                                    <TableRow>
                                      {/* <TableCell
                                        align="Left"
                                        style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Id
                                      </TableCell> */}
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
                                        Customer Reviews 
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Customer Ratings 
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
                                  {TiffinData?.length > 0
                                    ? TiffinData.map((data, index) => {
                                      return (
                                        <TableRow >

                                          <>
                                            {/* <TableCell align="Left" style={{ width: 200 }}>
                                              {data.id}
                                            </TableCell> */}
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
                                              {data.review }
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.rating }
                                            </TableCell>
                                           
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              <div className="icons">
                                                <Button className="showDetialsbtn" size="small" onClick={() => this.handleShowDetails(data.id)}>Order</Button>
                                                {/* <CreateIcon style={{ cursor: "pointer" }} onClick={()=>this.handleEditTiffin(data.id,data.planName,data.bannerUrl,data.pricePerDay,data.description)} /> */}
                                                {/* <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledeletetiffin(data.id)} /> */}
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


                          {/* <div className="HomePageContainer">
                            <div className="SubContainer">
                              <div className="titleOrder"> Order Details</div>
                              <div className="btndiv"><button className="showDetialsbtn" >Show Details</button></div>
                            </div>

                          </div> */}
                        </>
                        :
                        <>
                          {paymentPage ?
                            <div className="plusContent">
                              <div className="plusContent_sub">
                                <div className="sportstitlePlus">Order Details</div>
                                <div>
                                  <form className="form">

                                    <TextField
                                      id="FromDate"
                                      label="Select From Date"
                                      type="date"
                                      name="FromDate"
                                      error={FromDateFlag}
                                      value={FromDate}
                                      min={new Date()}
                                      // defaultValue="2017-05-24"
                                      className="textFieldDate"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      onChange={(e) => this.handleOrderDetailsPage(e)}
                                    />

                                    <TextField
                                      id="ToDate"
                                      label="Select To Date"
                                      type="date"
                                      name="ToDate"
                                      error={ToDateFlag}
                                      value={ToDate}
                                      defaultValue="2017-05-24"
                                      className="textFieldDate"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      onChange={(e) => this.handleOrderDetailsPage(e)}
                                    />
                                    {/* <TextField
                                      type="number"
                                      className="TextField1"
                                      name="TotalDays"
                                      label="Total Days"
                                      variant="outlined"
                                      size="small"
                                      style={{ margin: 20 }}
                                      error={TotalDaysFlag}
                                      value={TotalDays}
                                      onChange={(e) => this.handleOrderDetailsPage(e)}
                                    /> */}

                                    <select class="select_address" value={UserAddressetails} name="UserAddressetails" onChange={(e) => this.handleInputChange(e)}>
                                      <option selected>Select Address </option>
                                      {addressDetails.map((ele, ind) => {
                                        return (
                                          <option value={ele.addressId}>{ele.userAddress}{ele.address},{ele.area},{ele.pin}</option>
                                        )

                                      })}


                                    </select>


                                    <div className="buttons">
                                      <button className="submitbtn1"
                                        onClick={(e) => this.handleSubmitDetailsNext(e)}
                                      >Submit</button>
                                      <button className="cancelbhn">Cancel</button>
                                    </div>

                                  </form>
                                </div>
                              </div>


                            </div> : <>
                              <div className="plusContent">
                                <div className="plusContent_subPayment">
                                  <div className="sportstitlePlus">Payment Details</div>
                                  <div>
                                    <form className="form">
                                      <select className="TextField2"
                                        name="PaymentModeSelect"
                                        variant="outlined"
                                        size="small"
                                        id="PaymentModeSelect"
                                        style={{ margin: 20 }}
                                        // error={SportNameFlag}
                                        value={PaymentModeSelect}
                                        onChange={(e) => this.handleInputChangePayment(e)}
                                      >

                                        <option value="" disabled selected >Select Payment Mode</option>
                                        <option value="Debit"  >Debit</option>
                                        <option value="Credit"  >Credit</option>
                                        <option value="UPI"  >UPI</option>
                                        <option value="NetBanking"  >NetBanking</option>
                                        <option value="COD"  >COD</option>


                                        {/* {Array.isArray(props.Listsport) && props.List.length > 0
                                                && props.Listsport.map(function (ele, ind) {
                                                    return (
                                                        <>
                                                            <option key={ind} value={ele.sportsName}>{ele.sportsName}</option>
                                                        </>
                                                    )
                                                })} */}


                                      </select>

                                      <div className="buttons">
                                        <button className="submitbtn1"
                                          onClick={(e) => this.handleSubmitDetails(e)}
                                        >Submit</button>
                                        <button className="cancelbhn">Cancel</button>
                                      </div>

                                    </form>
                                  </div>
                                </div>


                              </div></>}
                        </>
                      }
                    </>

                  }

                  {ADDAddressFlag &&
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
                                // error={NoPlayersFlag}
                                value={Address}
                                onChange={(e) => this.handleInputChange(e)}
                              />
                              <select className="TextField2"
                                name="SelectArea"
                                variant="outlined"
                                size="small"
                                id="SelectArea"
                                style={{ margin: 20 }}
                                // error={SportNameFlag}
                                value={SelectArea}
                                onChange={(e) => this.handleInputChange(e)}
                              >

                                <option value="" disabled selected >Select Area</option>

                                {addressAllDetails.map((ele, ind) => {
                                  return (
                                    <option value={ele.addressId}>{ele.address},{ele.area},{ele.pin}</option>
                                  )

                                })}

                                {/* {Array.isArray(props.Listsport) && props.List.length > 0
                                                && props.Listsport.map(function (ele, ind) {
                                                    return (
                                                        <>
                                                            <option key={ind} value={ele.sportsName}>{ele.sportsName}</option>
                                                        </>
                                                    )
                                                })} */}


                              </select>

                              <div className="buttons">
                                <button className="submitbtn1"
                                  onClick={(e) => this.handleSubmitAddress(e)}
                                >Submit</button>
                                <button className="cancelbhn">Cancel</button>
                              </div>

                            </form>
                          </div>
                        </div>


                      </div>
                    </>}

                  {editProfileFlag &&
                    <>
                      <div className="plusContent">
                        <div className="plusContent_sub">
                          <div className="sportstitlePlus">Edit User Address</div>
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
                                onChange={(e) => this.handleInputChangeEdit(e)}
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
                                onChange={(e) => this.handleInputChangeEdit(e)}
                              />
                              <TextField
                                className="TextField1"
                                name="EmailId"
                                label="Email Id"
                                variant="outlined"
                                size="small"
                                style={{ margin: 20 }}
                                disabled
                                value={localStorage.getItem("Email")}

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
                                onChange={(e) => this.handleInputChangeEdit(e)}
                              />
                              <TextField
                                type="number"
                                className="TextField1"
                                name="MobileNo"
                                label="Mobile Number"
                                variant="outlined"
                                size="small"
                                style={{ margin: 20 }}
                                error={MobileNoFlag}
                                value={MobileNo}
                                onChange={(e) => this.handleInputChangeEdit(e)}
                              />

                              <div className="buttons">
                                <button className="submitbtn1"
                                  onClick={(e) => this.handleSubmitEdit(e)}
                                >Submit</button>
                                <button className="cancelbhn">Cancel</button>
                              </div>

                            </form>
                          </div>
                        </div>


                      </div>
                    </>}

                  {MyOrder &&
                    <>


                      <div className="GetUserMenus-SubContainer mt-3">
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
                                    Order ID
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
                                    Order  Description
                                  </TableCell>

                                  <TableCell
                                    align="center"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Order image
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
                                    Start Date
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                  >
                                    End Date
                                  </TableCell>

                                  <TableCell
                                    align="center"
                                    style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Customer Name
                                  </TableCell>


                                  <TableCell
                                    align="center"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Total Price
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Order status
                                  </TableCell>

                                  <TableCell
                                    align="center"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Review
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                            </>
                            {/* ) : ( */}
                            <></>
                            {/* )} */}
                            <TableBody>
                              {MyOrderData.length > 0
                                ? MyOrderData.map((data, index) => {
                                  return (
                                    <TableRow >
                                      {/* {props.State === "UserHome" ? ( */}
                                      <>
                                        <TableCell align="center" style={{ width: 200 }}>
                                          {data.orderId}
                                        </TableCell>

                                        <TableCell align="center" style={{ width: 200 }}>
                                          {data.tiffinName}
                                        </TableCell>
                                        <TableCell align="center" style={{ width: 200 }}>
                                          {data.tiffinDescription}
                                        </TableCell>
                                        <TableCell align="center" style={{ width: 100 }}>
                                          <img className="bannerurl" src={data.imageURL} alt="Girl in a jacket" />
                                        </TableCell>
                                        <TableCell align="center" style={{ width: 100 }}>
                                          {data.totalDays}
                                        </TableCell>
                                        <TableCell align="center" style={{ width: 100 }}>
                                          {moment(data.startDate).format("DD-MM-YYYY").toString()}

                                        </TableCell>
                                        <TableCell align="center" style={{ width: 100 }}>
                                          {moment(data.endDate).format("DD-MM-YYYY").toString()}

                                        </TableCell>
                                        <TableCell align="center" style={{ width: 100 }}>
                                          {data.firstName}
                                        </TableCell>

                                        <TableCell align="center" style={{ width: 100 }}>
                                          {data.price}
                                        </TableCell>

                                        <TableCell align="center" style={{ width: 100 }}>
                                          {data.orderStatus }
                                        </TableCell>

                                        <TableCell align="center" style={{ width: 100 }}>
                                          <StarBorderIcon onClick={() => this.handleOpen()} />
                                        </TableCell>
                                        <div className="Modal_Rating" id="Modal_Rating" style={{ display: "none" }}>
                                          <h1>Rating</h1>
                                          <div>
                                            <Rating
                                              className="RatingStar"
                                              name="simple-controlled"
                                              value={this.state.valueRating}
                                              onChange={(event) => {
                                                this.handleRating(event)
                                              }}
                                            /></div>
                                          <div>
                                            <textarea
                                              className="RatingComment"
                                              value={this.state.RatingComment}
                                              onChange={(event) => {
                                                this.handleRatingComment(event)
                                              }}
                                            />
                                          </div>

                                          <div className="RatingBtndiv">
                                            <button className="CancelRating" onClick={() => this.handleCloseModel()}>Cancel</button>
                                            <button className="SubmitRating" onClick={() => this.handleSubmitRating(data.tiffinId)}>Submit</button>
                                          </div>

                                        </div>

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


                      {/* <Pagination
                        className="Pagination"
                        count={this.state.TotalPages}
                        Page={this.state.PageNumber}
                        onChange={(e) => this.handlePaging(e, this.state.TotalPages)}
                        variant="outlined"
                        shape="rounded"
                        color="secondary"
                      /> */}
                    </>
                  }

                </div>



              </div>
            </div>
          </div>

          <div className="FooterDiv">Footer</div>
        </div>
        <Backdrop
          style={{ zIndex: "1", color: "#fff" }}
          open={this.state.OpenLoader}
          onClick={() => {
            this.setState({ OpenLoader: false });
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={OpenSnackBar}
          autoHideDuration={2000}
          onClose={this.handleSnackBarClose}
          message={Message}
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
