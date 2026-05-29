import { Dialog, DialogContent, MenuItem, Select, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useUpdateActivityState } from "../../services/api/tanstack";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateActivyStatus({ activity, open, onClose }) {
  const { id } = useParams();
  const navigate = useNavigate()
  const [form, setForm] = useState({
    status: "",
    remarks: "",
  });

  const { mutate, isPending } = useUpdateActivityState(id);

  useEffect(() => {
    if (activity && open) {
      setForm({
        status : activity.status,
        remarks: "",
      });
    }
  }, [activity, open]);

  const handleSubmit = (e) => {
    console.log("Hello");

    e.preventDefault();
    mutate(
      { id, ...form },
      {
        onSuccess: (data) => {
          toast.success(data);
          onClose();
          navigate('/tracker/daily')
        }
      },
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "30px" } }}
      >
        <DialogContent sx={{ p: 3 }}>
          <p className="font-jakarta font-bold text-lg text-gray-800">
            Update Activity State
          </p>
          <p className="text-xs text-gray-600 mb-4">
            Update the activity sttus below.
          </p>

          <form
            className="space-y-4 bg-gray-100 p-3 rounded-2xl"
          >
            <div>
              <p className="text-xs text-gray-500 mb-2">Scheduled For</p>
              <Select
                fullWidth
                variant="standard"
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({ ...f, status: e.target.value }))
                }
                sx={{ mb: 3 }}
              >
                {
                  stages.map((st)=>(
                    <MenuItem key={st.value} disabled={st.value === activity.status} value={st.value}>{st.title}</MenuItem>
                  ))
                }
              </Select>
            </div>

            <TextField
              fullWidth
              multiline
              rows={3}
              variant="standard"
              label="Update Note*"
              placeholder="Why state is being updated?"
              value={form.remarks}
              onChange={(e) =>
                setForm((f) => ({ ...f, remarks: e.target.value }))
              }
              required
            />
          </form>

          <button
            type="submit"
            disabled={isPending}
            onClick={handleSubmit}
            className="w-full py-4 bg-primary text-white font-medium disabled:opacity-50 mt-4"
          >
            {isPending ? "Saving..." : "Update State"}
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}



const stages = [
  {
    value:'pending',
    title:'Pending'
  },
  {
    value:'completed',
    title:'Complete'
  },
  {
    value:'cancelled',
    title:'Cancel'
  },
]