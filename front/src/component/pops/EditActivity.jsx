import { Dialog, DialogContent, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useUpdateActivity } from "../../services/api/tanstack";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function EditActivity({ activity, open, onClose }) {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    description: "",
    scheduled_for: "",
    edit_reason: "",
  });

  const { mutate, isPending } = useUpdateActivity(id);

  useEffect(() => {
    if (activity && open) {
      setForm({
        title: activity.title ?? "",
        description: activity.description ?? "",
        scheduled_for: activity.scheduled_for?.slice(0, 16) ?? "",
        edit_reason: "",
      });
    }
  }, [activity, open]);

  const handleSubmit = (e) => {
    console.log("Hello");

    e.preventDefault();
    mutate(
      { id, ...form },
      {
        onSuccess: () => {
          toast.success("Activity updated");
          onClose();
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
            Edit Activity
          </p>
          <p className="text-xs text-gray-600 mb-4">
            Update the activity details below.
          </p>

          <form
            className="space-y-4 bg-gray-100 p-3 rounded-2xl"
          >
            <TextField
              fullWidth
              multiline
              rows={2}
              variant="standard"
              label="Activity Title *"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={5}
              variant="standard"
              label="Description *"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              required
              sx={{ mb: 3 }}
            />
            <div>
              <p className="text-xs text-gray-500 mb-2">Scheduled For</p>
              <TextField
                fullWidth
                type="datetime-local"
                variant="standard"
                value={form.scheduled_for}
                onChange={(e) =>
                  setForm((f) => ({ ...f, scheduled_for: e.target.value }))
                }
                sx={{ mb: 3 }}
              />
            </div>

            <TextField
              fullWidth
              multiline
              rows={3}
              variant="standard"
              label="Reason for edit *"
              placeholder="Why are these details being updated?"
              value={form.edit_reason}
              onChange={(e) =>
                setForm((f) => ({ ...f, edit_reason: e.target.value }))
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
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
