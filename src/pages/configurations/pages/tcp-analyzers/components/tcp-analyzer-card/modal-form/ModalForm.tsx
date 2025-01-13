import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Box, NativeSelect} from "@mantine/core";
import { useForm } from "@mantine/form";

import { DbCredentialsType } from "@/types/dbCredentials";
import { StationType } from "@/types/station";

import { useInsertStation } from "@/hooks/stations";

type ModalFormProps = {
  dbCredentials: DbCredentialsType[]
}

const getSelectDataMenu = (dbCredentials: DbCredentialsType[]) => {
  const selectData: {
    label: string,
    value: string
  }[] = [];

  for(const dbCredential of dbCredentials) {
    const id = dbCredential.id ?? 1
    selectData.push({
      label: `${dbCredential.db_name} - ${dbCredential.db_host}`,
      value: id.toString()
    })
  }
  return selectData;
}

const ModalForm = ({dbCredentials}: ModalFormProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: insertStation } = useInsertStation();

  const form = useForm<StationType>({
    mode:"uncontrolled",
    initialValues: {
      "db_credential_id": dbCredentials[0].id
    },
    validate: (values) => ({
      table_name: values.table_name  === undefined && 'Table Name is required.',
      station_name: values.station_name === undefined && 'Station Name is required.',
      db_credential_id: values.db_credential_id === 0 && 'Database is required.'
    })
  });

  return (
    <>
      <Button 
        onClick={open}
        mx="1rem"
        my="0.5rem"
        color="dark.3"
      >
        Add Station
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Add New Station"
        centered
      >
        <form onSubmit={ form.onSubmit( (value) =>  {
          form.setFieldValue('table_name', undefined)
          form.setFieldValue('station_name', undefined)
          insertStation(value)
        })}>

          <Box mb="1rem">
            <TextInput
              size="xs"
              label="Table Name"
              placeholder="e.g. S001T010"
              key={form.key('table_name')}
              {...form.getInputProps('table_name')}
            />

            <TextInput
              size="xs"
              label="Station Name"
              placeholder="e.g. Rio Grande Station"
              key={form.key('station_name')}
              {...form.getInputProps('station_name')}
            />

            <NativeSelect
              size="xs"
              label="Database Source"
              data={getSelectDataMenu(dbCredentials)}
              key={form.key(`db_credential_id`)}
              {...form.getInputProps(`db_credential_id`)}
            />
          </Box>

          <Button 
            type="submit"
            color="dark.3"
          >
            Save
          </Button>
        </form>
      </Modal>

    </>
  );
}

export default ModalForm;