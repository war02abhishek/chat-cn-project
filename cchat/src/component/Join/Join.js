import React,{useState} from 'react'
import './Join.css'
import { Link } from 'react-router-dom';
import logo from "../images/logo.png";
let user;
const Join = () => {
    const [name, setname] = useState("");
    
    const sendUser=()=>{
      localStorage.setItem('user', document.getElementById('joinInput').value);
        user=document.getElementById('joinInput').value;
        document.getElementById("joinInput").value = "";
    }



    return (
      <div className="JoinPage">
        <div className="JoinContainer">
          <img src={logo} alt="logo" />
          <h1>We CHAT</h1>
          <input
            onChange={(e) => setname(e.target.value)}
            placeholder="Enter Your Name"
            type="text"
            id="joinInput"
          />
          <Link
            // onClick={(e) => (!name ? e.preventDefault() : null)}
            onClick={(e)=>(!name?e.preventDefault():null)}
            to="/chat"
          >
            {" "}
            <button className="joinbtn" onClick={sendUser}>
              Login In
            </button>
          </Link>
        </div>
      </div>
    );
}

export default Join
export {user};