import { ScrollArea } from '@mantine/core';
import { LinksGroup } from "../links-group/NavbarLinksGroup";
import classes from './NavbarNested.module.css';

import { useGetAllTcpAnalyzers } from '@/hooks/tcpAnalyzersHook';
import { useGetAllSerialAnalyzers } from '@/hooks/serialAnalyzersHook';
import { SerialAnalyzerType } from '@/types/serialAnalyzers';
import { TcpAnalyzerType } from '@/types/tcpAnalyzers';
import { Loader } from '@mantine/core';

import {
  IconCalendarStats,
  IconFileAnalytics,
  IconNotes
} from '@tabler/icons-react';

export default function NavbarNested() {

  const tcpAnalyzers = useGetAllTcpAnalyzers(true);
  const serialAnalyzers = useGetAllSerialAnalyzers(true);

  if(tcpAnalyzers.isFetched && serialAnalyzers.isFetched) {
    const tcpAnalyzersData: TcpAnalyzerType[] = tcpAnalyzers.data;
    const tcpAnalyzerLinks = tcpAnalyzersData.map( (data) => {
      return {
        label: data.name,
        link: `?type=tcp&id=${data.id}`
      }
    })

    const serialAnalyzersData: SerialAnalyzerType[] = serialAnalyzers.data;
    const serialAnalyzerLinks = serialAnalyzersData.map( (data) => {
      return {
        label: data.name,
        link: `?type=serial&id=${data.id}`
      }
    })

    const linksData = [
      { label: 'Virtual Channels', icon: IconFileAnalytics, link: "?type=virtual-channels"},
      {
        label: 'Modbus TCP Analyzers',
        icon: IconNotes,
        link: "",
        initiallyOpened: true,
        links: [{label:"All Modbus TCP Analyzers", link:"?type=all-tcp-analyzers"}, ...tcpAnalyzerLinks]
      },
      {
        label: 'Serial Analyzers',
        icon: IconCalendarStats,
        link: "",
        initiallyOpened: true,
        links: [{label:"All Serial Analyzers", link:"?type=all-serial-analyzers"}, ...serialAnalyzerLinks]
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