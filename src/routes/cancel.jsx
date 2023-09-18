import React, { useEffect } from 'react'

const Cancel = () => {

  useEffect(() => {
    localStorage.removeItem("userPost")
  }, [])
  
  
  return (
    <h3>Sorry, You have cancel the request</h3>
  )
}

export default Cancel;