import BgImg from 'public/assets/svg/bg-img.svg';
import LogoSVG from 'public/assets/svg/logo.svg';
import SubLogoSVG from 'public/assets/svg/sub-logo.svg';
import { useState } from 'react';
import { BrandCard } from 'src/components/MainPage/BrandCard';
import { BrandDetail } from 'src/components/modal/BrandDetailModal';
import { BRAND_CARD_DUMMY } from 'src/dummies';

export default function HomePage() {
  const [cardId, setCardId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className="relative mx-auto w-full max-w-screen-2xl px-5">
      <BgImg className="absolute -top-[300px] -right-4 -z-10 w-2/3 md:-top-4 md:-right-[400px] md:w-full" />

      <div className="z-100 my-3 space-y-1 md:my-5 md:space-y-5">
        <LogoSVG className="w-1/2 lg:w-1/4" />
        <SubLogoSVG className="w-1/2 lg:w-1/4" />
      </div>

      <div className="grid grid-cols-1 gap-x-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      </div>
      <BrandDetail
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalContents={BRAND_CARD_DUMMY[cardId]}
      />
    </div>
  );
}
