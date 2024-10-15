import React from 'react';
import { Codesandbox } from 'lucide-react'; 

interface LogoProps {
  collapsed: boolean;
}

const Logo: React.FC<LogoProps> = ({ collapsed }) => {
  return (
    <div className='flex flex-row justify-center items-center gap-2 mt-4'>
      <div className="flex items-center">
        <Codesandbox className='w-[24px] text-[#3f6ad8]' />
        {!collapsed && (
          <span className="m-4 text-[24px] font-bold text-[#3f6ad8]">Simply Web</span>
        )}
      </div>
    </div>
  );
};

export default Logo;
