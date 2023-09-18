import { UserProfile } from '@clerk/clerk-react';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
//
import FullScreenDialog from '../components/Dialog/FullScreenDialog';
import { setPrice } from '../store/addPostSlice';

const Profile = () => {
	const { isLoaded, isSignedIn, user } = useUser();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(false)
	}

	const setItems = (item) => {
		setOpen(false);
		dispatch(setPrice(item))
		navigate('/create-post')
	}

	// In case the user signs out while on the page.
	if (!isLoaded || !isSignedIn) {
		navigate('/')
		return null;
	}

	return (
		<div className='flex items-center justify-center p-4 relative'>
			<UserProfile />
			<Tooltip title="Add Post" placement='right'>
				<Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
					<AddIcon />
				</Fab>
			</Tooltip>
			<FullScreenDialog open={open} setOpen={handleOpen}  setItem={setItems} />
		</div>
	)
};
export default Profile;