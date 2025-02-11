import { Flex, Text, TextInput, Paper, Button, Avatar } from '@mantine/core';
import { useForm } from '@mantine/form';

import classes from './AccountSettings.module.css'

const AccountSettingsPage = () => {

  const form = useForm({
    mode:'uncontrolled'
  });

  return (
    <Paper w='50%' m='auto' p='lg'>

      <Flex gap='lg' direction='column' flex={1}>

        <form onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> Profile Picture </Text>
            <Avatar size='5rem' mr='lg'/>
            <Button variant='default'>Change Profile Picture</Button>
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> First Name </Text>
            <TextInput 
              className={classes.textInput}
              key={form.key('first_name')}
              {...form.getInputProps('first_name')}
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> Last Name </Text>
            <TextInput 
              className={classes.textInput}
              key={form.key('last_name')}
              {...form.getInputProps('last_name')}
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> Username </Text>
            <TextInput 
              className={classes.textInput}
              key={form.key('username')}
              {...form.getInputProps('username')}
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> Email </Text>
            <TextInput 
              className={classes.textInput}
              key={form.key('email')}
              {...form.getInputProps('email')} 
            />
          </Flex>

          <Flex className={classes.flexItem}>
            <Text className={classes.text}> Password </Text>
            <Button variant='default'> Change Password</Button>
          </Flex>

          <Flex justify='flex-end'>
            <Button type="submit">
              Save
            </Button>
          </Flex>
        </form>

      </Flex>

      
    </Paper>
  )
}

export default AccountSettingsPage;