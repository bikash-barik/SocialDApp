import styled from "styled-components";
import Header from "../../components/Header/Header";
import Network from "../../components/Body/Connection/Network";
import Sidebar from "../../components/LeftSide/Sidebar";
import { Redirect } from "react-router-dom";
import {connect} from "react-redux";

const Connection = (props) => {
  return (
    <Container>
    {/* {!props.user && <Redirect to="/" />} */}

      <Layout>
        <Header />
        <Sidebar />
        <Network />
      </Layout>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 52px;
  @media (min-width: 1290px) {
    margin-left:210px;
    max-width: 1128px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 8fr) minmax(0, 25fr);
  column-gap: 25px;
  row-gap: 25px;
  /* grid-template-row: auto; */
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;


const mapStateToProps = (state) => {
  return {
     user:state.userState?.user,
  };
};
export default  connect(mapStateToProps)(Connection);
