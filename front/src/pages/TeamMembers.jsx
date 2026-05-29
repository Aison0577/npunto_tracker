import { useState } from "react";
import { UserAdd01Icon } from "hugeicons-react";
import useAuth from "../../src/hooks/AuthStore";
import toast from "react-hot-toast";
import Header from "../component/Header";
import { useRemoveTeamMember, useTeam } from "../services/api/tanstack";
import AddToTeam from "../component/pops/AddToTeam";

const empty = {
  name: "",
  email: "",
  phone: "",
  department: "",
  code: "",
  role: "staff",
  password: "",
};

export default function TeamMembers() {
  const { user: me }    = useAuth();
  const { data: users = [], isLoading } = useTeam();
  const { isPending:isDeleting, mutate:deleteMemeber } = useRemoveTeamMember()

  const handleDelete = (u) => {
    if (!confirm(`Remove ${u.name} from the team?`)) return;
    deleteMemeber(u.id, {
      onSuccess: (data) => toast.success(data),
    });
  };

  const initials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="bg-gray-100 min-h-full">
      <Header
        title={"Team Members"}
        description={"Manage applications support personnel access"}
        options={
          <AddToTeam/>
        }
      />

      <div className="pageWidth mt-6">
        {isLoading ? (
          <div className="space-y-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 h-16 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "Member",
                    "Staff Code",
                    "Department",
                    "Phone",
                    "Role",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map?.((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {initials(u.name)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-gray-500">
                      {u.code}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">
                      {u.department ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 text-xs">
                      {u.phone ?? "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          u.role === "admin"
                            ? "bg-primary/10 text-primary"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {u.id !== me?.id && (
                        <button
                          onClick={() => handleDelete(u)}
                          className="text-xs text-red-400 hover:text-red-600 hover:bg-red-50 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
