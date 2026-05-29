import React, { useState } from "react";
import { PinIcon } from "hugeicons-react";
import { TextField } from "@mui/material";
import { useCreateNewActivity } from "../services/api/tanstack";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function NewActivity() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    title: "",
    description: "",
    scheduled_for: "",
  });

  const { mutate, isPending } = useCreateNewActivity();

  const handleCreate = (e) => {
    e.preventDefault();
    mutate(data, {
        onSuccess:(data)=>{
            toast.success(data)
            navigate('/tracker/daily')
        }
    });
  };
  return (
    <div className="h-screen w-full py-6">
      <div className="max-w-md w-full mx-auto">
        <div className="flex items-center gap-2">
          <PinIcon size={30} />
          <p className="font-jakarta text-3xl font-bold text-gray-800">
            New Activity
          </p>
        </div>
        <p className="mb-6">Add new task/activity to teams tasks board </p>

        <form onSubmit={handleCreate}>
          <div className="bg-gray-100 rounded-3xl p-4">
            <TextField
              fullWidth
              multiline
              rows={2}
              variant="standard"
              label="Activity Title*"
              placeholder="Eg:Daily SMS count in comparison to SMS count from logs"
              sx={{ mb: 3 }}
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="standard"
              label="Activity Description*"
              placeholder="Provide task details and what need to be done here."
              sx={{ mb: 3 }}
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />

            <div>
              <p className="mb-2 mt-2">Put your task on schedule.</p>
              <TextField
                fullWidth
                type="datetime-local"
                variant="standard"
                sx={{ mb: 3 }}
                value={data.scheduled_for}
                onChange={(e) => setData({ ...data, scheduled_for: e.target.value })}
              />
            </div>
          </div>

          <button className="w-full mt-6 py-5 bg-primary text-white" type="submit" disabled={isPending}>
            {
                isPending? 'Creating...' : 'Add to Board'
            }
          </button>
        </form>
      </div>
    </div>
  );
}
