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
      <InputLabel id="demo-select-small-label">Condition</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Condition"
        onChange={handleChange}
      >
        <MenuItem value={10}>New</MenuItem>
        <MenuItem value={20}>Used</MenuItem>
        <MenuItem value={20}>Recondition</MenuItem>
      </Select>
    </FormControl>
  );
}
