import { Box, Flex, Paper } from "@mantine/core";
import StationForm from "./components/StationForm";

const Stations = () => {
  return (
    <Box w="100%">
      <Flex gap="md" m="xs">
        <Paper shadow="md" w="40%" p="xs"> <StationForm /></Paper>
      </Flex>
    </Box>
  )
}

export default Stations;