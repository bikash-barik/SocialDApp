import React, { useEffect, useState } from 'react'
// import "./Network.css"
import { auth, provider, storage } from '../../../firebase'
import firebase from 'firebase'
import styled from 'styled-components'

import { connect } from "react-redux";


const MassagesPart = (props) => {  return (
    <>
      <Container>
        <Widget>
          <a>
            <div>
              <span><h1>Safak Kocaoglu</h1><br></br>
                Digital Marketing at LinkedIn</span>
            </div>
            <span>...</span>
          </a>
        </Widget>
        <Widget>
          <a>
            <div>
            {/* {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} alt= "" />
                ) : (
                 <img src="/images/user.svg" alt="" width="20px" />)} */}
              <p><h1>Safak Kocaoglu</h1>
                <br></br>
                Hi there, Bikash!
                <br></br>
                Your profile is gaining traction, and people have been looking you up. See who they are with a free month of LinkedIn Premium.
                <br></br>
                A free trial? Sure!
                <br></br>
                No thanks</p>
            </div>
          </a>


        </Widget>
      </Container>
    </>
  )
}
const Container = styled.div`
  grid-area: main;
  text-align: center;
  div {
    button {
      color: green;
      float: right;
    }
  }
`

const FriendList = styled.div`
  div {
    button {
      text-align: left;
    }
  }
`
const Widget = styled.div`
   background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;

  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 12px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }

  svg {
    color: rgba(0, 0, 0, 1);
  }
`;


const mapStateToProps = (state) =>{
  return {
    user:state.userState?.user,
  };
};

export default connect(mapStateToProps) (MassagesPart);