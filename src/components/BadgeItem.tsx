import { Badge } from "@mantine/core";
import {
  IconBug,
  IconStar,
  IconFileText,
  IconRefresh,
  IconTestPipe,
} from "@tabler/icons-react";

interface BadgeItemProps {
  type: "category" | "status" | "priority";
  value: string;
}

type CategoryKey = "bug" | "feature" | "documentation" | "refactor" | "test";

const categoryIcons: Record<CategoryKey, React.FC<any>> = {
  bug: IconBug,
  feature: IconStar,
  documentation: IconFileText,
  refactor: IconRefresh,
  test: IconTestPipe,
};

const categoryColors: Record<CategoryKey, string> = {
  bug: "red",
  feature: "green",
  documentation: "blue",
  refactor: "yellow",
  test: "cyan",
};

const statusColors: Record<string, string> = {
  "to do": "yellow",
  "in progress": "blue",
  done: "green",
};

const priorityColors: Record<string, string> = {
  low: "green",
  medium: "yellow",
  high: "red",
};

function BadgeItem({ type, value }: BadgeItemProps) {
  const normalizedValue = value.toLowerCase().trim();
  let color = "gray";
  let icon = null;

  switch (type) {
    case "category": {
      if (normalizedValue in categoryColors) {
        color = categoryColors[normalizedValue as CategoryKey];
      }
      const IconComponent = categoryIcons[normalizedValue as CategoryKey];
      icon = IconComponent ? <IconComponent size={16} /> : null;
      break;
    }
    case "status":
      color = statusColors[normalizedValue] || "gray";
      break;
    case "priority":
      color = priorityColors[normalizedValue] || "gray";
      break;
    default:
      color = "gray";
  }

  return (
    <Badge color={color} leftSection={icon} variant="filled">
      {value}
    </Badge>
  );
}

export default BadgeItem;
