
import { Flex, Loader } from "@mantine/core";
import { useGetAllStations } from "@/hooks/stationsHook";
import StationForm from "./StationForm";
import TimebaseForm from "./TimebaseForm";

function StationForms() {
  const stations = useGetAllStations();

  if(stations.isLoading) return <Loader />
  const stationsData = stations.data[0];

  return (
    <Flex direction='column' c="var(--color1)" fw="600" w="500">
      <StationForm stationsData={stationsData}/>
      <TimebaseForm />
    </Flex>
  )
}

export default StationForms;