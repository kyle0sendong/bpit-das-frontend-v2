import { useState } from "react";
import { Box, Flex, Image, Popover } from "@mantine/core";
import TableView from "./components/table-view/TableView";
import ToolboxMenu from "./components/toolbox/FilterMenu";

import { PrimaryButton } from "@/components/ui/button";
import classes from './UserLogs.module.css';

const UserLogsPage = () => {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <Box w="100%" p="xs">

      <Flex className={classes.header_container}>
        <Popover
          opened={openFilter} 
          onChange={setOpenFilter} 
          position="bottom"
          closeOnClickOutside={false}
        >
          <Popover.Target>
            <div className={classes.filter_btn}>
              <PrimaryButton
                onClick={() => setOpenFilter( (open) => !open)}
                icon={<Image src="/filter.png" alt="filter" w="1.3rem" />}
              />
            </div>
          </Popover.Target>
          <Popover.Dropdown p={0} ml='-6rem'>
            <ToolboxMenu />
          </Popover.Dropdown>
        </Popover>
      </Flex>
      
      <Box>
        <TableView />
      </Box>
    </Box>
  )
}

export default UserLogsPage;