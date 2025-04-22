import { useState, useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import classes from './TableForm.module.css';

import { Table, ScrollArea, Group } from "@mantine/core";

import { useForm } from "@mantine/form";

import cx from 'clsx';

import TableRows from "./TableRows";
import TableColumn from "./TableColumn";
import modifyFormValues from "./modifyFormValues";
import { SaveButton1, LoaderButton1 } from "@/components/ui/button";

import { useUpdateTcpParameter } from "@/hooks/tcpParametersHook";

import { ParameterType } from "@/types/parameters";

type TableFormProps = {
  parametersData: ParameterType[];
};

const TableForm = ({ parametersData }: TableFormProps) => {

  const form = useForm<any>({
    mode: "uncontrolled",
  });

  const [scrolled, setScrolled] = useState(false);
  const [errorState, setErrorState] = useState(false);

  const { mutate: updateParameter, isPending, isError } = useUpdateTcpParameter(
    parametersData[0]?.analyzer_id
  );

  useEffect(() => {
    if (isError) {
      setErrorState(true);
      const timer = setTimeout(() => {
        setErrorState(false)
        form.reset()
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  const handleSubmit = (values: any) => {
    updateParameter(modifyFormValues(values), {
      onError: () => {
        showNotification({
          title: "Update Failed",
          message: "An error occurred while updating the parameters.",
          color: "red",
          autoClose: 5000, // Notification disappears after 5s
        });
      },
      onSuccess: () => {
        showNotification({
          title: "Update Successful",
          message: "Parameters have been updated successfully!",
          color: "green",
          autoClose: 3000,
        });
      },
    });
  };

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        handleSubmit(values)
      )}
      style={{width:'100%'}}
    >
      <ScrollArea 
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)} 
        className={classes.table_container}
        classNames={{
          thumb: classes.scrollThumb
        }}
      >
          <Table
            withRowBorders={false}
            ta="center"
          >
            <Table.Thead 
              className={cx(
                classes.header, 
                { [classes.scrolled]: scrolled }
              )}
            >
              <TableColumn />
            </Table.Thead>
            <Table.Tbody 
              className={classes.input}
            >
            <TableRows parametersData={parametersData} form={form} />
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <Group justify="flex-end" mx="lg" my="md">
        {isPending ? (
          <LoaderButton1 />
        ) : (
          <SaveButton1 
            isDisabled={errorState}
          />
        )}
      </Group>
    </form>
  );
};

export default TableForm;
