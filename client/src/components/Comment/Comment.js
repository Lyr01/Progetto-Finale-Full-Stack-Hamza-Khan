import React,{useState, useEffect} from 'react';
import Login from '../Login/Login';
import axios from 'axios';
import './Comment.css';

function Comment() {
    const [comment, setComment] = useState();
    const [listOfComments, setListOfComments] = useState([]);
    const [listOfUsers, setListOfUsers] = useState([]);
    const [isLogged, setIsLogged] = useState(true);

    const url = window.location.pathname; 
    const id = url.split("/").pop();

    const onSumbit = () => {
        if (localStorage.getItem("accessToken")) {
            const username = localStorage.getItem("username");
            const formData = {"commentBody": comment, "username": username};
            axios.post(`http://localhost:8080/api/comment/${id}`, formData)
            .then((res) => {
                console.log(res.data);
            });
    
            window.location.reload(true);
          } else {
            setIsLogged(!isLogged);
          }
    }

    const onDelete = (commentid) => {
        axios.delete(`http://localhost:8080/api/comment/${commentid}`);
        window.location.reload(true);
    }
    
    useEffect(()=>{
        axios.get(`http://localhost:8080/api/comments/${id}`)
        .then((res) => {
            setListOfComments(res.data);
        })

        axios.get(`http://localhost:8080/api/users`)
        .then((res) => {
            setListOfUsers(res.data);
        })
    },[id])

    return (isLogged?
        <div>
            <input
            className="commentinput" 
            type="text"
            placeholder= "comment" 
            onChange = {(e) => {setComment(e.target.value)}}
            />

            <button onClick={onSumbit}>Comment</button>

            {listOfComments.map((value, key) => {
                return (value.post_id===Number(id)?
                    <div className="line"  key={value.id}>
                    <div className="comments" key={value.id}>
                        <div className="commentSection">
                        {listOfUsers.find(item => item.id === value.user_id)?
                        <div className="username"><h1>{listOfUsers.find(item => item.id === value.user_id).username}:</h1></div>
                        : null}
                        <div className="comment"><h4>{value.commentBody}</h4></div>
                        {listOfUsers.find(item => item.id === value.user_id)?
                        listOfUsers.find(item => item.id === value.user_id).username===localStorage.getItem("username")?
                        <div className="deleteButton"><button onClick={()=>onDelete(value.id)}>X</button></div>:null
                        :null}
                        </div>
                        </div>
                    </div>:null
                )
            })}
        </div>
    :<Login />)
}

export default Comment
