import { Menu, MenuItem } from "@mui/material";
import { Menu03Icon, Menu05Icon } from "hugeicons-react";
import React, { useState } from "react";

export default function MenuDropDown({ items, btn }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen  = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      {btn ? (
        <button onClick={handleOpen}>{btn}</button>
      ) : (
        <button onClick={handleOpen} className="p-2 rounded-2xl bg-gray-100">
          <Menu05Icon size={20} />
        </button>
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { borderRadius: "16px", minWidth: "180px" } }}
      >
        {items.map((item, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              handleClose();
              item.onClick?.();
            }}
            disabled={item.disabled}
            sx={{ color: item.danger ? "error.main" : "inherit" }}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}