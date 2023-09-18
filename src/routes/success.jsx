import React from 'react'
import { useSelector } from 'react-redux'

const Success = () => {
  const post = useSelector((state) => state.addPost);

  console.log("Success screen", post);

  return (
    <h3>Payment Success, You Ad posted Successfully, You can see your post in your profile or public home page.</h3>
  )
}

export default Success