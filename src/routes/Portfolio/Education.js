import React from 'react';
import Title from '../../shared/Title';

const Education = () => {
   const resume = 'https://drive.google.com/file/d/1Gdbax82oaBWz2_0-OYh44E7QvfB53wNS/view';
   return (
      <div className='min-h-screen bg-zinc-800  w-full flex justify-center items-center'>
         <Title title={'Education'}/>
         <div className='w-full'>

            <div className='flex justify-center'>
               <h2 className='text-5xl mt-5 p-1 border-t-[orange] border-l-[orange] border-b-white border-r-white text-center text-white border-4'>Education</h2>
            </div>

            <div className='lg:w-1/3 w-full mx-auto text-xl text-start  mt-10'>
               <p className='mt-3 text-white'>SSC: <span className='text-[orange]'>Dhamrai Hardinge High School (2017)</span></p>
               <p className='mt-3 text-white'>HSC: <span className='text-[orange]'>Savar Model College(2019)</span></p>
               <p className='mt-3 text-white'>University: <span className='text-[orange]'>City University (continue)</span></p>
               <a
                  href={resume}
                  target={'_blank'}
                  className="btn mt-5 border-2 border-[orange] px-5"
                  rel="noreferrer"
               > Resume</a>
            </div>
         </div>




      </div>
   );
};

export default Education;