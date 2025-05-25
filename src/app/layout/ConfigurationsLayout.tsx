import { useEffect } from 'react';

import {
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconNotes
} from '@tabler/icons-react';
import { Flex, Loader } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';

import HeaderMenu from '@/components/header/configurations/header-menu';
import { useGetAllTcpAnalyzers } from '@/hooks/tcpAnalyzersHook';
import { useGetAllSerialAnalyzers } from '@/hooks/serialAnalyzersHook';
import { TcpAnalyzerType } from '@/types/tcpAnalyzers';
import { SerialAnalyzerType } from '@/types/serialAnalyzers';

const ConfigurationsLayout = () => {

  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const tcpAnalyzers = useGetAllTcpAnalyzers(true);
  const serialAnalyzers = useGetAllSerialAnalyzers(true);

  useEffect(() => {
    if (!isLoading && user === null) {
        navigate('/data-monitoring');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <Flex mih='80vh' w='100%'>
        <Loader size={32} />
      </Flex>
    );
  }

  if(tcpAnalyzers.isFetched && serialAnalyzers.isFetched) {

    const tcpAnalyzersData: TcpAnalyzerType[] = tcpAnalyzers.data;
    const tcpAnalyzerLinks = tcpAnalyzersData.map( (data) => {
      return {
        label: data.name,
        link: `tcp-analyzers/id?id=${data.id}`
      }
    })

    const serialAnalyzersData: SerialAnalyzerType[] = serialAnalyzers.data;
    const serialAnalyzerLinks = serialAnalyzersData.map( (data) => {
      return {
        label: data.name,
        link: `serial-analyzers/id?id=${data.id}`
      }
    })

    const linksData = [
      { label: 'Station', icon: IconGauge, link: 'stations' },
      { label: 'Virtual Channels', icon: IconFileAnalytics, link: 'virtual-channels'},
      {
        label: 'Modbus TCP Analyzers',
        icon: IconNotes,
        link: 'add-analyzer?type=tcp',
        initiallyOpened: false,
        links: [{label: 'Add Modbus TCP Analyzer', link:'add-analyzer?type=tcp'}, ...tcpAnalyzerLinks]
      },
      {
        label: 'Serial Analyzers',
        icon: IconCalendarStats,
        link: 'add-analyzer?type=serial',
        initiallyOpened: false,
        links: [{label: 'Add Serial Analyzer', link:'add-analyzer?type=serial'}, ...serialAnalyzerLinks]
      }
    ];

    return (
      <Flex w='100%' direction='column'>
        <HeaderMenu linksData={linksData}/>
        <Outlet />
      </Flex>
    )
  } else {
    return (
      <Flex mih='80vh' w='100%'>
        <Loader size={32} />
      </Flex>
    )
  }


}

export default ConfigurationsLayout;