import { useState, useEffect } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Burger, Center, Container, Group, Menu, Image, Popover, Loader } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderMenu.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { EditButton, PrimaryButton } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';

import { useGetTcpAnalyzerById } from '@/hooks/tcpAnalyzersHook';
import { useGetSerialAnalyzerById } from '@/hooks/serialAnalyzersHook';

import AddVirtualChannelCard from '@/pages/configurations/pages/virtual-channels/components/add-virtual-channel-card';
import AddTcpCard from '@/pages/configurations/pages/serial-analyzers/components/add-parameter-card';
import AddSerialCard from '@/pages/configurations/pages/tcp-analyzers/components/add-parameter-card';

import EditTcpAnalyzerCard from "@/pages/configurations/pages/tcp-analyzers/components/edit-analyzer-card";
import EditSerialAnalyzerCard from "@/pages/configurations/pages/serial-analyzers/components/edit-analyzer-card";
import StationForms from '@/pages/configurations/pages/stations/components/form';

type LinksGroupProps = {
  icon: React.FC<any>;
  label: string;
  link: string;
  links?: { label: string; link: string }[];
}

type NavbarNestedProps = {
  linksData: LinksGroupProps[]
}

export default function HeaderMenu({linksData}: NavbarNestedProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [openInsert, setOpenInsert] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [active, setActive] = useState('');
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect( () => {

    if(location.pathname.includes('tcp') || searchParams.get('type') === 'tcp') {
      return setActive('tcp');
    }
    if(location.pathname.includes('serial') || searchParams.get('type') === 'serial') {
      return setActive('serial');
    }

    return setActive(location.pathname.substring(1));
  }, [])

  const isTcpAnalyzerPage = location.pathname.includes('tcp-analyzers');
  const isSerialAnalyzerPage = location.pathname.includes('serial-analyzers');
  const isStationPage = location.pathname.includes('stations');
  const id = searchParams.get("id") ?? 'none';

  const tcpAnalyzer = useGetTcpAnalyzerById(id !== 'none' ? parseInt(id) : 1,  id !== 'none' && isTcpAnalyzerPage);
  const serialAnalyzer = useGetSerialAnalyzerById(id !== 'none' ? parseInt(id) : 1,  id !== 'none' && isSerialAnalyzerPage);

  if(tcpAnalyzer.isLoading || serialAnalyzer.isLoading) {
    return <Loader />
  }

  const items = linksData.map((link) => {

    // If has dropdown
    const menuItems = link.links?.map((item) => (
      <Menu.Item 
        key={item.link} 
        className={classes.dropdown_link} 
        onClick={() => {
          setActive(item.link.includes('tcp') ? 'tcp' : 'serial')
          navigate(item.link)
        }}
      >
        {item.label}
      </Menu.Item>
    ));
    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <div
              className={classes.link}
              data-active={link.link.includes(active) || undefined}
              onClick={() => {
                setActive(link.link.includes('tcp') ? 'tcp' : 'serial')
                navigate(link.link)
              }}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </div>
          </Menu.Target>

          <Menu.Dropdown className={classes.dropdown_container}>
            {menuItems}
          </Menu.Dropdown>
        </Menu>
      );
    }


    // If no dropdown
    return (
      <a
        key={link.label}
        className={classes.link}
        data-active={active.includes(link.link) || undefined}
        onClick={() => {
          setActive(link.link)
          navigate(link.link)
        }}
      >
        {link.label}
      </a>
    );
  });

  const renderInsertPopover = () => {
    
    let content = <></>;
    let isRender = false;

    if(location.pathname.includes('virtual-channels')) {
      content = <AddVirtualChannelCard />
      isRender = true;
    } 
      
    if(isTcpAnalyzerPage) {
      if(id !== 'none') {
        content = <AddTcpCard id={id}/>
        isRender = true;
      }
    }

    if(isSerialAnalyzerPage) {
      if(id !== 'none') {
        content = <AddSerialCard id={id}/>
        isRender = true;
      }
    }

    if(isRender) {
      return (
        <Popover
          opened={openInsert} 
          onChange={setOpenInsert} 
          position="bottom"
        >
          <Popover.Target>
            <PrimaryButton
              onClick={() => setOpenInsert( (open) => !open)}
              icon={<Image src="/more-add.png" alt="add" w="1.3rem" />}
            />
          </Popover.Target>
          <Popover.Dropdown p={0} ml='-6rem'>
            {content}
          </Popover.Dropdown>
        </Popover>
      )
    }
  }

  const renderEditAnalyzer = () => {
    const analyzerData = 
      tcpAnalyzer.isFetched ? tcpAnalyzer.data[0]
      : serialAnalyzer.isFetched ? serialAnalyzer.data[0]
      : null

    let content = <></>;
    let isRender = false;
    if(!analyzerData) return <></>

    if(location.pathname.includes('tcp-analyzers')) {
      if(id !== 'none') {
        content = <EditTcpAnalyzerCard analyzerData={analyzerData}/>
        isRender = true;
      }
    }

    if(location.pathname.includes('serial-analyzers')) {
      if(id !== 'none') {
        content = <EditSerialAnalyzerCard analyzerData={analyzerData}/>
        isRender = true;
      }
    }

    if(isRender) {
      return (
        <Popover
          opened={openEdit} 
          onChange={setOpenEdit} 
          position="bottom"
        >
          <Popover.Target>
            <EditButton
              onClick={() => setOpenEdit( (open) => !open)}
              icon={<Image src="/edit.png" alt="Edit" w="1.3rem" />}
            />
          </Popover.Target>
          <Popover.Dropdown ml='-6rem' miw="300px">
            {content}
          </Popover.Dropdown>
        </Popover>
      )
    }
  }

  const renderEditStation = () => {
    if(isStationPage) {
      return (
        <Popover
          opened={openEdit} 
          onChange={setOpenEdit} 
          position="bottom"
        >
          <Popover.Target>
            <EditButton
              onClick={() => setOpenEdit( (open) => !open)}
              icon={<Image src="/edit.png" alt="Edit" w="1.3rem" />}
            />
          </Popover.Target>
          <Popover.Dropdown ml='-6rem' miw="300px">
            <StationForms />
          </Popover.Dropdown>
        </Popover>
      )
    } else {
      return (
        <></>
      )
    }
  }

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          {/* Add insert and update buttons here */}
          <Group gap='0.5rem' visibleFrom="sm" className={classes.buttons}>

            {renderEditAnalyzer()}
            {renderInsertPopover()}
            {renderEditStation()}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}