import { Blockquote } from "@mantine/core";
import { IconBrandStackoverflow } from "@tabler/icons-react";

function Quote() {
  const icon = <IconBrandStackoverflow />;
  return (
    <Blockquote
      color="blue"
      radius="md"
      iconSize={40}
      cite="– Harvey Kushing"
      icon={icon}
      mt="xl"
    >
      The only way to survive is to constantly set new tasks
    </Blockquote>
  );
}

export default Quote;
