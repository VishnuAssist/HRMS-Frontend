import { Helmet } from "@dr.pogodin/react-helmet";
import PageHeader from "../../components/PageHeader";
import PageTitleWrapper from "../../components/PageTitleWrapper";

import { Box, Grid,  } from "@mui/material";
import { useState } from "react";


// import Footer from "../../components/Footer";
import EmployeeDetails from "./EmployeeDetails";
import EmployeeForm from "./EmployeeForm";

const index = () => {
 


    const [form, setForm] = useState(false);
    const openForm = () => {
      setForm(true);
    };
    const closeForm = () => {
      setForm(false);
    };
  return (
    <div>
      <Helmet>
        <title>Employee Join</title>
      </Helmet>
         <PageTitleWrapper>
      <PageHeader title ="Employee" btntitle="Add Employee" icon={""} onActionClick={openForm}/>
      </PageTitleWrapper>
    

         <Box sx={{ maxWidth: "95%", }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={0}
        >
          <Grid size={{xs:12}}>
             <EmployeeDetails/>
        </Grid>
        </Grid>
      </Box>
      {/* <Footer/> */}
      <EmployeeForm form={form} closeForm={closeForm} initialEmployee={null} />
    </div>
  )
}

export default index
