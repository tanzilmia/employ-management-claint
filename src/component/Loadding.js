import React from 'react';

const Loadding = () => {
    return (
        <div className="flex justify-center h-[100vh] items-center">
        <div className="relative w-[50px] h-[50px] rounded-full border-15 border-[#eed2bb] animate-spin">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-[#d3cfdf] animate-ping"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-[#85ee8c] animate-ping"></div>
        </div>
      </div>
    );
};

export default Loadding;