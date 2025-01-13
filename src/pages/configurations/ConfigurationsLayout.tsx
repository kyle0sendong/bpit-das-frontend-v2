import {
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconNotes
} from '@tabler/icons-react';
import { Flex, Loader } from "@mantine/core";
import { Outlet } from "react-router-dom";

import NavbarNested from "./components/navbar/NavbarNested";

import { useGetAllTcpAnalyzers } from "@/hooks/tcpAnalyzersHook";

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";

const ConfigurationsLayout = () => {
  const tcpAnalyzers = useGetAllTcpAnalyzers();

  if(tcpAnalyzers.isFetched) {

    const tcpAnalyzersData: TcpAnalyzerType[] = tcpAnalyzers.data;
    const tcpAnalyzerLinks = tcpAnalyzersData.map( (data) => {
      return {
        label: data.name,
        link: `tcp-analyzers/id?id=${data.id}`
      }
    })

    const linksData = [
      { label: 'Station', icon: IconGauge, link: "stations" },
      { label: 'Virtual Channels', icon: IconFileAnalytics, link: "virtual-channels"},
      {
        label: 'TCP Analyzers',
        icon: IconNotes,
        link: "",
        initiallyOpened: true,
        links: [{label: "Add TCP Analyzer", link:""}, ...tcpAnalyzerLinks, ]
      },
      {
        label: 'Serial Analyzers',
        icon: IconCalendarStats,
        link: "",
        links: [{label: "Add Serial Analyzer", link:""}]
      }
    ];

    return (
      <Flex w="100%">
        <NavbarNested linksData={linksData}/>
        <Outlet />
      </Flex>
    )
  } else {
    return (
      <Flex mih="80vh" w="100%">
        <Loader size={32} />
      </Flex>
    )
  }

  

}

export default ConfigurationsLayout;