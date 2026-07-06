import type { Job } from "../types/job";
import { useState } from "react";

type Props = {
  jobs: Job[];
  onAdd: (job: Job) => void;
  onEdit: (job: Job) => void;
  onDelete: (id: number) => void;
};

function JobCard({ jobs, onAdd, onEdit, onDelete }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Job>({ id: 0, title: "", description: "", company_id: 0, location: "", salary: "" });
  const [addForm, setAddForm] = useState<Job>({ id: 0, title: "", description: "", company_id: 0, location: "", salary: "" });

  const startEdit = (job: Job) => {
    setEditingId(job.id);
    setEditForm({ ...job });
  };

  const saveEdit = () => {
    onEdit(editForm);
    setEditingId(null);
    setEditForm({ id: 0, title: "", description: "", company_id: 0, location: "", salary: "" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ id: 0, title: "", description: "", company_id: 0, location: "", salary: "" });
  };

  const addJob = () => {
    onAdd(addForm);
    setAddForm({ id: 0, title: "", description: "", company_id: 0, location: "", salary: "" });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Jobs</h2>
      {jobs.map((job) => (
        <div key={job.id} style={{ borderBottom: "1px solid #444", padding: 12 }}>
          {editingId === job.id ? (
            <>
              <input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} placeholder="Title" />
              <br />
              <input value={editForm.location ?? ""} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} placeholder="Location" />
              <br />
              <textarea value={editForm.description ?? ""} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} placeholder="Description" />
              <br />
              <input value={String(editForm.company_id ?? "")} onChange={(e) => setEditForm({ ...editForm, company_id: Number(e.target.value || 0) })} placeholder="Company ID" />
              <br />
              <input value={editForm.salary ?? ""} onChange={(e) => setEditForm({ ...editForm, salary: e.target.value })} placeholder="Salary" />
              <br />
              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>Location: {job.location}</p>
              <p>Company ID: {job.company_id}</p>
              <p>Salary: {job.salary}</p>
              <button onClick={() => startEdit(job)}>Edit</button>
              <button onClick={() => onDelete(job.id)}>Delete</button>
            </>
          )}
        </div>
      ))}

      <h3>Add Job</h3>
      <input value={addForm.title} onChange={(e) => setAddForm({ ...addForm, title: e.target.value })} placeholder="Title" />
      <br />
      <input value={addForm.location ?? ""} onChange={(e) => setAddForm({ ...addForm, location: e.target.value })} placeholder="Location" />
      <br />
      <textarea value={addForm.description ?? ""} onChange={(e) => setAddForm({ ...addForm, description: e.target.value })} placeholder="Description" />
      <br />
      <input value={String(addForm.company_id ?? "")} onChange={(e) => setAddForm({ ...addForm, company_id: Number(e.target.value || 0) })} placeholder="Company ID" />
      <br />
      <input value={addForm.salary ?? ""} onChange={(e) => setAddForm({ ...addForm, salary: e.target.value })} placeholder="Salary" />
      <br />
      <button onClick={addJob}>Add Job</button>
    </div>
  );
}

export default JobCard;