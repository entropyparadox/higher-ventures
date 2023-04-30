import BrandLogo1SVG from 'public/assets/svg/brand-logo1.png';
import BrandLogoNavy1SVG from 'public/assets/svg/brand-logo1-navy.png';
import BrandLogo2SVG from 'public/assets/svg/brand-logo2.png';
import BrandLogoNavy2SVG from 'public/assets/svg/brand-logo2-navy.png';
import BrandLogo3SVG from 'public/assets/svg/brand-logo3.png';
import BrandLogoNavy3SVG from 'public/assets/svg/brand-logo3-navy.png';
import BrandLogo4SVG from 'public/assets/svg/brand-logo4.png';
import BrandLogoNavy4SVG from 'public/assets/svg/brand-logo4-navy.png';
import BrandLogo5SVG from 'public/assets/svg/brand-logo5.png';
import BrandLogoNavy5SVG from 'public/assets/svg/brand-logo5-navy.png';
import BrandLogo6SVG from 'public/assets/svg/brand-logo6.png';
import BrandLogoNavy6SVG from 'public/assets/svg/brand-logo6-navy.png';
import BrandLogo7SVG from 'public/assets/svg/brand-logo7.png';
import BrandLogoNavy7SVG from 'public/assets/svg/brand-logo7-navy.png';
import BrandLogo8SVG from 'public/assets/svg/brand-logo8.png';
import BrandLogoNavy8SVG from 'public/assets/svg/brand-logo8-navy.png';
import BrandLogo9SVG from 'public/assets/svg/brand-logo9.png';
import BrandLogo10SVG from 'public/assets/svg/brand-logo10.png';
import BrandLogoNavy10SVG from 'public/assets/svg/brand-logo10-navy.png';
import BrandLogo11SVG from 'public/assets/svg/brand-logo11.png';
import BrandLogoNavy11SVG from 'public/assets/svg/brand-logo11-navy.png';
import BrandLogo12SVG from 'public/assets/svg/brand-logo12.png';
import BrandLogoNavy12SVG from 'public/assets/svg/brand-logo12-navy.png';
import BrandLogo13SVG from 'public/assets/svg/brand-logo13.png';
import BrandLogoNavy13SVG from 'public/assets/svg/brand-logo13-navy.png';
import BrandLogo14SVG from 'public/assets/svg/brand-logo14.png';
import BrandLogoNavy14SVG from 'public/assets/svg/brand-logo14-navy.png';
import BrandLogo15SVG from 'public/assets/svg/brand-logo15.png';
import BrandLogoNavy15SVG from 'public/assets/svg/brand-logo15-navy.png';

import { Role, User } from './types';

export const users: User[] = [
  {
    id: 1,
    createdAt: '2021-06-04T05:36:05.903Z',
    updatedAt: '2021-06-04T05:36:05.903Z',
    email: 'khris@example.com',
    role: Role.USER,
    name: '강정모',
  },
  {
    id: 2,
    createdAt: '2021-06-04T05:36:05.903Z',
    updatedAt: '2021-06-04T05:36:05.903Z',
    email: 'charles@example.com',
    role: Role.USER,
    name: '최용철',
  },
  {
    id: 3,
    createdAt: '2021-06-04T05:36:05.903Z',
    updatedAt: '2021-06-04T05:36:05.903Z',
    email: 'chan@example.com',
    role: Role.USER,
    name: '임주찬',
  },
];

