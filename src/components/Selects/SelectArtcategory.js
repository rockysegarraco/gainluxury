import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ARTCATEGORY } from "../../utils/constants";

export default function SelectArtcategory({ handleArtcategory, artcategory }) {
  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <Select
        value={artcategory}
        onChange={(e) => handleArtcategory(e.target.value)}
      >
        <MenuItem value={"All"}>All Categories</MenuItem>
        {ARTCATEGORY.map((con, i) => (
          <MenuItem key={i} value={con.value}>
            {con.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
