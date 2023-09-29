import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { UserProfile } from "@clerk/clerk-react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, setOpen }) {

  return (
    <>
      <div>
        <Dialog
          
          maxWidth
          open={open}
          onClose={setOpen}
          TransitionComponent={Transition}
          PaperProps={{
            style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}
        >
          <UserProfile />
        </Dialog>
      </div>
    </>
  );
}
