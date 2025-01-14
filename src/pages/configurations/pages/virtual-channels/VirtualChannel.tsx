import { Box, Flex, Paper, Title } from "@mantine/core";
import AddVirtualChannelCard from "./components/add-virtual-channel-card/AddVirtualChannelCard";
import TableForm from "./components/table-form/TableForm";

const VirtualChannel = () => {
  return (
    <Box w="100%">
      <Flex justify="space-between" m="xs">
        <Paper shadow="md"> <Title my="lg" mx="md">Virtual Channels</Title></Paper>
        <Paper shadow="md"> <AddVirtualChannelCard /> </Paper>
      </Flex>

      <Flex m="xs">
        <Paper shadow="md" w="100%"><TableForm /></Paper>
      </Flex>

    </Box>
  )
}

export default VirtualChannel;