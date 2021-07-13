import React, { useEffect, useState } from 'react'
import "./Network.css"
import { auth, provider, storage } from '../../../firebase'
import firebase from 'firebase'
import styled from 'styled-components'
const Network = props => {
  const [userName, setUserName] = useState([])

  useEffect(() => {
    const database = firebase.database()
    database.ref('/users').on('value', response => {
      const data = response.val()
      const users = [],
        ids = []
      Object.keys(data).forEach(id => {
        const { name, email, photoURL } = data[id]
        users.push({ id, name, email, photoURL })
        ids.push(id)
      })
      // All users data is stored in the `users` array and all the
      // ids are stored in `ids` array
      setUserName(users)
      console.log(users, ids)
    })
  }, [])
  const SendRequest = key => {
    let notification = {
      sendTo: key,
      SendFrom: firebase.auth().currentUser.key,
      name: firebase.auth().currentUser.displayName,
      photo: firebase.auth().currentUser.photoURL,
      dataTime: new Date().toLocaleString()
    }
  }
  return (
    <>
      <Container>
        <Widget>
          <a>
            <div>
              <span>No pending invitations</span>
            </div>
            <span>Manage</span>
          </a>
        </Widget>
        <Widget>
          <a>
            <div>
              <span>Industry leaders in India you may know</span>
            </div>
            <span>See all</span>
          </a>

          <div className="Cont">

            {userName.length === 0 ? (
              <h1>No friends here</h1>
            ) : (
              userName.map((data, index) => {
                return (
                  <div class="card">
                    <img src={data.photoURL} alt="" />
                    <h1>{data.name} </h1>
                    <p class="title">{data.dataTime}CEO</p>
                    <p>Centurion University</p>
                    <button1>Connect</button1>
                  </div>

                )
              })
            )}
          </div>
        </Widget>
      </Container>
    </>
  )
}
const Container = styled.div`
  grid-area: main;
  max-width: 100%;
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

export default Network
