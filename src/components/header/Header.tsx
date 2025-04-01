import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Logo from './Logo';
import AvatarMenu from './Avatar';
import Navbar from './Navbar';


const infoHeader = {
  logo: '/assets/icons/logo_truong.svg', 
  school: 'Đại học Đà Nẵng',
  unit:'Trường Đại học Kinh Tế',
  system:'Cổng thông tin dich vụ',
  background_image:"/assets/images/background_header.svg",
  avatarUrl :'/assets/icons/avatar.svg',
}

const Header = ({isLoggedIn = false}) => {
  return (
    <AppBar position="static" sx={{backgroundColor: 'transparent', boxShadow:'none'}} >
        <Toolbar disableGutters className='flex flex-col text-sm md:text-md lg:text-lg xl:text-xl'>
          <Box className='flex w-full justify-between items-center py-3 md:py-0' sx={isLoggedIn ? { backgroundImage: `url(${infoHeader.background_image})`, backgroundSize: 'cover', backgroundRepeat:'no-repeat'} : {backgroundColor: 'transparent'}}>
          <Logo title={isLoggedIn? infoHeader.system : infoHeader.school} subTitle={infoHeader.unit} logo={infoHeader.logo} 
          className={`${isLoggedIn ? 'text-md md:text-lg lg:text-2xl' : ''}`}/>
          {/* nếu chưa đăng nhập sẽ không hiện avtar */}
          {isLoggedIn && <AvatarMenu avatarUrl={infoHeader.avatarUrl}/>}
          </Box>
          {isLoggedIn && <Navbar/>}
        </Toolbar>
    </AppBar>
  );
};
export default Header;