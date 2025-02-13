import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

type DeleteUserProps = {
  id: number;
}
const DeleteUserForm = ({id}: DeleteUserProps) => {

  const [openedDelete, {open: openDelete, close: closeDelete}] = useDisclosure(false);

  return (
    <>
      <Modal 
        opened={openedDelete} 
        onClose={closeDelete} 
        title={`Delete User`}
        overlayProps={{
          backgroundOpacity: 0.25,
          blur: 0.5
        }}
      >
        
      </Modal>
      <Button bg="red" variant="filled" onClick={openDelete}>
        Delete
      </Button>
    </>

  )
}

export default DeleteUserForm;