import { Flex, Text, TextInput, Paper, Button, Avatar } from "@mantine/core";

const AccountSettingsPage = () => {

  return (
    <Paper w="50%" m="auto" p="lg">

      <Flex gap="lg" direction="column" flex={1}>

        <Flex m="sm" gap="lg" align="center">
          <Text miw="6rem"> Profile Picture </Text>
          <Avatar size="5rem" mr="lg"/>
          <Button variant="default">Change Profile Picture</Button>
        </Flex>

        <Flex m="sm" gap="lg" align="center">
          <Text miw="6rem"> First Name </Text>
          <TextInput flex="1"/>
        </Flex>
        <Flex m="sm" gap="lg" align="center">
          <Text miw="6rem"> Last Name </Text>
          <TextInput flex="1"/>
        </Flex>
        <Flex m="sm" gap="lg" align="center">
          <Text miw="6rem"> Username </Text>
          <TextInput flex="1"/>
        </Flex>
        <Flex m="sm" gap="lg" align="center" >
          <Text miw="6rem"> Email </Text>
          <TextInput flex="1"/>
        </Flex>
        <Flex m="sm" gap="lg" align="center" >
          <Text miw="6rem"> Password </Text>
          <Button variant="default"> Change Password</Button>
        </Flex>

        <Flex justify="flex-end">
          <Button>
            Save
          </Button>
        </Flex>
      </Flex>

      
    </Paper>
  )
}

export default AccountSettingsPage;