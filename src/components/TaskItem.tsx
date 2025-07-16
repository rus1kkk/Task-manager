import React from "react";
import { Card, Text, ActionIcon, Group } from "@mantine/core";
import BadgeItem from "./BadgeItem";
import { IconTrash, IconAdjustments, IconPlus } from "@tabler/icons-react";
import type { Task } from "../types/types";
import "../styles/TaksItem.css";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
  onSave: (task: Task) => void;
}

function TaskItem({ task, onDelete }: TaskItemProps) {
  const navigate = useNavigate();
  const createdDate = format(new Date(task.createdAt), "dd.MM.yyyy HH:mm");

  return (
    <Card
      className="task-card"
      shadow="md"
      radius="lg"
      withBorder
      p="xl"
      style={{ width: "375px", height: "200px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
    >
      <Card.Section style={{ marginBottom: 16 }}>
        <Group justify="space-between">
          <Text
            size="xl"
            fw={500}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "220px"
            }}
          >
            {task.title}
          </Text>
          <Group>
            <ActionIcon
              className="task-card-icon"
              variant="light"
              color="rgba(227, 120, 120, 1)"
              size="xl"
              radius="md"
              aria-label="Trash"
              onClick={onDelete}
            >
              <IconTrash />
            </ActionIcon>
            <ActionIcon
              className="task-card-icon"
              variant="light"
              color="rgba(122, 167, 235, 1)"
              size="xl"
              radius="md"
              aria-label="Settings"
              onClick={() => navigate(`/task/${task.id}`)}
            >
              <IconAdjustments />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>

      <Card.Section style={{ marginBottom: 16 }}>
        <Text size="sm" lineClamp={2} style={{ textAlign: "left" }}>
          {task.description || "Описание отсутствует"}
        </Text>
      </Card.Section>

      <Card.Section style={{ width: "100%", flexWrap: "nowrap" }}>
        <Group justify="space-between">
          <BadgeItem type="status" value={task.status} />
          <BadgeItem type="category" value={task.category} />
          <BadgeItem type="priority" value={task.priority} />
        </Group>
      </Card.Section>
      <Card.Section style={{ marginTop: 8 }}>
        <Text size="xs" color="dimmed" style={{ textAlign: "right" }}>
          Created: {createdDate}
        </Text>
      </Card.Section>
    </Card>
  );
}

export default TaskItem;
