import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Container } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { Header } from '../../../components';
import courseApi from '../../../api/CourseApi';
import { useLocation, useNavigate } from 'react-router-dom';
import GridLoader
from "react-spinners/GridLoader";
import { Accordional, BuyCourse } from '../components';


import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import moduleApi from '../../../api/moduleApi';
import { Snackbars } from '../../../components/Snackbar';
import classApi from '../../../api/classApi';


CourseDetail.propTypes = {
    
};

export function CourseDetail(props) {
  let [loading, setLoading] = React.useState(true);
  let [courseDetail, setCourseDetail] = React.useState();
  let [module, setModule] = React.useState();
  const [open, setOpen] = React.useState(false);

  const[isOpenSnackbar,setIsOpenSnackbar] = React.useState(false)

  let [schedules, setSchedule] = React.useState();

  let [type, setType] = React.useState('success');
  const[message,setMessage] =React.useState('Mua thành công')

  const location =useLocation();
  const navigate =useNavigate()
  const pathnameURL =location.pathname.split('/')
  const id =pathnameURL[2]



  const handleClickOpen = () => {
      setOpen(true);
    // if(localStorage.getItem('user')){
    // }else{
    //   navigate('/dang-nhap')
    // }
  };

  const handleClose = (values) => {
    setOpen(false);
    
  };
  const handleClose1 = (value) => {

    if(value == true){
      setOpen(false);
      setType('success')
      setMessage('Mua thành công');
      setIsOpenSnackbar(true)
    }else{
      setMessage('Tài khoản đã tồn tại.');
      setType('error')
      setIsOpenSnackbar(true)
    }
    
  };

  const CloseSnackbar = ()=>{
    setIsOpenSnackbar(false)
  }
  React.useEffect(() => {
    (async () => {
      try {
       const  {data}  = await courseApi.get(id);
       const  resModule  = await moduleApi.get({id_course:id});
       const  dataSchedule  = await classApi.get(id);
        // console.log('resModule',resModule);
        setSchedule(dataSchedule);
      //  console.log('da',data);
       if(data){

         setCourseDetail(data[0]);
       }
       setModule(resModule.data);

      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }

      setLoading(false);
    })();
  }, [id]);



    return (
       <Box>
        {loading ? (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}} >
          <GridLoader  size={20} color="#36d7b7" />
        </Box>
      ):(
        <Box>
            <Box sx={{height:'60vh' , position:'relative',
            background:'url(https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D)',
           backgroundPosition:'center' }}>
            <Box sx={{padding:0.3, color:'white',display:'flex',position:'relative',
                  alignItems:'center'}}>
                {/* <PhoneIcon sx={{mr:3,zIndex:'111111'}}></PhoneIcon>
                <Box sx={{zIndex:'111111'}} component={'span'}>0353324554</Box>
                <Box sx={{backgroundColor:'black',position:'absolute',top:0,bottom:0,left:0,right:0,
                  zIndex:11111,opacity:0.3}}>1</Box> */}
            </Box>
            <Header></Header>
    
            <Box sx={{zIndex:1111,color:'white',position:'absolute',top:'50%',left:'50%',transform:`translate(-50%)`}}>
              <Box sx={{fontFamily:` 'Great Vibes', cursive;`,fontSize:'40px'}}>MoTech</Box>
              <Box>Đổi mới, sáng tạo</Box>
            </Box>
          </Box>
          <Box sx={{ pt:10,height:'800px', position:'relative',
           background:'url(https://images.unsplash.com/photo-1528460033278-a6ba57020470?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D)',
           backgroundSize:'cover',backgroundPosition:'center'
          }}>
          {/* <Box sx={{ pt:10,height:'800px', background:'url(https://images.unsplash.com/photo-1534183739801-d4350673a8d5?auto=format&fit=crop&q=80&w=1467&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundSize:'cover',backgroundPosition:'center',position:'relative' }}> */}
           <Container sx={{width: '85%', height:'400px',backgroundColor:'#FFFFFF',position:'absolute',
            top:-70,left:'50%',transform:'translateX(-50%)',boxShadow:'5px 10px #016A70'}}>
              <Box sx={{display:'flex',gap:6,justifyContent:'space-between'}}>
                <Box>
                  <Box sx={{mt:3,fontSize:'33px',fontWeight:'bold',color:'#008170'}}>{courseDetail.name}</Box>
                  <Box sx={{mt:3,fontSize:'23px'}}>Mô tả</Box>
                  
                  <p dangerouslySetInnerHTML={{ __html: courseDetail.detail }}></p>
                  <Box>
                  </Box>
                </Box>
                <Box sx={{width:'60rem',height:'10rem',mt:5}}>
                  {/* <img width={'100%'} height={'100%'} src={`/images/${courseDetail.image}`} alt="image" /> */}
                  <img width={'100%'} height={'100%'} src={`https://quy.codingfs.com/images/${courseDetail.image}`} alt="image" />
                  <Box sx={{textAlign:'center',fontSize:'25px',fontWeight:'700',color:'#D80032'}}> {Intl.NumberFormat("en-US").format(750000)}đ</Box>
                 
                  
                  <Box sx={{mt:2}}>Học trên mọi thiết bị</Box>
                  {schedules && schedules.length > 0 ? (
                    <Button fullWidth onClick={handleClickOpen} sx={{backgroundColor:'#016A70',mt:3}} variant="contained">Mua khóa học</Button>
                    ):(
                    <Button fullWidth sx={{backgroundColor:'#016A70',mt:3}} variant="contained">Khóa học sắp ra mắt</Button>

                  )}
                 
                </Box>
              </Box>
           </Container>
                    {/* <img style={{width:'100%'}}  src={URL.createObjectURL('237-536x354.jpg')} alt="image" /> */}

           <Container sx={{mt:'330px'}}>
            
            <Accordional module={module}></Accordional>
           </Container>
          </Box>

          <Dialog open={open} onClose={handleClose}>
            <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
            </IconButton>
            

            <BuyCourse schedules={schedules} onClose={handleClose1}></BuyCourse>
            
  
          </Dialog>

          <Snackbars open={isOpenSnackbar} close={CloseSnackbar} type={type}
          anchor={{vertical: 'bottom', horizontal: 'right' }} content={message}></Snackbars>
        </Box>
      )}
          
       </Box>
    );
}

