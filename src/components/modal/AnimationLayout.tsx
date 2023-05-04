import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

interface AnimationLayoutProps {
  children: ReactNode;
  open: boolean;

  onClose: () => void;
}

export const AnimationLayout: React.FC<AnimationLayoutProps> = ({
  children,
  open,

  onClose,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 grid place-content-center overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex h-full w-full items-center justify-center text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 grid place-content-center bg-white bg-opacity-0 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