export const BRAND_CARD_DUMMY = [
  {
    id: 1,
    brandImg: BrandLogo1SVG,
    modalImg: BrandLogoNavy1SVG,
    title: 'Contents Technologies',
    subTitle: 'Content and IP',
    contents:
      'Contents Technologies is an opportunistic company building at the intersection of content IP, finance, and technology, systematically innovating the content industry.',
    url: 'http://contentstech.com/',
  },
  {
    id: 2,
    brandImg: BrandLogo2SVG,
    modalImg: BrandLogoNavy2SVG,
    title: 'OILNOW',
    subTitle: 'Analytics & Software',
    contents:
      'OILNOW   offers   money-saving   driving   information   such   as   gas   price   finders,   auto insurance comparisons, and test-driving opportunities, and aims to become a next-generation value chain company for electric vehicles',
    url: 'http://www.oilnow.co.kr/',
  },
  {
    id: 3,
    brandImg: BrandLogo3SVG,
    modalImg: BrandLogoNavy3SVG,
    title: 'spendit',
    subTitle: 'Analytics & Software',
    contents:
      'Spendit offers a corporate card and fully automated expense management solution for businesses.',
    url: 'http://www.spendit.kr/',
  },
  {
    id: 4,
    brandImg: BrandLogo4SVG,
    modalImg: BrandLogoNavy4SVG,
    title: 'Tablero',
    subTitle: 'Analytics & Software',
    contents:
      'Tablero is the most reliable partner for seamless restaurant operations, from reservations to order and payment.',
    url: 'https://tablero.co.kr/',
  },
  {
    id: 5,
    brandImg: BrandLogo5SVG,
    modalImg: BrandLogoNavy5SVG,
    title: 'Bacon Realism',
    subTitle: 'Food and Beverage',
    contents:
      'Bacon Realism offers additive-free bacon as a versatile and flavorful ingredient for busy individuals, with flagship stores opening soon.',
    url: 'https://www.baconrealism.com/',
  },
  {
    id: 6,
    brandImg: BrandLogo6SVG,
    modalImg: BrandLogoNavy6SVG,
    title: 'Team Positive Zero',
    subTitle: 'Content and IP',
    contents:
      'Team Positive Zero is an offline space-based contemporary brand IP developer with hit brands such as Platz, Munchies and Goodies, and Positive Zero Lounge.',
    url: 'https://platz.kr/',
  },
  {
    id: 7,
    brandImg: BrandLogo7SVG,
    modalImg: BrandLogoNavy7SVG,
    title: 'Gold Plate',
    subTitle: 'Food and Beverage',
    contents:
      'Gold Plate is the leading specialized frozen convenience food company in Korea.',
    url: 'http://goldplate.co.kr/',
  },
  {
    id: 8,
    brandImg: BrandLogo8SVG,
    modalImg: BrandLogoNavy8SVG,
    title: 'Daily Vegan',
    subTitle: 'Food and Beverage',
    contents:
      'Daily Vegan specializes in plant-based chicken R&D and has successfully developed a vegan alternative with similar texture and nutritional value to real chicken.',
    url: 'https://dailyvegan.co.kr/',
  },
  {
    id: 9,
    brandImg: BrandLogo9SVG,
    modalImg: BrandLogo9SVG,
    title: 'Candy Plus',
    subTitle: 'Analytics & Software',
    contents:
      'Candy Plus is a prominent camera filter application with over 300 million downloads.',
    url: 'https://apps.apple.com/kr/app/%EC%BA%94%EB%94%94%ED%94%8C%EB%9F%AC%EC%8A%A4-%EC%85%80%EC%B9%B4-%EB%B7%B0%ED%8B%B0-%EC%B9%B4%EB%A9%94%EB%9D%BC/id1589209843',
  },
  {
    id: 10,
    brandImg: BrandLogo10SVG,
    modalImg: BrandLogoNavy10SVG,
    title: 'Fact Block',
    subTitle: 'Web 3.0 Technology',
    contents:
      'Fact Block is a blockchain accelerator and community builder, known for hosting Korea Blockchain Week.',
    url: 'https://factblock.com/',
  },
  {
    id: 11,
    brandImg: BrandLogo11SVG,
    modalImg: BrandLogoNavy11SVG,
    title: 'Quantrack',
    subTitle: 'Analytics & Software',
    contents:
      'Quantrack stands out as the sole provider of AI-driven data analytics solutions for stock trends and analysis reports.',
    url: 'https://quantrack.hoztec.com/',
  },
  {
    id: 12,
    brandImg: BrandLogo12SVG,
    modalImg: BrandLogoNavy12SVG,
    title: 'Aiden Lab',
    subTitle: 'Analytics & Software',
    contents:
      'Aiden Lab utilizes a data-gathering AI engine for influencer marketing, providing brands with optimized analysis data.',
    url: 'https://www.aidenlab.io/',
  },
  {
    id: 13,
    brandImg: BrandLogo13SVG,
    modalImg: BrandLogoNavy13SVG,
    title: 'Mapia Company',
    subTitle: 'Content and IP',
    contents:
      'Mapia Company is Asias No.1 music content distribution platform.',
    url: 'https://www.mapiacompany.com/',
  },
  {
    id: 14,
    brandImg: BrandLogo14SVG,
    modalImg: BrandLogoNavy14SVG,
    title: 'Mosiler',
    subTitle: 'Analytics & Software',
    contents:
      'Mosiler is the leading driving companion service for transportation.',
    url: 'http://www.mosiler.com/',
  },
  {
    id: 15,
    brandImg: BrandLogo15SVG,
    modalImg: BrandLogoNavy15SVG,
    title: 'Mozaqi Home',
    subTitle: 'Lifestyle',
    contents:
      'Mozaqi Home is the worlds easiest home furnishing platform, utilizing AI curation and styling.',
    url: 'https://mozaqihome.com/',
  },
];
