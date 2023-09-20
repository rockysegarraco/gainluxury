import * as React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Popover from '@mui/material/Popover';
import Button from "@mui/material/Button";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from "@mui/material/Typography";

export default function SelectSmall() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div className="relative">
			
				<Button
					id={id}
					onClick={handleClick}
					variant="outlined"
					size="medium"
					endIcon={<ArrowDropDownIcon />}
					sx={{
						width: "100px",
						padding: "7px",
						border: "1px solid lightgray",
						color: 'black',
						":hover": {
							border: "1px solid black"
						},
						textTransform: "none"
					}}
				>
					<Typography>Years</Typography>

				</Button>
			<Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
				<Stack direction="row" spacing={2} padding={2}>
					<FormControl sx={{ m: 1, minWidth: 140 }} size="small">
						<Select
							labelId="demo-select-small-label"
							id="demo-select-small"
							value={0}
						>
							<MenuItem value={0}>2020</MenuItem>
							<MenuItem value={10}>2021</MenuItem>
						</Select>
					</FormControl>
					<FormControl sx={{ m: 1, minWidth: 140 }} size="small">
						<Select
							labelId="demo-select-small-label"
							id="demo-select-small"
							value={0}
						>
							<MenuItem value={0}>2022</MenuItem>
							<MenuItem value={10}>2023</MenuItem>

						</Select>
					</FormControl>
				</Stack>
      </Popover>

		</div>
	);
}
