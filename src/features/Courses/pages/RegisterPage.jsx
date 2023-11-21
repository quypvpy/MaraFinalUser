
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from "yup";
import { Snackbars } from '../../../components/Snackbar';
import InputField from '../../../components/form-controls/InputField';
import { register } from '../../../redux/studentSlice';
import studentApi from "../../../api/studentApi";

RegisterPage.propTypes = {
    
};

export function RegisterPage(props) {

  const[error,setError] = React.useState()
  const[message,setMessage] =React.useState()
  const dispatch = useDispatch();
  const[isOpenSnackbar,setIsOpenSnackbar] = React.useState(false)


  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Chưa nhập username."),
    phone: yup
        .number()
      .required("Chưa nhập số điện thoại.")
      .typeError('giá trị phải là số'),
    email: yup
      .string()
      .required("Vui lòng nhập email.")
      .email("Email không hợp lệ."),
     
  });
  const form = useForm({
    defaultValues: {
      name:'',
      email:'',
      phone:'',

    },
    resolver: yupResolver(schema),
  });
  const handleSubmits = async (values) => {  
      try {
      const  res = await studentApi.create(values);
      if(res.check ==false) {
        setIsOpenSnackbar(true)
        setError(res.msg.email[0])      
      }
      else{
        setIsOpenSnackbar(true)
        setMessage(res.msg)
        setError(false)
        form.reset()
      }
    }catch (error) {
      console.log("Fail to fetch to login", error);
    }

    // try {
    //   const action = register(values)
    //   const resultAction = await dispatch(action)
    //   const resUser = unwrapResult(resultAction)

    //   if(resUser.check == false){
    //     setIsOpenSnackbar(true)
    //     if(resUser.msg.email) {       
    //       setError(resUser.msg.email[0])
    //     }else setError(resUser.msg)
    //   }
    //   else{
    //     setIsOpenSnackbar(true)
    //     setError(false)
    //     setMessage(resUser.msg)
    //     form.reset()
    //   }
          
    // } catch (error) {
    //   console.log("Fail to fetch to login", error);
    // }
    
  };
  const {isSubmitting} =form.formState;

  const CloseSnackbar = ()=>{
    setIsOpenSnackbar(false)
  }
  return (
    
    <Box sx={{width:'30rem',margin:'0 auto',mt:5,textAlign:'center'}}>
        <Box sx={{fontSize:'2.5rem',fontWeight:'Bold',color:'#016A70'}}>MoTech</Box>
        <Box sx={{fontStyle: 'italic'}}>Đăng kí tài khoản</Box>
        {isSubmitting && (<Box sx={{ width: '100%',transform:'translateY(7px)' }}><LinearProgress /></Box>)}
        <form  onSubmit={form.handleSubmit(handleSubmits)}>
  
            <InputField name='name' label="Họ và tên" form={form}></InputField>
            <InputField name='email' label="Email" form={form}></InputField>
            <InputField name='phone' label="Số điện thoại" form={form}></InputField>
            
            <Button type='submit' sx={{mt:6,backgroundColor:'#016A70',":hover":{backgroundColor:'#113946'}}} fullWidth variant="contained"  autoFocus>
                  Đăng kí
            </Button>

            <Divider />
            <Box sx={{mt:3}}>
              <Box component={'span'} sx={{color:'#4F4A45'}}>Nếu bạn đã có tài khoản? </Box>
              <Box component={'span'} sx={{"& a":{color:'black',textDecoration:'none',fontSize:'1.1rem'}}}>
                <Link to='/dang-nhap'>Đăng nhập ngay</Link></Box>
            </Box>
               
         </form>
         

         { error ? (

          <Snackbars type='error' open={isOpenSnackbar} close={CloseSnackbar}
          anchor={{vertical: 'bottom', horizontal: 'right' }} content={error}></Snackbars>
          ) :
          (
          <Snackbars open={isOpenSnackbar} close={CloseSnackbar} type='success'
          anchor={{vertical: 'bottom', horizontal: 'right' }} content={message}></Snackbars>
          )
        }
        
    </Box>
    
  );
}


