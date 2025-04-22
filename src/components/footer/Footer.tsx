import { Box } from "@mantine/core";

const Footer = () => {
  const year = new Date();
  return (
    <Box ta="center" pb="md" c="white">
      BPIT ©{year.getFullYear()}
    </Box>
  )
}

export default Footer;