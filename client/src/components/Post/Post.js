import React, {useEffect, useState} from 'react';
import Comment from '../Comment/Comment';
import axios from 'axios';
import './Post.css';

function Post() {
    const [postById, setPostById] = useState([]); 
    const [listOfUsers, setListOfUsers] = useState([]);
    const url = window.location.pathname; 
    const id = url.split("/").pop();

        useEffect(() => {
            axios.get(`http://localhost:8080/api/post/${id}`).then((response) => {
                setPostById(response.data);
                console.log(response.data)
            });
            axios.get("http://localhost:8080/api/users").then((response) => {
              setListOfUsers(response.data);
            });
          }, [id]);

        return (
            <div>
                {postById.map((value, key) => {
                  return (
                    <div className="post" key={value.id}>
                        {listOfUsers.find(item => item.id === value.user_id)?
                        <div className="username"><h1>{listOfUsers.find(item => item.id === value.user_id).username}</h1></div>: null}
                        <div className="text"><p>{value.post}</p></div>
                    </div>
                )
            })}
            <Comment />
            </div>
        )
    }

export default Post
