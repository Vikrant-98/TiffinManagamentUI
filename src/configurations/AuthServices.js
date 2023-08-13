import AxiosServices from "./AxiosServices";
let baseURL = "https://localhost:7170"
// import Configurations from "../configurations/Configurations";
// import Auth from "../components/Auth";
// import AdminDashboard from "../components/Dashboard/AdminDashboard";
// import UserDashboard from "../components/Dashboard/UserDashBoard";

const axiosServices = new AxiosServices();

const headers = {
  headers: {
    "accept": "text/plain",
    "content-type": "application/json",
    "cache-control": "no-cache",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
const UserId = localStorage.getItem('UserId')

export default class AuthServices {
  SignUp(data) {
    return axiosServices.post(baseURL + "/UserRegistration", data, false);
  }

  SignIn(data) {
    return axiosServices.post(baseURL + "/UserLogin", data, false);
  }


  GetAllAddressByUserId(){
    return axiosServices.Get(baseURL +`/GetAllAddressByUserId`,true,headers);
  }

  GetAllAddress(){
    return axiosServices.Get(baseURL +`/GetAllAddress`,true,headers);
  }

  AllAdminOrders(page,size) {
    return axiosServices.Get(baseURL +`/GetAllOrders`, true,headers);
  }
  
  AllOrders() {
    return axiosServices.Get(baseURL +`/GetAllOrders`, true,headers);
  }



  AllUserDetails(page,size) {
    return axiosServices.Get(baseURL + `api/order/all/user/?page=${page}&size=${size}`,  true,headers);
  }
  SaveOrders(data) {
    return axiosServices.post(baseURL  + `/AddOrdersByUserId`, data, true,headers);
  }
  PaymentSave(data) {
    return axiosServices.post(baseURL + "api/order/payment/save",  data, true,headers);
  }
  GetAlladdress() {
    return axiosServices.Get(baseURL  + `/GetAllAddress`,true,headers);
  }
  SaveAddressUser(data) {
    return axiosServices.post(baseURL + `/AddUserAddress`, data, true,headers);
  }
  SaveAddressAdmin(data) {
    return axiosServices.post(baseURL+ `/AddAddress`, data, true,headers);
  }
  DeliveredStatus(data) {
    return axiosServices.post(baseURL + `/UpdateOrderStatus`, data, true,headers);
  }
  DeliveryBoy() {
    return axiosServices.Get(baseURL  + `/GetRoleBaseDetails?UserType=Delivery`,  true,headers);
  }
  CustomerList() {
    return axiosServices.Get(baseURL  + `/GetActiveUserDetail`, true,headers);
  }
  ActiveUserCustomerList(page,size) {
    return axiosServices.Get(baseURL + `api/user/active-users?page=${page}&size=${size}` , true,headers);
  }
  GETALLTiffins(data) {
    return axiosServices.Get(baseURL + `/GetAllTiffin` , true,headers);
  }
  TiffinIUpdateData(data,tiffinId,name,price,des,tifid) {
    
    return axiosServices.post(baseURL + `/EditTiffin?TiffinId=${tiffinId}&Name=${name}&Price=${price}&Description=${des}&TiffinAddress=${tifid}`, data, true,headers);
  }
  DeleteTiffin(deleteid) {
    return axiosServices.Delete (baseURL + `api/tiffin/delete/${deleteid}`, true,headers);
  }

  TiffinInsertData(data,name,price,des,tifid) {
    return axiosServices.post(baseURL  + `/AddTiffin?Name=${name}&Price=${price}&Description=${des}&TiffinAddress=${tifid}`, data, true,headers);
  }
  CurrentUserList(page,size) {
    return axiosServices.Get(baseURL  + `api/order/all/current?page=${page}&size=${size}`,true,headers);
  }
  AssignPendingstatus(OrderId,deliveryboyid) {
    return axiosServices.Get(baseURL + `api/order/assign/${OrderId}/${deliveryboyid}`, true,headers);
  }
  USerEditProfile(data) {
    return axiosServices.put(baseURL + `/UpdateUser`, data, true,headers);
  }
  UserOrderData() {
    return axiosServices.Get(baseURL + `/GetAllOrdersByUserId`, true,headers);
  }

  RatingUser(data){
    return axiosServices.post(baseURL + `/AddTiffinReview`,data, true,headers);
    
  }
}
