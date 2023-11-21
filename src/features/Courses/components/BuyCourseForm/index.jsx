import React from 'react';
import PropTypes from 'prop-types';
import { useForm,Controller  } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from "yup"
import InputField from '../../../../components/form-controls/InputField';
import { Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import classApi from '../../../../api/classApi';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

BuyCourseForm.propTypes = {
    onSubmit: PropTypes.func,
};

export function BuyCourseForm({onSubmit}) {
  let [schedules, setSchedule] = React.useState();

  const location =useLocation();
  const pathnameURL =location.pathname.split('/')
  const id =pathnameURL[2]

  React.useEffect(() => {
    (async () => {
      try {
       const  data  = await classApi.get(id);
      //  console.log('dât',data);
       setSchedule(data);

      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }

      // setLoading(false);
    })();
  }, [id]);
  
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Vui lòng nhập tên của bạn."),
    phone: yup
      .number()
      .typeError('giá trị phải là số')
      .required("Vui lòng nhập số điện thoại."),
    email: yup
      .string()
      .required("Vui lòng nhập email.")
      .email("Email không hợp lệ."),
    id_class: yup
      .string()
      .required("Vui lòng chọn lịch dạy."),
      
      
  });
  const form = useForm({
    defaultValues: {
      name:'',
      phone:'',
      email:'',
      id_class:'',
    },
    resolver: yupResolver(schema),
  });

  
  const {formState: { errors }}=form
  
    //  name là tên .. nếu để .thêm meesage thì báo lỗi.. nên tới .name thôi
  const hasError = errors['id_class'];

  const handleSubmits = async (values) => {   
    if (onSubmit) {
      await onSubmit(values);
    }
  };
    
const resetForm=()=>{
  form.reset()
}

  return (
    <Box>
      <DialogTitle>Đăng kí khóa học</DialogTitle>
        <DialogContent>
          
        <form  onSubmit={form.handleSubmit(handleSubmits)}>
  
            <InputField name='name' label="name" form={form}></InputField>
            <InputField name='phone' label="phone" form={form}></InputField>
            <InputField name='email' label="email" form={form}></InputField>
            <Controller
              control={form.control}
              name="id_class"
              
              render={({  field: { onChange, onBlur,value }, }) => (
                <FormControl error={!!hasError}  fullWidth sx={{mt:2}}>
                  <InputLabel id="demo-simple-select-label">Chọn lịch học</InputLabel>
                  <Select
                    
                    name="id_class"
                    onChange={onChange}
                    onBlur={onBlur}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Chọn lịch học"
                    
                  >
                    {schedules && schedules.map((item)=>(
                      <MenuItem key={item.id} value={item.id}>{item.schedules} GV:{item.name_teacher}</MenuItem>
                    ))}
                   
                  </Select>
                  <FormHelperText>{hasError ? hasError.message:''}</FormHelperText>
                </FormControl>
             
              )}
         
            />
      
              <Box sx={{display:'flex',gap:2}}>
                <Button onClick={resetForm} sx={{mt:6}} fullWidth variant="contained"  autoFocus>
                  reset
                </Button>
                <Button type='submit'  sx={{mt:6}} fullWidth variant="contained"  autoFocus>
                  Create
                </Button>             
              </Box>
            </form>
        </DialogContent>
    </Box>
  );
}

