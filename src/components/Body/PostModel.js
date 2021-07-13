import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import {connect} from 'react-redux';
import firebase from 'firebase';
import { postArticleAPI } from '../../actions';
const PostModel = (props) => {
    const [editorText , setEditorText] = useState("");
    const [shareImage , setShareImage] = useState("");
    const [videolink ,  setvideoLink]   =useState("");
    const [assetArea , setAssetArea] = useState("");
    
    const handleChange =(e) => {
    const image = e.target.files[0];
    if (image === '' || image ===undefined ){
       alert('not an image ,  the file is a ${typeof image}') ;
       return;
    }
    setShareImage(image);
};

const switchAssetArea = (area) =>{
    setShareImage("");
    setvideoLink("");
    setAssetArea(area);
};
const postArticle = (e) => {
    console.log("post malone");
    e.preventDefault();
    if (e.target !== e.currentTarget){
        console.log("hello");
        return;
    }
 const payload = {
     image: shareImage,
     video: videolink,
     user : props.user,
     description: editorText,
 };
 console.log(payload);
 props.postArticle(payload);
 reset(e);
};
const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setvideoLink("");
    setAssetArea("");

   props.handleClick(e);
    //console.log(props);
};
    return (
        <>
        { props.showModel === 'open' &&
        <Container>
    <Content>
    <Header>
        <h2> create a post</h2>
        <button onClick = {(e) => reset(e)}>
            {/* <img src="/images/close-icon.svg" alt="" /> */}
            <img src="https://img.icons8.com/windows/24/000000/macos-close.png"/>
            
        </button>
    </Header> 
    <ShareContent>
      <UserInfo>
      {props.user.photoURL ? (
          <img src={props.user.photoURL}/>
      ) : (
          <img src= "images/user.svg" alt="" />
      )}
      <span>{props.user.displayName}</span>
      </UserInfo>  
    <Edaitor>
    <textarea value={editorText} 
    onChange={(e) => setEditorText(e.target.value) }
    placeholder=" waht  do you want talk abot  ?"
    autoFocus={true}
   />
   { assetArea === 'image' ? (
   <UploadImage>
    <input type="file" accept= "images/gif , images/jpeg , images/png" 
     name= "image" 
     id ="file" 
     style = {{display:"none"}}
     onChange = {handleChange}
     />
     <p>
         <label htmlFor= "file">
             Select a image to share
         </label>
     </p>
     {shareImage && <img src={URL.createObjectURL(shareImage)}/>}
     </UploadImage>
    ) : (
     assetArea === "media" && (
   <> 
    <input 
    type="text"
    placeholder="please input the video link"
    value={videolink}
    onChange={(e) => setvideoLink(e.target.value)} 
    />
    {videolink && 
    ( <ReactPlayer width={'100%'} url={videolink} />
    )}
   </>
     )
     )}
   
    </Edaitor>
    </ShareContent>
    <ShareCreation>
    <AttachAssets>
        <AssetButton onClick={() => switchAssetArea('image')}>
            {/* <img src="/iamges/share-image.svg" alt="" /> */}
            <img src="https://img.icons8.com/metro/24/000000/camera.png"/>

        </AssetButton>
        <AssetButton onClick={() => switchAssetArea('media')} >
            {/* <img src="/image/share-video.svg" alt="" /> */}
            <img src="https://img.icons8.com/fluent-systems-filled/24/000000/video.png"/>

        </AssetButton>
    </AttachAssets>
    <ShareComment>
    <AssetButton>
        {/* <img src="/images/share-comment.svg" alt="" /> */}
        <img src="https://img.icons8.com/fluent-systems-filled/24/000000/comments--v1.png"/>
        Anyone
    </AssetButton>
    </ShareComment>
    <PostButton disabled={!editorText ? true : false }
     onClick={(event) => postArticle(event)} >Post</PostButton>
    </ShareCreation>
    </Content>
    </Container>
    }
    </>
    )};

const Container = styled.div `
    position:fixed;
    top: 0;
    left:0;
    right:0;
    bottom:0;
    z-index:9999;
    color:block;
    background-color: rgba (0 , 0 , 0 , 0.8);
    animation: fedeIn 0.3& ;
`;
const Content = styled.div `
    width:100%;
    max-width:552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius :5px;
    position : relative;
    display: flex;
    flex-direction : column;
    top: 32px;
    margin : 0 auto;

`;
 const Header = styled.div `
   display : block;
   padding : 16px 20px;
   border-bottom: 1px solid rgba(0 , 0 , 0, 0.15);
   font-size:16px;
   line-height: 1.5;
   color: rgba(0 ,0 ,0 ,0.6);
   font-weight: 100;
   display: flex;
   justify-content: space-between;
   align-items : center;
   button {
       height:40px;
       width: 40px;
       min-width: auto;
       color: rgba(0,0,0, 0.15);
       svg ,
       img {
           pointer-events: none;
       }
   }

 `;

 const ShareContent = styled.div `
   display : flex;
   flex-direction: column;
   flex-grow: 1;
   overflow: auto;
   vertical-align: baseline;
   background: transparent;
   padding: 8px 12px;

 
 `;
 const UserInfo = styled.div `
  display:flex;
  align-items: center;
  padding : 12px 24px;
  svg , 
  img {
      width: 48px;
      height: 48px;
      background-clip: content-box;
      border: 2px solid transparent;
      border-radius: 50%;
  }
  span {
      font-weight: 600;
      font-height:16px;
      line-height: 1.5px
      margin-left: 5px;
  }
 `;

 const ShareCreation = styled.div `
   display: flex;
   justify-content  : space-between;
   padding: 12px 24px 12px 16px;

 `;

 const AssetButton = styled.button `
    display: flex;
   justify-content  : space-between;
   align-items: center;
   padding: 12px 24px 12px 16px;
   height: 40px;
    min-width: auto;
    color: rgba(0,0,0, 0.5);

 `;
const AttachAssets = styled.div `
  align-items: center;
  display:flex;
  padding-right: 8px;
  &{AssetButton} {
      width: 120px;
      

  }
`;
 const ShareComment= styled.div `
   padding-left : 8px;
   margin-right: auto ;
   border-left: 1px solid rgba( 0,0,0,0.15);
   ${AssetButton} {
       svg {
       margin-right: 5px;
       }
   }
 `;
const PostButton = styled.button `
 min-width : 6px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0)" : "#0a66c2")};
  color:  ${(props) => (props.disabled ? "rgba( 255,255,255)" : "white")};
  &:hover {
      background : ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
  }
`;
const Edaitor = styled.div `
 padding: 12px 24px;
  textarea {
      width: 100%;
      min-height:100%;
      resize: none;
  }
   input {
       width: 100%;
       height: 35px;
       font-size: 16px;
       margin-bottom: 20px;


   }
`;
const UploadImage = styled.div `
    text-align: center;
    img {
        width:100%;
    }
`;
const mapStateToProps = (state) =>{
    return {
        user:state.userState.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps )(PostModel);
