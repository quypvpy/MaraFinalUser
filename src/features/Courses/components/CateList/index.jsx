import React from 'react';
import PropTypes from 'prop-types';
import courseApi from '../../../../api/CourseApi';
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

CateList.propTypes = {
    idItemList:PropTypes.number
};

export function CateList({idItemList}) {
  const[courseList,setCourseList] = React.useState()
  const navigate = useNavigate()

  React.useEffect(() => {
   
    (async () => {
      try {      
          const {data}  = await courseApi.getIdCate(idItemList);
          console.log('da',data);
          setCourseList(data);
      }  

      catch (error) {
        console.log("Fail to fetch to product List", error);
      }

      // setLoading(false);
    })();
  }, [idItemList]);

  console.log('da',courseList);
  const handleClick =(id)=>{
    navigate(`/updateCourse/${id}`)
  }
  return (
    <Container >
      <Box sx={{display:'flex' ,gap:5,flexWrap:'wrap',justifyContent:'center',mt:15}}>
        {courseList  && courseList.map((item)=>(
           <Card onClick={()=>handleClick(item.id)} key={item.id} sx={{ maxWidth: 345 }}>
           <CardActionArea>
             <CardMedia
              sx={{p:1}}
               component="img"
               height="140"
               image={`https://quy.codingfs.com/images/${item.image}`}
               alt="green iguana"
             />
             <CardContent>
               <Typography gutterBottom variant="h5" component="div">
                 {item.name}
               </Typography>
               <Typography variant="body2" color="text.secondary">
                 {item.summary}
               </Typography>
             </CardContent>
           </CardActionArea>
           </Card>
        ))}
         
  
      </Box>
    </Container>
    
  );
}

