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
    <FormControl sx={{ m: 1, minWidth: 150 }} size="large">
      <InputLabel id="demo-select-small-label">Price Type</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Price Type"
        onChange={handleChange}
      >
        <MenuItem value={10}>Fixed</MenuItem>
        <MenuItem value={20}>On Call</MenuItem>
      </Select>
    </FormControl>
  );
}
