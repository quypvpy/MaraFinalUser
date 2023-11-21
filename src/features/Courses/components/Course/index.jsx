
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';

Course.propTypes = {
  courses:PropTypes.array,
  onClick:PropTypes.func
};

export function Course({courses,onClick}) {

  const handleClick=(id)=>{
    if(!onClick) return
    onClick(id)
  }
  
    return (
      <Box sx={{display:'flex' ,gap:5,flexWrap:'wrap',justifyContent:'center'}}>
        {courses.map((item)=>(
           <Card onClick={()=>handleClick(item.id)} key={item.id} sx={{ maxWidth: 345 }}>
           <CardActionArea>
             <CardMedia
               component="img"
               height="140"
               image={`https://quy.codingfs.com/images/${item.image}`}
              //  image={`/images/${item.image}`}
               alt="green iguana"
             />  
             <CardContent>
               <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                 <Typography  variant="h6" gutterBottom component="div">
                   {item.name}
                 </Typography>

                <Box>
                {item.discount > 0 && (
                   <Typography sx={{fontSize:'13px',mr:2,textDecoration:'line-through',fontStyle:'italic'}}  component="span">
                   {Intl.NumberFormat("en-US").format(item.price)}đ
                   </Typography>
                )}
                   <Typography sx={{fontSize:'14px',backgroundColor:'#508D69',color:'white',padding:0.2}}   component="span">
                   {Intl.NumberFormat("en-US").format(item.price * (1 - item.discount / 100))}đ
                   </Typography>
                </Box>
               </Box>
               {item.discount > 0 && (
                <Typography gutterBottom sx={{fontSize:'12px',fontStyle:'italic',fontWeight:'Bold'}} component="div">
                Giảm giá: {item.discount}%
              </Typography>
               )}
               
               
               <Typography variant="body2" color="text.secondary">
               {item.summary}
               </Typography>
             </CardContent>
           </CardActionArea>
           </Card>
        ))}
         

      </Box>
      
    );
}

