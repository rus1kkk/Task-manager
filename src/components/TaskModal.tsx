import { Modal, Button, Group, TextInput, Select } from "@mantine/core";
import type { Task } from "../types/types";
import React from "react";

interface TaskModalProps {
  opened: boolean;
  onClose: () => void;
  task: Task;
  onSave: (task: Task) => void;
}

function TaskModal({ opened, onClose, task, onSave }: TaskModalProps) {
  const [editedTask, setEditedTask] = React.useState<Task>(task);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    setEditedTask(task);
    setError("");
  }, [task]);

  const handleChange = (field: keyof Task, value: string) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
    if (field === "title" && value.trim() !== "") {
      setError("");
    }
  };

  const handleSave = () => {
    if (!editedTask.title.trim()) {
      setError("Title is required");
      return;
    }
    onSave(editedTask);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Task Details"
      centered
      size="lg"
    >
      <TextInput
        label="Title"
        value={editedTask.title}
        onChange={(e) => handleChange("title", e.currentTarget.value)}
        mb="sm"
        required
        error={error}
      />
      <Select
        label="Status"
        value={editedTask.status}
        onChange={(value) => handleChange("status", value || "")}
        data={[
          { value: "To Do", label: "To Do" },
          { value: "In Progress", label: "In Progress" },
          { value: "Done", label: "Done" },
        ]}
        mb="sm"
      />
      <Select
        label="Category"
        value={editedTask.category}
        onChange={(value) => handleChange("category", value || "")}
        data={[
          { value: "Bug", label: "Bug" },
          { value: "Feature", label: "Feature" },
          { value: "Documentation", label: "Documentation" },
          { value: "Refactor", label: "Refactor" },
          { value: "Test", label: "Test" },
        ]}
        mb="sm"
      />
      <Select
        label="Priority"
        value={editedTask.priority}
        onChange={(value) => handleChange("priority", value || "")}
        data={[
          { value: "Low", label: "Low" },
          { value: "Medium", label: "Medium" },
          { value: "High", label: "High" },
        ]}
        mb="sm"
      />
      <TextInput
        label="Description"
        value={editedTask.description || ""}
        onChange={(e) => handleChange("description", e.currentTarget.value)}
        mb="sm"
      />
      <Group mt="md">
        <Button variant="default" onClick={onClose}>
          Close
        </Button>
        <Button onClick={handleSave} color="blue" disabled={!editedTask.title.trim()}>
          Save
        </Button>
      </Group>
    </Modal>
  );
}

export default TaskModal;
