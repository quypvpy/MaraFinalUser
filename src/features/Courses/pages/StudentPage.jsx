
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import classApi from '../../../api/classApi';
import { Button } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';


import { useDispatch } from 'react-redux';
import { Snackbars } from '../../../components/Snackbar';
import { logout } from '../../../redux/studentSlice';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const drawerWidth = 240;

StudentPage.propTypes = {
  window: PropTypes.func,
};

export function StudentPage(props) {
  const[idStudent,setIdStudent] =React.useState()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const[idRowSelect,setIdRowSelrect]=React.useState()
  const[isOpenSnackbar,setIsOpenSnackbar] =  React.useState(false)

  const navigate =useNavigate()
  const dispatch =useDispatch()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogout = () => {
    const action = logout();
    dispatch(action)
    navigate('/dang-nhap')
   
  };

  

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      
      <Divider />
      <List>
       
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />  
              </ListItemIcon>
              <ListItemText primary={'Dasboard'} />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={handleLogout}  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                 <MailIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </ListItem>
        
      </List>
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;


  // getIdTeacher
  const  user = JSON.parse(localStorage.getItem('user'));
  

  React.useEffect(() => {
    if(!user ){
      navigate('/dang-nhap')
     }else{
      (async () => {
        try {
         const  data  = await classApi.getIdStudent(user.id);
         console.log('dât',data);
         setIdStudent(data);
  
        } catch (error) {
          console.log("Fail to fetch to product List", error);
        }
  
        // setLoading(false);
      })();
     }
   
  }, []);

  
  // console.log('dât',da);


   const CloseSnackbar = ()=>{
    setIsOpenSnackbar(false)
  }
 
  return (
    <Box>
      {user  && (
        <Box sx={{ display: 'flex' }}>
        
        <CssBaseline />
        <AppBar
      
          position="fixed"
          sx={{
            backgroundColor:'#016A70','& .MuiToolbar-root': {minHeight:'80px'},
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Học viên
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          
    
          <Box>
            {idStudent && idStudent.length >0 && (<Box sx={{mt:5,mb:3}}>Học viên : {idStudent[0].name_student} </Box>)}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell  sx={{fontWeight:'Bold'}}>Mã lớp học</TableCell>
                    <TableCell  sx={{fontWeight:'Bold'}}>Tên môn học</TableCell>
                    <TableCell sx={{fontWeight:'Bold'}} >Lịch học</TableCell>
                    <TableCell sx={{fontWeight:'Bold'}} >Số buổi</TableCell>
                    <TableCell sx={{fontWeight:'Bold'}} >Đã học</TableCell>
                    {/* <TableCell sx={{fontWeight:'Bold'}} >Số lượng học viên</TableCell> */}
                    <TableCell sx={{fontWeight:'Bold'}} align="center">Tiến độ</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  { idStudent && idStudent.map((row,index) => (
                    <TableRow
                      // onClick={()=>handleClickRow(row.id)}
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } ,cursor:'pointer',
                      //  '&:hover': { backgroundColor: 'none',cursor:'pointer' },
                      backgroundColor: idRowSelect == row.id ? '#CDF5FD' : 'none'
                      }}
                    >
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell component="th" scope="row">{row.name_course}</TableCell>
                      <TableCell component="th" scope="row">{row.schedules}</TableCell>
                      <TableCell component="th" scope="row">{row.duration}</TableCell>
                      <TableCell component="th" scope="row">{row.pass}</TableCell>
                      {/* <TableCell component="th" scope="row">{row.quantity}</TableCell> */}
                      <TableCell align="center">
                        <CircularProgressWithLabel value={(row.pass / row.duration) * 100} />
                        
                        
                      </TableCell>
                      
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
    
    
          </Box>
    
          
        </Box>
        <Snackbars open={isOpenSnackbar} close={CloseSnackbar} type='success'
          anchor={{vertical: 'bottom', horizontal: 'right' }} content={'Xác nhận thành công'}></Snackbars>
        </Box>     

      )}
    </Box>
    
    
  );
}



