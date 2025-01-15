import { Box, Flex, Paper, Text } from "@mantine/core";
import StationForm from "./components/StationForm";
import TimebaseForm from "./components/TimebaseForm";

const Stations = () => {
  return (
    <Box w="100%">
      <Flex gap="md" m="xs">
        <Paper shadow="md" w="40%" p="xs">
          <Text size="1.3rem" fw="bold">Edit Station</Text>
          <StationForm />
          <TimebaseForm />
        </Paper>
      </Flex>
    </Box>
  )
}

export default Stations;