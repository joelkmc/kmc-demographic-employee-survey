import React from 'react';

const LayoutComponent: React.FC = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col justify-between bg-paper'>
      <div className='main min-h-screen min-w-full text-gray-800 overflow-hidden'>
        <header className='bg-black w-full h-16 px-4 sm:px-10 '>
          <div className='flex items-center h-full space-x-3 mx-auto'>
            <img
              src={
                'https://cdn.kmc.solutions/project-statics/kmc-logo-white-with-text.png'
              }
              className='h-8 w-auto'
              alt='KMC-LOGO'
            />
            <div className='h-10 py-2 border-r border-white'></div>
            <p className='text-xl sm:text-2xl font-karla font-semibold text-white'>
              Employee Information Survey
            </p>
          </div>
        </header>
        <main className='flex flex-1 h-full mt-20'>
          <div className='w-full max-w-4xl h-full mx-auto mt-9 mb-12 px-4 sm:px-10'>
            {children}
          </div>
        </main>
      </div>

      <footer>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl'>
          <div className='border-t border-gray-200 py-8 text-sm text-gray-500 text-center'>
            <span className='block sm:inline'>&copy; 2021 KMC Solutions.</span>{' '}
            <span className='block sm:inline'>All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutComponent;
