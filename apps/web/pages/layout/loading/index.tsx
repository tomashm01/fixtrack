import { Box, Spinner } from "@chakra-ui/react";

const PageLoading = () => (
  <Box
    position="fixed"
    top={0}
    left={0}
    right={0}
    bottom={0}
    display="flex"
  >
    <Spinner m="auto" />
  </Box>
);

export default PageLoading;
