import { Box } from "@mantine/core";

const Footer = () => {
  const year = new Date();
  return (
    <Box ta="center" p="md">
      BPIT ©{year.getFullYear()}
    </Box>
  )
}

export default Footer;