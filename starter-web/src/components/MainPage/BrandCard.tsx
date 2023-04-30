import Image, { StaticImageData } from 'next/image';
import React, { FC } from 'react';

interface BrandCardProps {
  brandImg: string | StaticImageData;
  title: string;
  subTitle: string;
  onClick: () => void;
}

export const BrandCard: FC<BrandCardProps> = ({
  brandImg,
  title,
  subTitle,
  onClick,
}) => {
  return (
    <div
      className="z-10 my-8 w-full cursor-pointer space-y-5"
      onClick={onClick}
    >
      <div className="flex h-[300px] items-center justify-center bg-black hover:bg-brand-1">
        <div className="relative p-20">
          <Image
            src={brandImg}
            alt=""
            layout="responsive"
            objectFit="cover"
            className="w-full"
          />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-[12px] font-bold text-brand-1 md:text-[13px]">
          {title}
        </p>
        <p className="text-[13px] text-brand-1 md:text-[14px]">{subTitle}</p>
      </div>
    </div>
  );
};
