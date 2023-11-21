import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Container } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { Header } from '../../../components';
import courseApi from '../../../api/CourseApi';
import { useLocation } from 'react-router-dom';
import GridLoader
from "react-spinners/GridLoader";
import { Accordional, BuyCourse, Tag } from '../components';


import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import moduleApi from '../../../api/moduleApi';
import { Snackbars } from '../../../components/Snackbar';
import categories from '../../../api/categories';


CatePage.propTypes = {
    
};

export function CatePage(props) {
  let [loading, setLoading] = React.useState(true);
  let [cate, setCate] = React.useState();
  let [module, setModule] = React.useState();
  const [open, setOpen] = React.useState(false);

  const[message,setMessage] =React.useState()
  const[isOpenSnackbar,setIsOpenSnackbar] = React.useState(false)

  const location =useLocation();
  const pathnameURL =location.pathname.split('/')
  const id =pathnameURL[2]

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = (value) => {
    setOpen(false);
    setMessage(value);
    setIsOpenSnackbar(true)
  };

  const CloseSnackbar = ()=>{
    setIsOpenSnackbar(false)
  }
  React.useEffect(() => {
    (async () => {
      try {
       const  {data}  = await categories.get(id);
       setCate(data);

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
                {/* <PhoneIcon sx={{mr:3,zIndex:'111111',color:'black'}}></PhoneIcon> */}
                
                {/* <Box sx={{backgroundColor:'black',position:'absolute',top:0,bottom:0,left:0,right:0,
                  zIndex:11111,opacity:0.3}}>1</Box> */}
            </Box>
            <Header></Header>
    
            <Box sx={{zIndex:111,color:'white',position:'absolute',top:'50%',left:'50%',transform:`translate(-50%)`}}>
              <Box sx={{fontFamily:` 'Great Vibes', cursive;`,fontSize:'40px'}}>MoTech</Box>
              <Box>Tận tình, chu đáo</Box>
            </Box>
          </Box>
          <Box sx={{ pt:10,height:'800px', position:'relative',
          background:'url(https://images.unsplash.com/photo-1528460033278-a6ba57020470?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D)',
          backgroundSize:'cover',backgroundPosition:'center'
          }}>
          {/* <Box sx={{ pt:10,height:'800px', background:'url(https://images.unsplash.com/photo-1534183739801-d4350673a8d5?auto=format&fit=crop&q=80&w=1467&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundSize:'cover',backgroundPosition:'center',position:'relative' }}> */}
           <Container sx={{width: '85%', height:'200px',backgroundColor:'#FFFFFF',position:'absolute',
            top:-70,left:'50%',transform:'translateX(-50%)',boxShadow:'5px 10px #016A70'}}>
              {/* <Box sx={{display:'flex',gap:6,justifyContent:'center',flexWrap:'wrap'}}> */}
              <Box >
                {/* {cate && cate.length > 0 && cate.map((item)=>(

                <Button key={item.id} size="large" onClick={handleClickOpen} sx={{backgroundColor:'#016A70',mt:3}} variant="contained">{item.name}</Button>
                ))} */}
                <Tag cate={cate}></Tag>
              </Box>
           </Container>

          </Box>
      
        </Box>
      )}
          
       </Box>
    );
}

