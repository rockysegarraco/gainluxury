import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Settings from '@mui/icons-material/SettingsOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

const Sidebar = ({ open, handleDrawerClose, }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [menuIndex, setMenuIndex] = useState(0);
	const [menuOpen, setOpen] = React.useState(false);

	const LIST_ITEMS = [
		{
			title: 'Home',
			icon: <HomeOutlined />,
			onClick: (index) => handleClick(index, "/"),
			isMenu: true
		},
		{
			title: 'Settings',
			icon: <Settings />,
			onClick: (index) => handleClick(index, "/settings")
		}
	]
	
	const MENU_ITEMS = [
		{
			title: 'Real Estate',
			onClick: (index) => handleMenuItemClick(index, "/home/real-estate"),
		},
		{
			title: 'Cars',
			onClick: (index) => handleMenuItemClick(index, "/home/cars")
		},
		{
			title: 'Marine',
			onClick: (index) => handleMenuItemClick(index, "/home/marine")
		},
		{
			title: 'Aviation',
			onClick: (index) => handleMenuItemClick(index, "/home/aviation")
		},
	]
	const handleClick = (index, path) => {
		setSelectedIndex(index)
		setMenuIndex(-1)
		handleDrawerClose();
		navigate(path)
	}

	const handleMenuClick = () => {
    setOpen(!menuOpen);
  };

	const handleMenuItemClick = (index, route) => {
		setSelectedIndex(0)
		setMenuIndex(index)
		handleDrawerClose();
		navigate(route)
	}

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
				},
			}}
			variant="persistent"
			anchor="left"
			open={open}
		>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				{LIST_ITEMS.map((item, index) => (
					<>
					{item?.isMenu ? (
						<>
						<ListItem key={item.title} 
							disablePadding 
							selected={selectedIndex === index}
							onClick={handleMenuClick} >
							<ListItemButton>
								<ListItemIcon>
									{item.icon}
								</ListItemIcon>
								<ListItemText primary={item.title} />
								{menuOpen ? <ExpandLess /> : <ExpandMore />}
							</ListItemButton>
						</ListItem>
						<Collapse in={menuOpen} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								{MENU_ITEMS.map((menu, i) => (
									<ListItemButton key={menu.title} sx={{ pl: 4 }}
									 selected={menuIndex === i} onClick={() => menu.onClick(i)}>
										<ListItemText primary={menu.title} />
									</ListItemButton>
								))}
							</List>
      </Collapse>
						</>
					): (
						<ListItem key={item.title} 
						disablePadding 
						selected={selectedIndex === index}
						onClick={() => item.onClick(index)} >
						<ListItemButton>
						<ListItemIcon>
									{item.icon}
								</ListItemIcon>
							<ListItemText primary={item.title} />
						</ListItemButton>
					</ListItem>
					)}
					</>
				))}
			</List>
		</Drawer>
	)
}

export default Sidebar
