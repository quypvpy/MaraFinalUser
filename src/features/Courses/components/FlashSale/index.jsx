import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { Box, Container, Divider } from '@mui/material';
import * as React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
// import Slider from 'react-slick'
import { CountDown } from './CountDown';

// export * from './flashsale.scss'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import courseApi from '../../../../api/CourseApi';
import { useNavigate } from 'react-router-dom';



export function FlashSale() {
  const[courses, setCourses] = React.useState();
  const navigate =useNavigate()
  React.useEffect(() => {
    (async () => {
      try {
       const { data } = await courseApi.getAllSale();
   
       setCourses(data);
 
      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }

    })();
  }, []);
 
  const handleClick=(id)=>{
    navigate(`updateCourse/${id}`);
  }

  return (
    <Box sx={{mb:10,mt:5,ml:1,mr:1, border:'8px solid #952323', position:'relative',
    background:'url(./images/christmas.png)',backgroundSize:'cover'}}>
     {/* <Box sx={{backgroundColor:'red'}}> */}
      <Container sx={{mb:10}}>
        <Box sx={{fontSize:{xs:'40px',sm:'90px'},fontWeight:'900',textAlign:'center',color:'#952323'}}>Christmas Sale</Box>
        <Box sx={{mb:3,mt:3}}><CountDown></CountDown></Box>
        
          <Swiper
            // slidesPerView={4}
            // spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            navigation={true}
            modules={[Pagination,Navigation]}
            className="mySwiper"
          >
           
             
             
                 {courses && courses.map((item)=>(
                    <SwiperSlide key={item.id}>
                    <Card onClick={()=>handleClick(item.id)} key={item.id} sx={{ maxWidth: 445,height:'20rem'}}>
                      <CardActionArea >
                        <CardMedia
                          component="img"
                          height="160"
                          image={`https://quy.codingfs.com/images/${item.image}`}
                        
                          alt="green iguana"
                        />  
                        <CardContent>
                          <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <Typography  variant="h6" gutterBottom component="div">
                              {item.name}
                            </Typography>
          
                            <Box>
                
                              <Typography sx={{fontSize:'14px',backgroundColor:'#508D69',color:'white',padding:0.2}}   component="span">
                              {Intl.NumberFormat("en-US").format(item.price * (1 - item.discount / 100))}đ
                              </Typography>
                              
                            </Box>
                          </Box>
                          {item.discount > 0 && (
                           <Box>
                              <Typography gutterBottom sx={{fontSize:'12px',fontStyle:'italic',fontWeight:'Bold'}} component="div">
                              Giảm giá: {item.discount}%
                            </Typography>
                            
                              <Typography sx={{fontSize:'13px',mr:2,textDecoration:'line-through',fontStyle:'italic'}}  component="span">
                              {Intl.NumberFormat("en-US").format(item.price)}đ
                              </Typography>
                           </Box>
                          
                          )}
                          
                          
                          {/* <Typography variant="body2" color="text.secondary">
                          {item.summary}
                          </Typography> */}
                          
                        </CardContent>
                      </CardActionArea>
                      <Divider></Divider>
                      </Card>
                      
                    </SwiperSlide>
                  ))}
             
             
           
          </Swiper>
        
        </Container>
    </Box>
   
  )
}
