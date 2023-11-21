import React from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm,Controller } from "react-hook-form";
import * as yup from "yup";
import { Box, Button, Divider } from '@mui/material';
import InputField from '../../../../components/form-controls/InputField';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import joinApi from '../../../../api/joinApi';
import { Snackbars } from '../../../../components/Snackbar';
TryLearningForm.propTypes = {
    
};

const data=[
  'Học thêm từ lớp 3-5',
  'Học thêm từ lớp 6-9',
  'Học thêm từ lớp 10-12',
  'Luyện thi vào lớp 10 cấp tốc',
  'Học IELTS',
  'Gia sư 1 kèm 1',
  'Học lập trình',
  'Học tin học văn phòng'
]

export function TryLearningForm(props) {
  const[open,setOpen] =React.useState(false)

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
    nameCourse: yup
      .string()
      .required("Thông tin không được để trống.")
      
     
  });
  const form = useForm({
    defaultValues: {
      name:'',
      email:'',
      phone:'',
      nameCourse:'',

    },
    resolver: yupResolver(schema),
  });

  const {formState: { errors }}=form
  
  //  name là tên .. nếu để .thêm meesage thì báo lỗi.. nên tới .name thôi
const hasError = errors['nameCourse'];

  const handleSubmits = async (values) => {  
    try {
      setOpen(true)
      form.reset();
     await joinApi.signupTrial(values);
   
  }catch (error) {
    console.log("Fail to fetch to login", error);
  }
}
const CloseSnackbar =()=>{
  setOpen(false)
}

  // const {isSubmitting} =form.formState;
  return (
    <Box>
      <Box sx={{textAlign:'center',fontSize:'40px',fontWeight:'900',color:'#557C55'}}>Đăng kí học thử</Box>
       <form  onSubmit={form.handleSubmit(handleSubmits)}>
  
          <InputField name='name' label="Họ và tên" form={form}></InputField>
          <InputField name='phone' label="Số điện thoại" form={form}></InputField>
          <InputField name='email' label="Email" form={form}></InputField>
        
          <Controller
              control={form.control}
              name="nameCourse"
              
              render={({  field: { onChange, onBlur,value }, }) => (
                <FormControl error={!!hasError}  fullWidth sx={{mt:2}}>
                  <InputLabel id="demo-simple-select-label">Môn học quan tâm</InputLabel>
                  <Select
                    
                    name="nameCourse"
                    onChange={onChange}
                    onBlur={onBlur}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Môn học quan tâm"
                    
                  >
                    {data && data.map((item,index)=>(
                      <MenuItem key={index} value={item}>{item }</MenuItem>
                    ))}
                   
                  </Select>
                  <FormHelperText>{hasError ? hasError.message:''}</FormHelperText>
                </FormControl>
             
              )}
         
          />

          <Divider />
          <Button type='submit' sx={{mt:6,backgroundColor:'#016A70',":hover":{backgroundColor:'#113946'}}} fullWidth variant="contained"  autoFocus>
                Đăng kí
          </Button>
            
        </form>
        <Snackbars open={open} close={CloseSnackbar}
          anchor={{vertical: 'bottom', horizontal: 'right' }} content='Đăng kí thành công.'></Snackbars>
    </Box>
  );
}



