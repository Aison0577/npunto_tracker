import {
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { UserAccountIcon } from "hugeicons-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAddTeamMember } from "../../services/api/tanstack";

export default function AddToTeam() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "123456789",
    password_confirmation: "123456789",
    department: "HR",
    role: "",
  });
  const { isPending, mutate } = useAddTeamMember();

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    mutate(data, {
      onSuccess: (data) => {
        toast.success(data);
        setData({
          name: "",
          email: "",
          phone: "",
          password: "123456789",
          password_confirmation: "123456789",
          department: "HR",
          role: "",
        });
        toggleOpen();
      },
    });
  };

  return (
    <div>
      <button
        className="bg-primary text-white p-2 rounded-2xl py-3  flex items-center gap-1 px-5 text-xs"
        onClick={toggleOpen}
      >
        <UserAccountIcon /> New Member
      </button>
      <Dialog
        open={open}
        onClose={toggleOpen}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: "30px" } }}
      >
        <DialogContent sx={{ p: 3 }}>
          <p className="font-jakarta font-bold text-lg text-gray-800">
            New Team Member
          </p>
          <p className="text-xs text-gray-600 mb-4">
            Create a new member to the team.
          </p>

          <form className="space-y-4 bg-gray-100 p-3 rounded-2xl">
            <TextField
              fullWidth
              variant="standard"
              label="Member's Name*"
              value={data.name}
              onChange={(e) => setData((f) => ({ ...f, name: e.target.value }))}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              variant="standard"
              label="Email*"
              value={data.email}
              onChange={(e) =>
                setData((f) => ({ ...f, email: e.target.value }))
              }
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              variant="standard"
              label="Phone Number*"
              value={data.phone}
              onChange={(e) =>
                setData((f) => ({ ...f, phone: e.target.value }))
              }
              required
              sx={{ mb: 2 }}
            />

            <div>
              <p className="text-xs text-gray-500 mb-2">Member Role</p>
              <Select
                fullWidth
                variant="standard"
                value={data.role}
                onChange={(e) =>
                  setData((f) => ({ ...f, role: e.target.value }))
                }
                sx={{ mb: 2 }}
              >
                <MenuItem value={"staff"}>Staff</MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
              </Select>
            </div>

            <div>
              <p className="mb-3">Test Purpose - Defualt Values</p>
              <TextField
                fullWidth
                variant="standard"
                label="Default Department*"
                disabled
                value={data.department}
                onChange={(e) =>
                  setData((f) => ({ ...f, department: e.target.value }))
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                variant="standard"
                label="Default Password*"
                disabled
                value={data.password}
                onChange={(e) =>
                  setData((f) => ({ ...f, password: e.target.value }))
                }
                sx={{ mb: 1 }}
              />
            </div>
          </form>

          <button
            type="submit"
            disabled={isPending}
            onClick={handleSubmit}
            className="w-full py-4 bg-primary text-white font-medium disabled:opacity-50 mt-4"
          >
            {isPending ? "Creating..." : "Create Member"}
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
