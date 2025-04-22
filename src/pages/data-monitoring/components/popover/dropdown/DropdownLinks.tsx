import { ScrollArea } from '@mantine/core';
import { LinksGroup } from "../links-group/LinksGroup";
import classes from './DropdownLinks.module.css';

import { useGetAllTcpAnalyzers } from '@/hooks/tcpAnalyzersHook';
import { useGetAllSerialAnalyzers } from '@/hooks/serialAnalyzersHook';
import { SerialAnalyzerType } from '@/types/serialAnalyzers';
import { TcpAnalyzerType } from '@/types/tcpAnalyzers';
import { Loader } from '@mantine/core';

export default function DropdownLinks() {

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
      { label: 'All Analyzers & VC', link: "?type=all"},
      { label: 'Virtual Channels', link: "?type=virtual-channels"},
      {
        label: 'Modbus TCP Analyzers',
        link: "",
        links: [{label:"All Modbus TCP Analyzers", link:"?type=all-tcp-analyzers"}, ...tcpAnalyzerLinks]
      },
      {
        label: 'Serial Analyzers',
        link: "",
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