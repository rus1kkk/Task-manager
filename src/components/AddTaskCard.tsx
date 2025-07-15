import { Card, ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import "../styles/TaksItem.css";

function AddTaskCard() {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/task/new");
  };
  return (
    <Card
      className="task-card"
      shadow="md"
      radius="lg"
      withBorder
      p="xl"
      style={{ width: "375px", height: "200px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
      onClick={handleClick}
    >
      <ActionIcon
        className="task-card-icon"
        variant="light"
        color="rgba(122, 167, 235, 1)"
        size={64}
        radius="xl"
        aria-label="Add Task"
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <IconPlus size={40} />
      </ActionIcon>
    </Card>
  );
}

export default AddTaskCard; 