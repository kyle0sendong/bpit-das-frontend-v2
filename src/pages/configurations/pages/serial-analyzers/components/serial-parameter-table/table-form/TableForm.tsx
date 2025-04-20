import { useState, useEffect } from "react";
import classes from './TableForm.module.css';

import { Table, Button,  ScrollArea, Group, Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";

import cx from 'clsx';

import TableRows from "./TableRows";
import TableColumn from "./TableColumn";
import modifyFormValues from "./modifyFormValues";

import { useUpdateSerialParameter } from "@/hooks/serialParametersHook";
import { ParameterType } from "@/types/parameters";
import { SerialAnalyzerType } from "@/types/serialAnalyzers";

type TableFormProps = {
  parametersData: ParameterType[],
  analyzerData: SerialAnalyzerType
}

const TableForm = ({parametersData, analyzerData}: TableFormProps) => {

  const form = useForm<any>({
    mode:"uncontrolled"
  });

  const [scrolled, setScrolled] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const { mutate: updateParameter, isPending, isError }  = useUpdateSerialParameter(parametersData[0]?.analyzer_id)

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
          autoClose: 3000,
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
      onSubmit={ 
        form.onSubmit(handleSubmit)
      }
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
            <TableColumn mode={analyzerData.mode}/>
          </Table.Thead>
          <Table.Tbody className={classes.input}>
            <TableRows parametersData={parametersData} form={form} mode={analyzerData.mode}/>
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <Group justify="flex-end" mx="lg" my="md">
        {isPending ? (
          <Button color="dark.3" disabled>
            <Loader size="xs" />
          </Button>
        ) : (
          <Button
            type="submit"
            color="dark.3"
            disabled={errorState}
          >
            Save
          </Button>
        )}
      </Group>
    </form>
  )
}

export default TableForm;