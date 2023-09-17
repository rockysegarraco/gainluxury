import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall() {
  const [age, setAge] = React.useState(0);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        onChange={handleChange}
      >
        <MenuItem value={0}>All States</MenuItem>
        <MenuItem value={10}>Alaska</MenuItem>
        <MenuItem value={20}>Alabama</MenuItem>
        <MenuItem value={30}>Arkansas</MenuItem>
      </Select>
    </FormControl>
  );
}
