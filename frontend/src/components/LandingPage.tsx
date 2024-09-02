import React from 'react';
import { FaArrowUpLong } from "react-icons/fa6";

const LandingPage: React.FC = () => {
  return (
    <div className='w-full h-screen bg-zinc-900 pt-1'>
      <div className='textstructure mt-52 px-20'>
        {["Smart Queries", "Fast Solutions", "Precise Answers, Right Away"].map((item, index) => (
          <div key={index} className="w-fit flex">
            <h1 className="uppercase text-[6vw] sm:text-[4vw] md:text-[3vw] leading-[6vw] sm:leading-[4.5vw] md:leading-[3.5vw] tracking-tighter font-['arial'] font-semibold">
              {item}
            </h1>
          </div>
        ))}
      </div>
      <div className='border-t-[1px] border-zinc-800 mt-32 flex justify-between items-center py-5 px-20'>
        {["For Students and Government Departments", "From queries to solutions"].map((item, index) => (
          <p key={index} className='font-light tracking-tight leading-none'>{item}</p>
        ))}

        {/* <div className="start flex items-center gap-5">
          <button className="px-5 py-2 border-[1px] border-zinc-400 font-light rounded-full text-md uppercase">Get Started</button>
          <div className="w-10 h-10 flex items-center justify-center border-[1px] border-zinc-400 rounded-full">
            <span className='rotate-45'>
              <FaArrowUpLong />
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default LandingPage;
