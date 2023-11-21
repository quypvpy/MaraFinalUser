import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Pagination } from '@mui/material';
import { Header } from '../../../components';
import PhoneIcon from '@mui/icons-material/Phone';
import { Course } from '../components/Course';
import queryString from 'query-string';
import courseApi from '../../../api/CourseApi';
import { useLocation, useNavigate } from 'react-router-dom';
import GridLoader
from "react-spinners/GridLoader";
import educationApi from '../../../api/educationApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from '../../../redux/studentSlice';
import { FlashSale, Slider, TryLearningForm } from '../components';
import { Footer } from '../../../components/Footer';
CourseList.propTypes = {
    
};

export function CourseList(props) {

  let [loading, setLoading] = React.useState(true);
  let [courses, setCourses] = React.useState();
  let [total, setTotal] = React.useState();
 
  const location =useLocation();
  const navigate = useNavigate();
  const dispatch =useDispatch();

  

  const queryParams = React.useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      page: Number.parseInt(params.page) || 1,
      limit: Number.parseInt(params.limit) || 6,
    };

  }, [location.search]);
  const [page, setPage] = React.useState(queryParams.page);

  React.useEffect(() => {
    (async () => {
      try {
       const { data, total } = await courseApi.getAll(queryParams);
       const res = await educationApi.getAll();
       const action = setMenu(res.data);
       dispatch(action)
       

       setCourses(data);
        setTotal(total);
 
      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handleClickCourse=(id)=>{
    navigate(`updateCourse/${id}`);
    
  }
  const handleChangePage= (event, value) => {
    setPage(value);
    const newQueryParams ={
      ...queryParams,
      page:value,
    }
    navigate(`?${queryString.stringify(newQueryParams)}`);

  }

  return (
    <Box>
      {loading ? (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}} >
          <GridLoader size={20} color="#36d7b7" />
        </Box>
      ):(
      <Box>
  
        <Box sx={{height:'100vh' , position:'relative',
          background:'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1528&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize:'cover',backgroundPosition:'center' }}>
          <Box sx={{padding:0.3, color:'white',display:'flex',position:'relative',
                alignItems:'center'}}>
              {/* <PhoneIcon sx={{mr:3,zIndex:'111111',color:'black'}}></PhoneIcon> */}
              
              {/* <Box sx={{backgroundColor:'black',position:'absolute',top:0,bottom:0,left:0,right:0,
                zIndex:11111,opacity:0.3}}>1</Box> */}
          </Box>
          <Header></Header>

          <Box sx={{zIndex:111111,color:'white',position:'absolute',top:'50%',left:'50%',transform:`translate(-50%)`}}>
            <Box sx={{fontFamily:` 'Great Vibes', cursive;`,fontSize:'40px'}}>MoTech</Box>
            <Box>Uy tín, Thành công</Box>
          </Box>
        </Box>
        {/* <Box sx={{fontFamily:` 'Great Vibes', cursive;`,fontSize:'30px'}}>Danh Sách Khóa Học</Box> */}
      
        <FlashSale></FlashSale>

       <Box sx={{pb:5, background:'url(https://images.unsplash.com/photo-1528460033278-a6ba57020470?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D)'}}>
          <Container sx={{pb:3, backgroundColor:'white'}}>
            <Box sx={{fontSize:'30px',textAlign:'center',m:'30px 0'}}>Danh Sách Khóa Học</Box>
        
  
            {courses && (
              <Course courses={courses} onClick={handleClickCourse}></Course>
            )}
            
            {total && queryParams.limit && (
              <Box sx={{mt:3}}>
                  <Pagination page={page} onChange={handleChangePage} sx={{'& > ul': { justifyContent: 'center' }}} count={Math.ceil(total / queryParams.limit)} color="secondary" />
              </Box>
            )}
  
          </Container>
       </Box>
       <Container>
        <Slider></Slider>
       </Container>
       <Container sx={{display:{sx:'block',md:'flex'},alignItems:'center',gap:6}}>
        <Box sx={{width:'90%',mt:5,mb:5}}><img style={{width:'100%'}} src="./images/School.png" alt="image" /></Box>
        <TryLearningForm></TryLearningForm>
       </Container>

      
       <Footer></Footer>
      
      </Box>

      
      )}
    </Box>
    
  );
}

