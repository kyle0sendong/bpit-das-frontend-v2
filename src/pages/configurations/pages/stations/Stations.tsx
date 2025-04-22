import { Flex, Loader } from "@mantine/core";
import classes from './Stations.module.css';

import { useGetAllStations } from "@/hooks/stationsHook";

import SummaryTable from "./components/table";

const Stations = () => {
  const stations = useGetAllStations();

  if(stations.isLoading) return <Loader />

  const stationsData = stations.data[0];

  return (
    <Flex className={classes.container}>
      <Flex className={classes.content_text_container}>
        <p className={classes.content_title}>
          {stationsData.name}
        </p>
        <p className={classes.content_description}>
          {stationsData.location}
        </p>
      </Flex>

      <div>
        <SummaryTable />
      </div>
    </Flex>
  )
}

export default Stations;