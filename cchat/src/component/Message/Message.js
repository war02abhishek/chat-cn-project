import React from 'react'
import "./Message.css"
const Message = ({ user, message, classs }) => {

  if (user) {
    console.log(user);
    if (user === 'Admin') {
      return (
        <div className={`messageBoxAdmin`}  >
          {`${user}: ${message}`}

        </div>

      )
    }

    return (
      <div className={`messageBox${classs}`}  >
        {`${user}: ${message}`}

      </div>
    )
  }
  else {
    console.log(user);
    return (
      <div className={`messageBox${classs}`}>
        {`You: ${message}`}
      </div>
    )


  }



}

export default Message