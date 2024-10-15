import React from 'react';

interface WelcomeMessageProps {
  userName: string; 
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName }) => {
  return (
    <div className="flex flex-col">
      <p className="m-0 text-[24px] font-bold text-black">Welcome Back</p>
      <p className="m-0 text-[#888] leading-0 sm:mt-[-30px] mt-[-40px]">Hello {userName}, Good Morning!</p>
    </div>
  );
};

export default WelcomeMessage;
