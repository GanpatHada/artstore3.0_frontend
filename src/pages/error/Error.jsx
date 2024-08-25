import React from 'react'
import './Error.css'
import { useNavigate, useRouteError } from 'react-router-dom';
const Error = () => {
    const error = useRouteError();
    const navigate=useNavigate()
    return (
      <div id="error-page" className='all-centered'>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i><strong>Error code : </strong>{error.status}</i>
          <i><strong>Message : </strong>{error.data}</i>
        </p>
        <button onClick={()=>navigate(-1)}>go back</button>
      </div>)
}

export default Error