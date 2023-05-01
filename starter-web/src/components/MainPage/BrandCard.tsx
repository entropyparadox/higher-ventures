import { motion } from 'framer-motion';
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
      <div className="flex h-[300px] items-center justify-center bg-black transition-all duration-300 hover:bg-brand-1">
        <motion.div
          className="p-28 md:p-20"
          whileHover={{ scale: [null, 1.3, 1.3] }}
          transition={{ duration: 0.4 }}
        >
          <Image src={brandImg} alt="" className="w-full" />
        </motion.div>
      </div>
      <div className="space-y-1">
        <p className="text-[12px] font-bold text-brand-1 md:text-[13px]">
          {title}
        </p>
        <p className="text-[13px] text-brand-1 md:text-[14px]">{subTitle}</p>
      </div>
    </div>
  );
};
