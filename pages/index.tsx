import { AnimateSharedLayout, motion } from 'framer-motion';
import BgImg from 'public/assets/svg/bg-img.svg';
import LogoSVG from 'public/assets/svg/logo.svg';
import SubLogoSVG from 'public/assets/svg/sub-logo.svg';
import { useState } from 'react';
import { BrandCard } from 'src/components/MainPage/BrandCard';
import { BrandDetailModal } from 'src/components/modal/BrandDetailModal';
import { BRAND_CARD_DUMMY } from 'src/dummies';

export default function HomePage() {
  const [cardId, setCardId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className="relative">
      <BrandDetailModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalContents={BRAND_CARD_DUMMY[cardId]}
      />

      <div className="mx-auto w-full max-w-screen-2xl px-5">
        <BgImg className="fixed -top-[300px] -right-4 -z-10 w-2/3 md:-top-4 md:-right-[400px] md:w-full" />

        <div className="flex flex-col justify-center space-y-4 py-[2rem] md:space-y-5">
          <LogoSVG className="h-fit w-64 md:w-80" />
          <SubLogoSVG className="h-fit w-64 pb-2 md:w-80" />
        </div>

        <AnimateSharedLayout>
          <motion.div
            layout
            className="grid grid-cols-1 gap-x-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {BRAND_CARD_DUMMY.map((card) => (
              <BrandCard
                key={card.id}
                brandImg={card.brandImg}
                title={card.title}
                subTitle={card.subTitle}
                onClick={() => {
                  setIsModalOpen(true);
                  setCardId(card.id - 1);
                }}
              />
            ))}
          </motion.div>
        </AnimateSharedLayout>
      </div>

      <div className="pt-10">
        <div className="flex items-center justify-between bg-black py-4 px-5 text-13 text-white">
          <div className="space-y-2 text-left">
            <p>유한회사 하이어벤쳐스 | 대표자 : 강장윤</p>
            <p>강남구 영동대로 517, 37층 3751호</p>
          </div>
          <div className="space-y-2 text-right">
            <p>사업자 등록번호 : 497-86-02448 </p>
            <p>Email : contact@higher-ventures.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
