
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Box } from '@mui/material';

export  function Slider() {
  return (
    <Box sx={{mt:5,mb:10}}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <Box sx={{width:'100%'}}><img style={{width:'100%',height:'30rem',objectFit:'contain'}} src="./images/image1.png" alt="image" /></Box>
        </SwiperSlide>
        <SwiperSlide><Box sx={{width:'100%'}}><img style={{width:'100%',height:'30rem',objectFit:'contain'}} src="./images/image3.png" alt="image" /></Box></SwiperSlide>
        <SwiperSlide><Box sx={{width:'100%'}}><img style={{width:'100%',height:'30rem',objectFit:'contain'}} src="./images/image2.png" alt="image" /></Box></SwiperSlide>
      </Swiper>
    </Box>
  );
}