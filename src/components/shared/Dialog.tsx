import React, { Fragment, MutableRefObject } from 'react';
import { Dialog as DialogComp, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

interface DialogProps {
  modalState: boolean;
  closeDialog: () => void;
  title?: string;
  initialFocusBtn?: MutableRefObject<HTMLElement | null> | undefined;
}

export const Dialog: React.FC<DialogProps> = ({
  closeDialog,
  modalState,
  title,
  children,
  initialFocusBtn,
}) => {
  return (
    <>
      <Transition appear show={modalState} as={Fragment}>
        <DialogComp
          initialFocus={initialFocusBtn}
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeDialog}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <DialogComp.Overlay className='fixed inset-0 bg-black bg-opacity-30' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl'>
                <button
                  className='absolute right-3 top-3'
                  onClick={closeDialog}
                >
                  <XIcon className='h-5 w-5 text-gray-500 hover:text-gray-900 transition-all' />
                </button>
                {title && (
                  <DialogComp.Title
                    as='h3'
                    className='text-lg font-semibold leading-6 text-gray-800'
                  >
                    {title}
                  </DialogComp.Title>
                )}

                <div className='mt-5'>{children}</div>
              </div>
            </Transition.Child>
          </div>
        </DialogComp>
      </Transition>
    </>
  );
};
