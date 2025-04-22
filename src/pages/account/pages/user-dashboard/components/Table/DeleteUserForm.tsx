import { useEffect, useState } from "react";

import { Modal, Button, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { LoaderButton1, DeleteButton1 } from "@/components/ui/button";
import { useDeleteUser } from "@/hooks/usersHook";

type DeleteUserProps = {
  id: number;
  name: string;
}

const DeleteUserForm = ({id, name}: DeleteUserProps) => {

  const {mutate: deleteUser, isPending, isError} = useDeleteUser();
  const [errorState, setErrorState] = useState(false);
  const [openedDelete, {open: openDelete, close: closeDelete}] = useDisclosure(false);

  const form = useForm({
    mode:"uncontrolled",
    initialValues: {
      id: id
    }
  });

  useEffect(() => {
    if (isError) {
      setErrorState(true);
      const timer = setTimeout(() => {
        setErrorState(false)
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  const handleSubmit = (values: any) => {
    deleteUser(values, {
      onError: () => {
        showNotification({
          title: "Delete Failed",
          message: "An error occurred while deleting the User.",
          color: "red",
          autoClose: 3000,
        });
      },
      onSuccess: () => {
        showNotification({
          title: "Delete Successful",
          message: "User has been deleted successfully!",
          color: "green",
          autoClose: 3000,
        });
      },
    });
  };
  
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
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Flex direction="column" gap="md">
            <Text>
              Are you sure you want to delete <i>{name}</i>? This action cannot be undone.
            </Text>
            <Flex justify="flex-end" gap="md">
              <Button variant="default" onClick={closeDelete}>
                Cancel
              </Button>
              {isPending ? (
                <LoaderButton1 />
              ) : (
                <Button 
                  variant="filled"
                  color="red"
                  disabled={errorState}
                  type="submit"
                >
                  Confirm
                </Button>
              )}
            </Flex>
          </Flex>
        </form>

      </Modal>

      <DeleteButton1 
        onClick={openDelete}
      />

    </>

  )
}

export default DeleteUserForm;