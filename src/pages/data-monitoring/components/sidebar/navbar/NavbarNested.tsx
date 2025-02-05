import { ScrollArea } from '@mantine/core';
import { LinksGroup } from "../links-group/NavbarLinksGroup";
import classes from './NavbarNested.module.css';

import { useGetAllTcpAnalyzers } from '@/hooks/tcpAnalyzersHook';
import { TcpAnalyzerType } from '@/types/tcpAnalyzers';
import { Loader } from '@mantine/core';

import {
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconNotes
} from '@tabler/icons-react';

export default function NavbarNested() {

  const tcpAnalyzers = useGetAllTcpAnalyzers();

  if(tcpAnalyzers.isFetched) {
    const tcpAnalyzersData: TcpAnalyzerType[] = tcpAnalyzers.data;
    const tcpAnalyzerLinks = tcpAnalyzersData.map( (data) => {
      return {
        label: data.name,
        link: `tcp-data/id?id=${data.id}`
      }
    })

    const linksData = [
      { label: 'All Analyzers', icon: IconGauge, link: "analyzers-data" },
      { label: 'Virtual Channels', icon: IconFileAnalytics, link: "virtual-channels-data"},
      {
        label: 'TCP Analyzers',
        icon: IconNotes,
        link: "",
        initiallyOpened: true,
        links: tcpAnalyzerLinks
      },
      {
        label: 'Serial Analyzers',
        icon: IconCalendarStats,
        link: "serial-data"
      }
    ];
    
    const links = linksData.map((item) => <LinksGroup {...item} key={item.label} />);

    return (
      <nav className={classes.navbar}>
        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>
      </nav>
    );
  }

  if(tcpAnalyzers.isLoading) {
    return (
      <Loader />
    )
  }

}