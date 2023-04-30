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
      <div className="relative h-screen w-screen overflow-hidden pt-28 md:pt-32">
        <div className="flex h-full transform items-center justify-center bg-black/80 text-left">
          <Icon.X
            className="absolute right-8 top-8 cursor-pointer stroke-white"
            onClick={onClose}
          />

          <div className="flex flex-col space-x-0 space-y-10 px-5 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-24">
            <div className="flex h-[250px] w-[250px] items-center justify-center rounded-lg bg-white px-0 md:h-[400px] md:w-[400px] md:px-12">
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
                  <p className="text-[18px] font-medium text-white md:text-[24px]">
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
                  className="cursor-pointer whitespace-pre-wrap text-[18px] font-semibold text-white underline md:text-[24px]"
                  onClick={() => window.open(modalContents.url)}
                >
                  {modalContents.url}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationLayout>
  );
};
