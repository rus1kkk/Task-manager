import { Text } from "@mantine/core";

import { IconStack3 } from "@tabler/icons-react";

const icon = <IconStack3 size={24} />;

function Header() {
  return (
    <Text size="24px" style={{ marginBottom: 40 }} fw={700}>
      {icon}
       Task Manager
    </Text>
  );
}

export default Header;
