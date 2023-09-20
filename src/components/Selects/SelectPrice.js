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
    <FormControl sx={{ minWidth: 140 }} size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        onChange={handleChange}
      >
        <MenuItem value={0}>Price</MenuItem>
        <MenuItem value={10}>Alfa Romeo</MenuItem>
        <MenuItem value={20}>Audi</MenuItem>
        <MenuItem value={30}>BMWLamborghini</MenuItem>
      </Select>
    </FormControl>
  );
}
