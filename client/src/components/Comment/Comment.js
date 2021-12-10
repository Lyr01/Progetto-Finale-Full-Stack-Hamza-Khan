import React,{useState, useEffect} from 'react';
import Login from '../Login/Login';
import axios from 'axios';
import './Comment.css';

// Custom Hooks
import useTokenRetriver from '../../utils/tokenRetriver';
import useUsernameRetriver from '../../utils/usernameRetriver';

function Comment() {
    const [comment, setComment] = useState();
    const [listOfComments, setListOfComments] = useState([]);
    const [listOfUsers, setListOfUsers] = useState([]);
    const [isLogged, setIsLogged] = useState(true);

    const token = useTokenRetriver();
    const userName = useUsernameRetriver();

    const url = window.location.pathname; 
    const id = url.split("/").pop();

    const onSumbit = () => {
        if (token) {
            const username = userName;
            const formData = {"commentBody": comment, "username": username};
            axios.post(`http://localhost:8080/api/comment/${id}`, formData, {
                headers: { accessToken: token },
              })
            .then((res) => {
                console.log(res.data);
            });
    
            window.location.reload(true);
          } else {
            setIsLogged(!isLogged);
          }
    }

    const onDelete = (commentid) => {
        axios.delete(`http://localhost:8080/api/comment/${commentid}`, {
            headers: { accessToken: token },
          });
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
                const user_id = listOfUsers.find(item => item.id === value.user_id);
                return (value.post_id===Number(id)?
                    <div className="line"  key={value.id}>
                    <div className="comments" key={value.id}>
                        <div className="commentSection">
                        {user_id?
                        <div className="username"><h1>{user_id.username}:</h1></div>
                        : null}
                        <div className="comment"><h4>{value.commentBody}</h4></div>
                        {user_id?
                        user_id.username === userName?
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
