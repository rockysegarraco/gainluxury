import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectAviationModel({
  handleModel,
  model,
  modelData
}) {
  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <Select
        value={model}
        onChange={(e) => handleModel(e.target.value)}
      >
        <MenuItem value={"All"}>All Models</MenuItem>
        {modelData.map((con, i) => (
          <MenuItem key={i} value={con.value}>
            {con.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
