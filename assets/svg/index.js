import React from 'react';
import Apple from './apple.svg';
import Facebook from './facebook.svg';
import Google from './google.svg';
import Backbutton from './backbutton.svg';
import Checked from './checked.svg';
import Unchecked from './unchecked.svg';
import Search from './search.svg';
import Add from './add.svg';
import Profile from './profile.svg';
import ProfileBottom from './profileBottom.svg';
import HomeBottom from './homeBottom.svg';


const IconSVG = ({ name, width = 25, height = 25, ...rest }) => {
  switch (name) {
    case 'apple':
      return <Apple width={width} height={height} {...rest} />;
    case 'facebook':
      return <Facebook width={width} height={height} {...rest} />;
    case 'google':
      return <Google width={width} height={height} {...rest} />;
    case 'backbutton':
      return <Backbutton width={width} height={height} {...rest} />;
    case 'checked':
      return <Checked width={width} height={height} {...rest} />;
    case 'unchecked':
      return <Unchecked width={width} height={height} {...rest} />;
    case 'search':
      return <Search width={width} height={height} {...rest} />;
    case 'add':
      return <Add width={width} height={height} {...rest} />;
    case 'profile':
      return <Profile width={width} height={height} {...rest} />;
    case 'profileBottom':
      return <ProfileBottom width={width} height={height} {...rest} />;
    case 'homeBottom':
      return <HomeBottom width={width} height={height} {...rest} />;
   
    default:
      return null;
  }
};

export default IconSVG;
