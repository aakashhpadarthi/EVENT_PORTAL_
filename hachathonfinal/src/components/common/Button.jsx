import { motion } from 'framer-motion';
import { colors } from '../../utils/colors';

const Button = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyle = "px-6 py-3 rounded-lg font-semibold transition-all duration-200";
  const variants = {
    primary: `bg-[${colors.primary.main}] text-white hover:bg-[${colors.primary.dark}]`,
    secondary: `bg-[${colors.secondary.main}] text-white hover:bg-[${colors.secondary.dark}]`,
    outline: `border-2 border-[${colors.primary.main}] text-[${colors.primary.main}] hover:bg-[${colors.primary.main}] hover:text-white`,
  };

  return (
    <motion.button
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button; 