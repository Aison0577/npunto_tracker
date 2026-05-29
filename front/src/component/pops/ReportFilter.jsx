import {
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FilterAddIcon, FilterIcon, Search02Icon } from "hugeicons-react";
import React, { useState } from "react";

export default function ReportFilter({
  filters,
  setFilters,
  onRun,
  isFetching,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="bg-primary text-white p-2 py-3 rounded-2xl flex items-center gap-1 px-5 text-xs"
        onClick={() => setOpen(true)}
      >
        <FilterAddIcon /> Filter Options
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: "30px" } }}
      >
        <DialogContent sx={{ p: 2 }}>
          <div className="flex items-center gap-2 mb-4">
            <FilterIcon size={20} className="text-gray-600" />
            <p className="font-semibold text-gray-800 text-base">
              Filter Options
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded-3xl mb-3">
            <p className="font-semibold text-sm mb-4">Date Range</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs font-medium text-gray-700">From Date</p>
                <TextField
                  variant="standard"
                  fullWidth
                  type="date"
                  value={filters.from}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, from: e.target.value }))
                  }
                />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700">To Date</p>
                <TextField
                  variant="standard"
                  fullWidth
                  type="date"
                  value={filters.to}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, to: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-100 rounded-3xl mb-3">
            <p className="font-semibold text-sm mb-4">Status</p>
            <Select
              variant="standard"
              fullWidth
              value={filters.status}
              onChange={(e) =>
                setFilters((f) => ({ ...f, status: e.target.value }))
              }
              displayEmpty
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </div>

          <button
            disabled={isFetching}
            onClick={() => {
              onRun();
              setOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl text-sm font-medium disabled:opacity-60 mt-4"
          >
            <Search02Icon size={20} />
            {isFetching ? "Loading..." : "Run Report"}
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
