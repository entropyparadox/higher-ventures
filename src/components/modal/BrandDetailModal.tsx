import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

import { Icon } from '../common/Icon';
import { AnimationLayout } from './AnimationLayout';

interface ModalContents {
  modalImg: string | StaticImageData;
  title: string;
  subTitle: string;
  contents: string;
  url: string;
  website: string;
}

interface BrandDetailModalProps {
  open: boolean;
  onClose: () => void;
  modalContents: ModalContents;
}

export const BrandDetailModal: FC<BrandDetailModalProps> = ({
  open,
  onClose,
  modalContents,
}) => {
  return (
    <AnimationLayout open={open} onClose={onClose}>
      <div className="relative">
        <Icon.X
          className="fixed top-5 right-5 z-30 cursor-pointer stroke-white md:absolute md:top-10 md:right-10"
          onClick={onClose}
        />

        <div className="w-full overflow-y-auto">
          <div className="mt-24 flex max-w-screen-xl flex-col space-x-0 space-y-10 px-5 md:mt-10 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-24">
            <div className="flex h-[250px] w-[250px] items-center justify-center rounded-lg bg-white p-12 md:h-[400px] md:w-[400px] md:p-20">
              <Image src={modalContents.modalImg} alt="" className="w-full" />
            </div>

            <div className="space-y-12 md:flex-1">
              <div className="space-y-4">
                <p className="text-[14px] font-semibold text-[#7AA5C3] md:text-[16px]">
                  Corporation
                </p>
                <div className="space-y-1">
                  <p className="text-[32px] font-bold text-white md:text-[48px]">
                    {modalContents.title}
                  </p>
                    {modalContents.subTitle}
                  </p>
                </div>
                <p className="text-[12px] text-[#BEBEBE] md:text-[16px]">
                  {modalContents.contents}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-[14px] font-semibold text-[#7AA5C3] md:text-[16px]">
                  Website
                </p>
                <p
                  className="cursor-pointer text-[18px] font-semibold text-white underline md:text-[24px]"
                  onClick={() => window.open(modalContents.url)}
                >
                  {modalContents.website}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationLayout>
  );
};
