import "./register.css";
import { connect } from "react-redux";
import styled from "styled-components";
import {signInAPI } from "../../actions";
import { Redirect } from "react-router";

const Register = (props) => {
 
  return (
    <div className="login">
      {/* {
        props.user &&
        <Redirect to="/home" />
      } */}
      <div className="loginWrapper">
        <div className="loginLeft">
        <img className="loginLogo" src="/images/logonew.png" width='200' alt="" />
          <h1 className="Heading">Welcome to Blockcation</h1>
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">First Name</label>
                <input type="name" class="form-control" id="inputFirst" placeholder="First Name" />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Last Name</label>
                <input type="LastName" class="form-control" id="inputLastName4" placeholder="Last Name" />
              </div>
              </div>
              <div class="form-group">
              <label for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder="Email" />
            </div>
            
              <div class="form-row">
              <div class="form-group col-md-6">
              <label for="inputPassword4">Password</label>
                <input type="password" class="form-control" id="inputPassword4" placeholder="Password" />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Confirm Password</label>
                <input type="password" class="form-control" id="inputPassword4" placeholder="Confirm Password" />
              </div>
            </div>
            <button type="button" class="btn btn-success">Sign Up</button>
          </form>
          <p>Already have an account?<span><a href="/" style={{color:"#08f740"}}>Sign In</a></span></p>
          <p>By signing up, you are agreeing to our <span> Terms & Conditions</span> and <span>Privacy Policy.</span> </p>
          <div className="SocialIcon">
          <Google onClick={() => props.SignIn()} >
          <img src="https://img.icons8.com/color/48/000000/google-logo.png"/>
          </Google>

          <img src="https://img.icons8.com/fluent/48/000000/facebook-new.png"/>
          <img src="https://img.icons8.com/cute-clipart/48/000000/twitter.png"/>
          <img src="https://img.icons8.com/color/48/000000/linkedin.png"/>
          </div>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <h1>Hi Blocation World,</h1>

            <p> My Self Nmae , And Am a Occupation -------------- </p>

            <h1> SO AND SO (REFRENCE AND DSISCUSS)</h1>
             <a> 
                <img className="loginLogo" src="/images/user.svg" width='20' alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Google = styled.button`
  border-radius: none;
  

 
  }
`;



const mapStateToProps = (state) =>{
  return {
    user:state.userState?.user,
  } ;
};
const mapDispatchToProps = (dispatch) => {
 return {
   SignIn:() => dispatch(signInAPI())
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);