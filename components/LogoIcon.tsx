import {  Icon, IconProps
} from '@chakra-ui/react';

type LogoSize = 'small' | 'default' | 'big';

type LogoIconProps = IconProps & {
  size?: LogoSize,
}

const LogoIcon: React.FC<LogoIconProps> = ({size, ...props}) => {
  let boxSize = '2rem';
  switch (size) {
    case 'small':
      boxSize = '1rem';
      break;
    case 'default':
      boxSize = '2rem';
      break;
    case 'big':
      boxSize = '3rem';
      break;
    default:
      boxSize = '2rem';      
  }

  return (
    <Icon viewBox='0 0 200 200' {...props} boxSize={boxSize}  >
        <path
          fill='currentColor'
          d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
          />
    </Icon>
  )
  
}


export default LogoIcon;  