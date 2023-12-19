import { HStack, Text } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

const Navbar = () => {
  return (
    <HStack justifyContent="space-between" padding={7}>
      <Text>Nav</Text>
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
