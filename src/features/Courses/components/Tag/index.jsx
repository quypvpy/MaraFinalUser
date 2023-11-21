import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import categories from '../../../../api/categories';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import courseCate from '../../../../api/courseCate';
import { CateList } from '../CateList';


Tag.propTypes = {
  cate:PropTypes.array
};

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export function Tag({cate}) {
    const [value, setValue] = React.useState(0);
    let [itemTag,setitemTag] = React.useState();
    // let [index,setIndex] = React.useState(0);
    let [idItemList,setIdItemList] =React.useState();
    const location =useLocation();
    const navigate = useNavigate()
    const pathnameURL =location.pathname.split('/')
    const id =pathnameURL[2]
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
   
    (async () => {
      try {
        if(cate.length > 0){
          const  {data}  = await courseCate.get(cate[0].id);
          setitemTag(data);
          setValue(0);
        }
        else{
          setitemTag();
        }
       

      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }

      // setLoading(false);
    })();
  }, [cate]);
  // console.log('idDDE',idDefault);
  // console.log('cate',cate);
  const handleClickMenuTag = async (id,index)=>{
    
    const  {data}  = await courseCate.get(id);
    console.log('k  cos',data);
    if(!data) {
      console.log('k  cos');
    }
    setitemTag(data);
    // setValue(index);
    // setIdDefault(id);
    // setIndex(0);
    // setitemTag();
  }
  // const handleClickMenuTag = async (id,index)=>{
  //   try {
  //       const  {data}  = await courseCate.get(id);
  //       console.log('data',data);
  //       setitemTag(data);
  //       setIndex(index);

  //     } catch (error) {
  //       console.log("Fail to fetch to product List", error);
  //     }
      
  // }
 
  console.log('dât1');
  const  handleClick=(id)=>{
    setIdItemList(id)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs  sx={{'&  .MuiTabs-flexContainer':{ justifyContent:'center'}}} value={value} onChange={handleChange} aria-label="basic tabs example">
          {cate && cate.length > 0 && cate.map((item,index1)=>(
            <Tab onClick={()=>handleClickMenuTag(item.id,index1)} key={item.id} label={item.name} {...a11yProps(item.id)} />
            // <Tab  key={item.id} label={item.name} {...a11yProps(index1)} />
             
            ))}
              {/* <Tab label="Item One" {...a11yProps(52)} />
              <Tab label="Item One" {...a11yProps(3)} />
              <Tab label="Item One" {...a11yProps(7)} /> */}

        </Tabs>
      </Box>

      <Box sx={{display:'flex',justifyContent:'center'}}>
        {itemTag  && itemTag.length > 0 && itemTag.map((item,index)=>(
  
          <CustomTabPanel key={item.id} value={value} index={value}>
          
            <Button key={item.id} size="large" onClick={()=>handleClick(item.id)}
             sx={{backgroundColor: idItemList ==item.id ? '#FF6C22':'#016A70',mt:3}} variant="contained">{item.name}</Button>
          </CustomTabPanel> 
        ))}
      
      </Box>

      {idItemList &&  ( <CateList idItemList={idItemList}></CateList>)}
     
    </Box>
  );
}

