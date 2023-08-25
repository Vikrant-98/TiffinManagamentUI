import React, { Component } from "react";
import "./SignUp.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AuthServices from "../configurations/AuthServices";

const authServices = new AuthServices();

const PasswordRegex = RegExp(
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i
);

export default class SignUp extends Component {
  constructor(props) {
    super();
    this.state = {
      Radiovalue: "Admin",
      FirstName: "",
      LastName: "",
      EmailID: "",
      Password: "",
      ConfirmPassword: "",
      Role: "",
      FirstNameFlag: false,
      LastNameFlag: false,
      EmailIDFlag: false,
      MobileNo: "",
      MobileNoFlag: false,
      PasswordFlag: false,
      ConfirmPasswordFlag: false,
      RoleFlag: false,
      open: false,
      Message: "",
      
    };
  }

  handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
    
  };

  CheckValidity() {
    console.log("Check Validity Calling");
    //Reset Flag
    this.setState({
      FirstNameFlag: false,
      LastNameFlag: false,
      EmailIDFlag: false,
      MobileNoFlag: false,
      PasswordFlag: false,
    });

    if (this.state.FirstName === "") {
      this.setState({ FirstNameFlag: true });
    }
    if (this.state.LastName === "") {
      this.setState({ LastNameFlag: true });
    }

    if (this.state.EmailID === "") {
      this.setState({ EmailIDFlag: true });
    }
    if (this.state.MobileNo === "") {
      this.setState({ MobileNoFlag: true });
    }
    if (this.state.Password === "") {
      this.setState({ PasswordFlag: true });
    }
  }

  handleSubmit = (e) => {
    if (!this.state.PasswordFlag) {
      this.CheckValidity();
     
      if (
        this.state.LastName !== "" &&
        this.state.FirstName !== "" &&
        this.state.Password !== "" 
        
      ) {
        const data = {

        
          "firstName": this.state.FirstName,
          "lastName": this.state.LastName,
          "emailID": this.state.EmailID,
          "aadharNumber": this.state.MobileNo.toString(),
          "password": this.state.Password,
          "role": "Customer"

        };


        authServices
          .SignUp(data)
          .then((data) => {
            console.log("data : ", data);
            if (data.data.status) {

              this.props.history.push("/SignIn");


            } else {
              console.log("Sign Up Failed");
              this.setState({ open: true, Message: data.data.message });
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
    } else {
      this.setState({ open: true, Message: "Please Fill Valid Password" });
    }
  };


  handleChangePassword = (e) => {
    const { name, value } = e.target;
    console.log("Regex Match : ", PasswordRegex.test(value));
    if (!PasswordRegex.test(value)) {
      this.setState({ PasswordFlag: true });
    } else {
      this.setState({ PasswordFlag: false });
    }
    this.setState(
      { [name]: value },
      console.log(
        "Name : ",
        name,
        "Value : ",
        value,
        " PasswordFlag : ",
        this.state.PasswordFlag
      )
    );
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "FirstName") {
      this.setState({
        FirstName: e.target.value,
        FirstNameFlag: false
      })
    }
    if (e.target.name === "LastName") {
      this.setState({
        LastName: e.target.value,
        LastNameFlag: false
      })
    }


    if (e.target.name === "EmailID") {
      this.setState({
        EmailID: e.target.value,
        EmailIDFlag: false
      })
    }
    if (e.target.name === "MobileNo") {
      if(e.target.value.length < 10){
      this.setState({
        MobileNo: e.target.value,
        MobileNoFlag: false
      })}else{
        this.setState({
          MobileNoFlag:true,
          open:true,
          Message:"10 digit mobile number is allowed"
        })
      }
    }

    if (e.target.name === "Role") {
      this.setState({
        Role: e.target.value,
        RoleFlag: false
      })
    }
    this.setState(
      { [name]: value },
      console.log("Name : ", name, "Value : ", value)
    );
  };

  handleRadioChange = (e) => {
    this.setState({ Radiovalue: e.target.value });
  };

  handleSignIn = (e) => {
    this.props.history.push("/SignIn");
  };

  render() {
    console.log("state : ", this.state);
    return (
      <div className="SignUp-Container">
        <div className="SignUp-SubContainer">
          <div className="Title">Food Box Express</div>
          <div className="Header_Container">Registration</div>
          <div className="Body">
            <form className="form">
              <TextField
                className="TextField"
                name="FirstName"
                label="FirstName"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.FirstNameFlag}
                value={this.state.FirstName}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                name="LastName"
                label="LastName"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.LastNameFlag}
                value={this.state.LastName}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                name="EmailID"
                label="EmailID"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.EmailIDFlag}
                value={this.state.EmailID}
                onChange={this.handleChange}
              />
              <TextField
                type="number"
                className="TextField"
                name="MobileNo"
                label="Mobile Number"
                variant="outlined"
                inputProps={{ maxLength: 10 }}
                size="small"
                style={{ margin: 10 }}
                error={this.state.MobileNoFlag}
                value={this.state.MobileNo}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                type="password"
                name="Password"
                label="Password"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.PasswordFlag}
                value={this.state.Password}
                onChange={this.handleChangePassword}
              />
              {this.state.PasswordFlag ? (
                <div className="PassError">
                  Password Must Contain Upper Letter, Lower Letter, Symbol &
                  Number.
                </div>
              ) : (
                <></>
              )}
           
            </form>
          </div>
          <div className="Buttons">
            <Button className="Btn" color="primary" onClick={this.handleSignIn}>
              Sign In
            </Button>
            <Button
              className="Btn"
              variant="contained"
              color="primary"
              onClick={() => this.handleSubmit()}
            >
              Sign Up
            </Button>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={this.state.Message}
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={this.handleClose}>
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
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
