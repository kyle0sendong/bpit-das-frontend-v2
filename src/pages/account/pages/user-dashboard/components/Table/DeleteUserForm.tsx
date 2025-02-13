import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Modal, Button, Flex, Text } from "@mantine/core";
import { useDeleteUser } from "@/hooks/usersHook";

type DeleteUserProps = {
  id: number;
  name: string;
}

const DeleteUserForm = ({id, name}: DeleteUserProps) => {

  const {mutate: deleteUser} = useDeleteUser();

  const form = useForm({
    mode:"uncontrolled",
    initialValues: {
      id: id
    }
  });
  
  const [openedDelete, {open: openDelete, close: closeDelete}] = useDisclosure(false);

  return (
    <>
      <Modal 
        opened={openedDelete} 
        onClose={closeDelete} 
        title={`Are you sure you want to delete this user?`}
        overlayProps={{
          backgroundOpacity: 0.25,
          blur: 0.5
        }}
      >
        <form onSubmit={form.onSubmit((values) => {
          console.log(values)
          deleteUser(values)
        })}>
          <Flex direction="column" gap="md">
            <Text>
              Are you sure you want to delete <i>{name}</i>? This action cannot be undone.
            </Text>
            <Flex justify="flex-end" gap="md">
              <Button variant="default" onClick={closeDelete}>
                Cancel
              </Button>
              <Button bg="red" type="submit">
                Delete
              </Button>
            </Flex>
          </Flex>
        </form>

      </Modal>
      <Button size="xs" bg="red" variant="filled" onClick={openDelete}>
        Delete
      </Button>
    </>

  )
}

export default DeleteUserForm;