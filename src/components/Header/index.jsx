import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ListSubMenu } from '../../features/Courses/components/ListSubMenu';

import educationApi from '../../api/educationApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

export function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isShowSubMenu, setIsShowSubMenu] = React.useState(false);
  const[cate,setCate]=  React.useState()

  const resRedux = useSelector((state) => state.user);
  const navigate = useNavigate()
// console.log('res',resRedux.menu);

React.useEffect(() => {
  setCate(resRedux.menu);
}, [resRedux.menu]);


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
    
  const handleClick  =(id)=>{
    navigate(`/categories/${id}`)
    }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 ,backgroundColor:'#016A70',color:'white'}} >
        MoTech
      </Typography>
      <Divider />
      <List>
        {/* {navItems.map((item) => (
          <ListItem  key={item} disablePadding>
            <ListItemButton  sx={{ textAlign: 'center' }}>
              <ListItemText  primary={item} />
            </ListItemButton>
          </ListItem>
        ))} */}
        {cate && cate.map((item) => (
          <ListItem onClick={()=>handleClick(item.id)} key={item.id} disablePadding>
            <ListItemButton  sx={{ textAlign: 'center' }}>
              <ListItemText  primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
const handleMouseEnter=(name)=>{

  if(name =='Home') 
    setIsShowSubMenu(true)


}
const handleMouseLeave=()=>{
  setIsShowSubMenu(false)
}
const NavigatetoMenu=()=>{
  navigate('/')

}
  return (
    
    <Box > 
      
    <Box sx={{ display: 'flex'}}>

      <CssBaseline />
   
      <AppBar sx={{position:'absolute',top:30,backgroundColor:'unset',pl:15,pr:20,paddingLeft:{xs:'0px'} }}  component="nav">
        <Toolbar sx={{display:'flex',justifyContent:'space-between',gap:5}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } ,zIndex:'1111111'}}
          >
            <MenuIcon />
          </IconButton>
     
          <Typography
          onClick={NavigatetoMenu}
            variant="h6"
            component="div"
            sx={{  display: { xs: 'none', sm: 'block' ,zIndex: 111111} ,cursor:'pointer'}}
          >
            MTech
          </Typography>
        
          <Box sx={{display: { xs: 'none', sm: 'block' }}}>
            {navItems.map((item) => (
              <Button onMouseEnter={()=>handleMouseEnter(item)} onMouseLeave={()=>handleMouseLeave(item)} key={item} sx={{ color: '#fff' ,zIndex: 111111,'&:hover': { color: 'red',cursor:'pointer' }}}>
                {item}
              </Button>
            ))}
          </Box>

          {isShowSubMenu && (
            <Box  onMouseEnter={()=>handleMouseEnter('Home')} onMouseLeave={()=>handleMouseLeave('Home')} sx={{position:'absolute',top:'50px',right:'0px', zIndex: 111111}}>
            <ListSubMenu cate={cate}></ListSubMenu>
          </Box>
          )}
          
        </Toolbar>
         <Box sx={{backgroundColor:'black',position:'absolute',top:0,bottom:0,left:0,right:0,
          zIndex:11111,opacity:0.5}}></Box>
      </AppBar>
      <nav>
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
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        {/* <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
          fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
          aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
          cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
          at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
          Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
          numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
          asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
          assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
          soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
          ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
          soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
          Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
          delectus quo eius exercitationem tempore. Delectus sapiente, provident
          corporis dolorum quibusdam aut beatae repellendus est labore quisquam
          praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
          deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
          fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
          recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
          debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
          praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
          voluptate iure labore, repellendus beatae quia unde est aliquid dolor
          molestias libero. Reiciendis similique exercitationem consequatur, nobis
          placeat illo laudantium! Enim perferendis nulla soluta magni error,
          provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
          iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
          Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
          reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
          cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
          consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
          Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
          dolores sunt inventore perferendis, aut sapiente modi nesciunt.
          dolores sunt inventore perferendis, aut sapiente modi nesciunt.
          dolores sunt inventore perferendis, aut sapiente modi nesciunt.
          dolores sunt inventore perferendis, aut sapiente modi nesciunt.
          dolores sunt inventore perferendis, aut sapiente modi nesciunt.
        </Typography> */}
        
        {/* <Box sx={{color:'white'}}> doloresssssssssssssssssssssssssssssssssssss sunt inventore perferendis, aut sapiente modi nesciunt.</Box>
        <Box> dolores sunt inventore perferendis, aut sapiente modi nesciunt.</Box>
        <Box> dolores sunt inventore perferendis, aut sapiente modi nesciunt.</Box>
        <Box> dolores sunt inventore perferendis, aut sapiente modi nesciunt.</Box> */}
      </Box>
    </Box>
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

