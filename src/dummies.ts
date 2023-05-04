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
      'Contents Technologies (CT) is a leading content company that invests in IPs and technology-oriented businesses within the content value chain. They manage Asias largest music IP funds and are known for their innovative approach to IP investment.',
    url: 'http://contentstech.com/',
    website: 'http://contentstech.com/',
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
    website: 'http://www.oilnow.co.kr/',
  },
  {
    id: 3,
    brandImg: BrandLogo3SVG,
    modalImg: BrandLogoNavy3SVG,
    title: 'spendit',
    subTitle: 'Analytics & Software',
    contents:
      'Spendit is a top provider of corporate cards and automated expense management solutions for businesses. Their platform is trusted by leading companies across all industries to automate and streamline back-office functions.',
    url: 'http://www.spendit.kr/',
    website: 'http://www.spendit.kr/',
  },
  {
    id: 4,
    brandImg: BrandLogo4SVG,
    modalImg: BrandLogoNavy4SVG,
    title: 'Tablero',
    subTitle: 'Analytics & Software',
    contents:
      'Tablero offers a seamless dining experience for customers at restaurants, allowing them to order and pay via their app by scanning a QR code on the table.',
    url: 'https://tablero.co.kr/',
    website: 'https://tablero.co.kr/',
  },
  {
    id: 5,
    brandImg: BrandLogo5SVG,
    modalImg: BrandLogoNavy5SVG,
    title: 'Bacon Realism',
    subTitle: 'Food and Beverage',
    contents:
      'Bacon Realism is a premium bacon brand that offers high-quality, additive-free bacon in various flavors. Their natural ingredients make their bacon a healthy and flavorful ingredient for home cooks and restaurants.',
    url: 'https://www.baconrealism.com/',
    website: 'https://www.baconrealism.com/',
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
    website: 'https://platz.kr/',
  },
  {
    id: 7,
    brandImg: BrandLogo7SVG,
    modalImg: BrandLogoNavy7SVG,
    title: 'Gold Plate',
    subTitle: 'Food and Beverage',
    contents:
      'Gold Plate is a one-stop-shop for frozen food, offering the largest variety of products. They handle everything from development to branding and logistics and have 120+ OEM networks, 10+ killer IPs, and 15+ private label brands.',
    url: 'http://goldplate.co.kr/',
    website: 'http://goldplate.co.kr/',
  },
  {
    id: 8,
    brandImg: BrandLogo8SVG,
    modalImg: BrandLogoNavy8SVG,
    title: 'Daily Vegan',
    subTitle: 'Food and Beverage',
    contents:
      'Daily Vegan specializes in plant-based chicken with a texture and nutritional value similar to real chicken, thanks to their unique R&D and technology. Their product is a healthy and delicious option for vegans and those looking to reduce their meat consumption.',
    url: 'https://dailyvegan.co.kr/',
    website: 'https://dailyvegan.co.kr/',
  },
  {
    id: 9,
    brandImg: BrandLogo9SVG,
    modalImg: BrandLogo9SVG,
    title: 'Candy Plus',
    subTitle: 'Analytics & Software',
    contents:
      'Candy Plus is a popular camera filter application with over 300 million downloads and 40 million monthly active users worldwide. Their app offers a wide range of high-quality filters and easy-to-use interface, making it a top choice for customizing photos and videos.',
    url: 'https://apps.apple.com/kr/app/\n%EC%BA%94%EB%94%94%ED%94%8C%EB\n%9F%AC%EC%8A%A4-%EC%85%80%EC%B9%B4-%EB%B7\n%B0%ED%8B%B0-%EC%B9%B4%EB%A\n9%94%EB%9D%BC/id1589209843',
    website: 'IOS APPSTORE',
  },
  {
    id: 10,
    brandImg: BrandLogo10SVG,
    modalImg: BrandLogoNavy10SVG,
    title: 'Fact Block',
    subTitle: 'Web 3.0 Technology',
    contents:
      'Fact Block is the largest blockchain accelerator and community builder in Asia, known for their flagship event, Korea Blockchain Week, the largest and most successful blockchain conference in Asia.',
    url: 'https://factblock.com/',
    website: 'https://factblock.com/',
  },
  {
    id: 11,
    brandImg: BrandLogo11SVG,
    modalImg: BrandLogoNavy11SVG,
    title: 'Quantrack',
    subTitle: 'Analytics & Software',
    contents:
      'Quantrack offers AI-driven data analytics for stock trends and analysis reports, helping investors make informed decisions. Their reliable and user-friendly platform makes them a leader in the industry.',
    url: 'https://quantrack.hoztec.com/',
    website: 'https://quantrack.hoztec.com/',
  },
  {
    id: 12,
    brandImg: BrandLogo12SVG,
    modalImg: BrandLogoNavy12SVG,
    title: 'Aiden Lab',
    subTitle: 'Analytics & Software',
    contents:
      'Aiden Lab provides data-driven influencer marketing solutions using an advanced data-gathering AI engine. Their platform helps brands identify the right influencers for their target audience, optimize their marketing strategies, and measure campaign impact.',
    url: 'https://www.aidenlab.io/',
    website: 'https://www.aidenlab.io/',
  },
  {
    id: 13,
    brandImg: BrandLogo13SVG,
    modalImg: BrandLogoNavy13SVG,
    title: 'Mapia Company',
    subTitle: 'Content and IP',
    contents:
      'Mapia Company is the largest digital sheet music platform in Far East Asia, offering the most advanced sheet music platform for digital sheet music primarily for Korea and Japan.',
    url: 'https://www.mapiacompany.com/',
    website: 'https://www.mapiacompany.com/',
  },
  {
    id: 14,
    brandImg: BrandLogo14SVG,
    modalImg: BrandLogoNavy14SVG,
    title: 'Mosiler',
    subTitle: 'Analytics & Software',
    contents:
      'Mosiler is a premier driving companion service that provides transportation and other butler services on a subscription basis for high net worth individuals (HNWIs). Their subscription-based service provides a cost-effective and flexible solution for personalized and reliable transportation needs.',
    url: 'http://www.mosiler.com/',
    website: 'http://www.mosiler.com/',
  },
  {
    id: 15,
    brandImg: BrandLogo15SVG,
    modalImg: BrandLogoNavy15SVG,
    title: 'Mozaqi Home',
    subTitle: 'Lifestyle',
    contents:
      'Mozaqi is a furnishing platform that utilizes AI curation and styling to provide easy and stylish solutions for both homes and restaurants. They offer a wide range of high-quality and cost-effective private label brands, making it accessible for everyone to create their dream space.',
    url: 'https://mozaqihome.com/',
    website: 'https://mozaqihome.com/',
  },
];
