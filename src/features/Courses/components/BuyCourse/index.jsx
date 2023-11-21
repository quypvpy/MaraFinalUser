import PropTypes from 'prop-types';
import joinApi from "../../../../api/joinApi";
import { BuyCourseForm } from "../BuyCourseForm";
import { useState } from 'react';
import GridLoader
from "react-spinners/GridLoader";
import { Box } from '@mui/material';

BuyCourse.propTypes = {
  onClose:PropTypes.func,
  schedules:PropTypes.array
};

export function BuyCourse({onClose}) {


  
  const handleSubmit =async (values)=>{
    console.log('value1',values);
    // if(values.id_class){
    //   onClose1()
    // }
    
    try {
      const  res = await joinApi.create(values);
      if(res.check ==true) {
        if(onClose) onClose(true)
        // if(onClose1) onClose1(res.msg)

      }
      if(res.check ==false) {
        // console.log('ckeck',res.msg.email[0]);
        if(onClose) onClose(false)
        // if(onClose1) onClose1(res.msg)

      }
    }catch (error) {
      console.log("Fail to fetch to product List", error);
    }
  
  }
  return (
    <div>
      {/* {loading ? (
         <Box  sx={{display:'flex',justifyContent:'center',alignItems:'center',width:{xs:'22.5rem',md:'37.5rem'},height:'30rem'}} >
           <GridLoader  size={18} color="#36d7b7" />
       </Box>
      ):(
        <BuyCourseForm  onSubmit={handleSubmit}></BuyCourseForm>

      )} */}
      
         <BuyCourseForm  onSubmit={handleSubmit}></BuyCourseForm>
      
      
    </div>
  );
}

