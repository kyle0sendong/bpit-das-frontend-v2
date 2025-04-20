import { useState } from "react";
import { Flex, Popover, Image } from "@mantine/core";
import FilterMenu from "./components/filter-menu/FilterMenu";
import TableView from "./components/table-view/TableView";
import GraphView from "./components/graph-view/GraphView";

import { useSearchParams } from "react-router-dom";
import { PrimaryButton } from "@/components/ui/button";

import classes from "./DataHistoryPage.module.css";

const DataHistoryPage = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const [searchParams] = useSearchParams();
  const view = searchParams.get("view");

  return (
    <Flex w="100%" direction='column'>

      <Flex className={classes.header_container}>

        <Popover
          opened={openFilter} 
          onChange={setOpenFilter} 
          position="bottom"
          trapFocus={false}
          closeOnClickOutside={false}
          withinPortal={false}
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
            <FilterMenu />
          </Popover.Dropdown>
        </Popover>
      </Flex>

      <div className={classes.view_container}>
        {
          view === "table" 
            ? <TableView /> 
              : view === "graph" ? <GraphView /> 
              : <p>
                  Please use the filter button
                </p>
        }
      </div>

      
    </Flex>
  )
}

export default DataHistoryPage;