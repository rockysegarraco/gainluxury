import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall() {
  const [age, setAge] = React.useState(0);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 140 }} size="small">
      <Select
        displayEmpty
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        onChange={handleChange}
      >
        <MenuItem value={0}>All Countries</MenuItem>
        <MenuItem value={10}>United States</MenuItem>
        <MenuItem value={20}>Germany</MenuItem>
        <MenuItem value={30}>United Arab Emirates</MenuItem>
      </Select>
    </FormControl>
  );
}
