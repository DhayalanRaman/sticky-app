import React from 'react';

export const showErrMessage = (msg) => {
  return <div className='py-2 text-red-500'>{msg}</div>;
};

export const showSuccessMessage = (msg) => {
    return <div className='py-2 text-green-500'>{msg}</div>;
};