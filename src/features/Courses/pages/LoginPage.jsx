import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm  } from "react-hook-form"
import InputField from '../../../components/form-controls/InputField';
import PasswordField from '../../../components/form-controls/PasswordField';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import studentApi from '../../../api/studentApi';
import { Snackbars } from '../../../components/Snackbar';
import { useDispatch } from 'react-redux';
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from '../../../redux/studentSlice';

LoginPage.propTypes = {
    
};

export function LoginPage(props) {

  const[isOpenSnackbar,setIsOpenSnackbar] = React.useState(false)
  const[message,setMessage] =React.useState()
  const dispatch = useDispatch();
  // vì  chuyển tran  liền nên k cần mess
  const[error,setError] = React.useState()
  const navigate =useNavigate()

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Chưa nhập email.")
      .email("Email không hợp lệ."),
    password: yup
      .string()
      .required("Chưa nhập password.")
     
  });
  const form = useForm({
    defaultValues: {
      username:'',
      password:'',

    },
    resolver: yupResolver(schema),
  });
  const handleSubmits = async (values) => {

    // console.log('un',values);

    try {
      const action = login(values)
      const resultAction = await dispatch(action)
      const resUser = unwrapResult(resultAction)

       

      if(resUser.check == false){
        setIsOpenSnackbar(true)
        if(resUser.msg.username) {       
                setError(resUser.msg.username[0])
        }else setError(resUser.msg)
      }
      if(resUser.check ==true) {
            navigate('/student')
      }
          
    } catch (error) {
      console.log("Fail to fetch to login", error);
    }
  
    // try {
    //   const  res = await studentApi.checkLogin(values);
    //   if(res.check ==true) {
    //     navigate('/')
    //   }
    //   else{
    //     setIsOpenSnackbar(true)
    //     if(res.msg.username) {       
    //       setError(res.msg.username[0])
    //     }else setError(res.msg)

    //   }
    // }catch (error) {
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
        <Box sx={{fontStyle: 'italic'}}>Đăng nhập hệ thống</Box>
        {isSubmitting && (<Box sx={{ width: '100%',transform:'translateY(7px)' }}><LinearProgress /></Box>)}
        <form  onSubmit={form.handleSubmit(handleSubmits)}>
  
            <InputField name='username' label="Email" form={form}></InputField>
            <PasswordField name='password' label="Password" form={form}></PasswordField>
            <Button type='submit' sx={{mt:6,backgroundColor:'#016A70',":hover":{backgroundColor:'#113946'}}} fullWidth variant="contained"  autoFocus>
                  Đăng nhập
            </Button>

            <Box sx={{fontStyle: 'italic',m:'20px 0',textAlign:'left'}}>Quên mật  khẩu</Box>
            <Divider />
            <Box sx={{mt:3}}>
              <Box component={'span'} sx={{color:'#4F4A45'}}>Nếu bạn chưa có tài khoản? </Box>
              <Box component={'span'} sx={{"& a":{color:'black'}}}>
                <Link to='/dang-ki'>Đăng kí miễn phí</Link></Box>
            </Box>

            { error ? (

            <Snackbars type='error' open={isOpenSnackbar} close={CloseSnackbar}
            anchor={{vertical: 'bottom', horizontal: 'right' }} content={error}></Snackbars>
            ) :
            (
            <Snackbars open={isOpenSnackbar} close={CloseSnackbar} type='success'
            anchor={{vertical: 'bottom', horizontal: 'right' }} content={''}></Snackbars>
            )
            }
               
            </form>
      </Box>
    
  );
}

