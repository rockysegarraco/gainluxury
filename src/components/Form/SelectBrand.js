import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl fullWidth sx={{ m: 1, minWidth: 150 }} size="large">
      <InputLabel id="demo-select-small-label">Brand</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Brand"
        onChange={handleChange}
      >
        <MenuItem value={10}>Alfa Romeo</MenuItem>
        <MenuItem value={20}>Audi</MenuItem>
        <MenuItem value={30}>BMW</MenuItem>
      </Select>
    </FormControl>
  );
}
