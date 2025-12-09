import { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";

interface PageTitleWrapperProps {
  children?: ReactNode;
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      className="MuiPageTitle-wrapper"
      sx={{
        padding: isMobile ? theme.spacing(2) : theme.spacing(1),
      }}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
};

PageTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTitleWrapper;
