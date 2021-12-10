import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Popup from '../Popup/Popup';
import Login from '../Login/Login';
import './HomePage.css';
import axios from 'axios';

// Custom Hook
import useTokenRetriver from '../../utils/tokenRetriver';
import useUsernameRetriver from '../../utils/usernameRetriver';

function HomePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(true);
    const [text, setText] = useState();
    const [listOfPosts, setListOfPosts] = useState([]);
    const [listOfUsers, setListOfUsers] = useState([]);
    
    const token = useTokenRetriver();
    const userName = useUsernameRetriver();

    let navigate = useNavigate();

    let state;
    
    const togglePopup = () => {
        if (token) {
          setIsOpen(!isOpen);
        } else {
          setIsLogged(!isLogged);
        }
      }

      useEffect(() => {
        axios.get("http://localhost:8080/api/posts").then((response) => {
          setListOfPosts(response.data);
        });
        axios.get("http://localhost:8080/api/users").then((response) => {
          setListOfUsers(response.data);
        });
      }, []);

      const onSubmit = () => {
        const formData = { "text": text};

        axios.post("http://localhost:8080/api/post", formData, {
          headers: { accessToken: token },
        })
        .then((res) => {window.location.reload(true)})
      }

      const onDelete = (postid) => {
        axios.delete(`http://localhost:8080/api/post/${postid}`, {
          headers: { accessToken: token },
        });
        window.location.reload(true);
    }

      const LikeOrUnlike = (post_id) => {
        if (token) {
          const username = userName;
          const formData = {post_id: post_id, username: username};
          axios.post("http://localhost:8080/api/likes", formData, {
            headers: { accessToken: token },
          })
          .then((response)=> {
            console.log(response.data)
            setListOfPosts(listOfPosts.map((post) => {
              if (post.id === post_id) {
                if (response.data.liked) {
                  return { ...post, Likes: [...post.Likes, 0] };
                } else {
                  const likesArray = post.Likes;
                  likesArray.pop();
                  return { ...post, Likes: likesArray };
                }
              } else {
                return post;
              }
  
            }))
          });
        } else {
          setIsLogged(!isLogged);
        }

      }

      const DislikeOrUndislike = (post_id) => {
        if (token) {
          const username = userName;
          const formData = {post_id: post_id, username: username};
          axios.post("http://localhost:8080/api/dislikes", formData, {
            headers: { accessToken: token },
          })
          .then((response)=> {
            setListOfPosts(listOfPosts.map((post) => {
              if (post.id === post_id) {
                if (response.data.disliked) {
                  return { ...post, Dislikes: [...post.Dislikes, 0] };
                } else {
                  const dislikesArray = post.Dislikes;
                  dislikesArray.pop();
                  return { ...post, Dislikes: dislikesArray };
                }
              } else {
                return post;
              }
  
            }))
          });
        } else {
          setIsLogged(!isLogged);
        }

      }
  
    return isLogged?<div>
        <input
            type="button"
            value="What are you thinking about?"
            className="postBttn"
            onClick={togglePopup}
        />
        <div className="popup-wrapper">
          {isOpen && <Popup
          content={<>
            <input 
                type="text"
                className="input-text"
                onChange={e => setText(e.target.value)}
            />
            <div className="line"></div>
            <button onClick={onSubmit}>Publish</button>
          </>}
          handleClose={togglePopup}
        />}
        {listOfPosts.map((value, key) => {

                  return (
                      <div className="posts" key={key}>
                          {listOfUsers.find(item => item.id === value.user_id)?
                          <div className="username">
                            <h1>{listOfUsers.find(item => item.id === value.user_id).username}</h1>
                          </div>: null}
                          <div className="text" onClick={() => {navigate(`/post/${value.id}`)}}><p>{value.post}</p></div>
                          <div className="icons">
                          <label className="label"> {value.Likes.length}</label>
                            <ThumbUpOutlinedIcon 
                              onClick={()=>{LikeOrUnlike(value.id)}}
                              className={state}
                            />

                            <ChatBubbleOutlineIcon 
                              onClick={() => {navigate(`/post/${value.id}`)}}
                            />

                            <ThumbDownOutlinedIcon 
                              onClick={()=>{DislikeOrUndislike(value.id)}}
                            />
                            <label className="label"> {value.Dislikes.length}</label>
                          </div>
                          {listOfUsers.find(item => item.id === value.user_id)?
                        listOfUsers.find(item => item.id === value.user_id).username===userName?
                        <div className="deleteButton"><button onClick={()=>onDelete(value.id)}>X</button></div>:null
                        :null}
                      </div>
                  )
              })}

        </div>
  </div>:<Login />
}

export default HomePage
