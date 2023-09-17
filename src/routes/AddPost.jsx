import React from 'react'
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const { isLoaded, isSignedIn, user } = useUser();
	const navigate = useNavigate();

    // In case the user signs out while on the page.
	if (!isLoaded || !isSignedIn) {
		navigate('/')
		return null;
	}

  return (
    <div>AddPost</div>
  )
}

export default AddPost