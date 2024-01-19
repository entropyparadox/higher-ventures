import BrandLogo1SVG from 'public/assets/svg/brand-logo1.png';
import BrandLogoNavy1SVG from 'public/assets/svg/brand-logo1-navy.png';
import BrandLogo2SVG from 'public/assets/svg/brand-logo2.png';
import BrandLogoNavy2SVG from 'public/assets/svg/brand-logo2-navy.png';
import BrandLogo3SVG from 'public/assets/svg/brand-logo3.png';
import BrandLogoNavy3SVG from 'public/assets/svg/brand-logo3-navy.png';
import BrandLogo5SVG from 'public/assets/svg/brand-logo5.png';
import BrandLogoNavy5SVG from 'public/assets/svg/brand-logo5-navy.png';
import BrandLogo8SVG from 'public/assets/svg/brand-logo8.png';
import BrandLogoNavy8SVG from 'public/assets/svg/brand-logo8-navy.png';
import BrandLogo10SVG from 'public/assets/svg/brand-logo10.png';
import BrandLogoNavy10SVG from 'public/assets/svg/brand-logo10-navy.png';
import BrandLogo11SVG from 'public/assets/svg/brand-logo11.png';
import BrandLogoNavy11SVG from 'public/assets/svg/brand-logo11-navy.png';
import BrandLogo12SVG from 'public/assets/svg/brand-logo12.png';
import BrandLogoNavy12SVG from 'public/assets/svg/brand-logo12-navy.png';
import BrandLogo13SVG from 'public/assets/svg/brand-logo13.png';
import BrandLogoNavy13SVG from 'public/assets/svg/brand-logo13-navy.png';
import BrandLogo15SVG from 'public/assets/svg/brand-logo15.png';
import BrandLogoNavy15SVG from 'public/assets/svg/brand-logo15-navy.png';
import BrandLogo16SVG from 'public/assets/svg/brand-logo16.png';
import BrandLogoNavy16SVG from 'public/assets/svg/brand-logo16-navy.png';
import BrandLogo17SVG from 'public/assets/svg/brand-logo17.png';
import BrandLogoNavy17SVG from 'public/assets/svg/brand-logo17-navy.png';
import BrandLogo18SVG from 'public/assets/svg/brand-logo18.png';
import BrandLogoNavy18SVG from 'public/assets/svg/brand-logo18-navy.png';
import BrandLogo19SVG from 'public/assets/svg/brand-logo19.png';
import BrandLogoNavy19SVG from 'public/assets/svg/brand-logo19-navy.png';
import BrandLogo20SVG from 'public/assets/svg/brand-logo20.png';
import BrandLogoNavy20SVG from 'public/assets/svg/brand-logo20-navy.png';
import BrandLogo21SVG from 'public/assets/svg/brand-logo21.png';
import BrandLogoNavy21SVG from 'public/assets/svg/brand-logo21-navy.png';
import BrandLogo22SVG from 'public/assets/svg/brand-logo22.png';
import BrandLogoNavy22SVG from 'public/assets/svg/brand-logo22-navy.png';
import BrandLogo23SVG from 'public/assets/svg/brand-logo23.png';
import BrandLogoNavy23SVG from 'public/assets/svg/brand-logo23-navy.png';

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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
    brandImg: BrandLogo15SVG,
    modalImg: BrandLogoNavy15SVG,
    title: 'Nabita World',
    subTitle: 'Import Plaything',
    contents:
      'Nabita World is a leading distributor of premium toys from North America and Europe in Korea. With a 20-year track record, they also offer senior toys and welfare products, catering to individuals from 0 to 100 years old. Nabita World is committed to enhancing lives through quality products and exceptional service, ensuring customer satisfaction. Choose Nabita World for access to innovative toys that inspire joy and imagination.',
    url: 'https://www.nabita.co.kr/',
    website: 'https://www.nabita.co.kr/',
  },
  {
    id: 11,
    brandImg: BrandLogo16SVG,
    modalImg: BrandLogoNavy16SVG,
    title: 'Nexgen Power',
    subTitle: 'Power Semiconductor',
    contents:
      'Nexgen Power is a leading global semiconductor designer and manufacturer specializing in high power technology. Established in 2019 with strong support and investments, they offer innovative solutions in SJ-MOSFET, Power Modules, IGBT, and FRD. With experienced professionals from top semiconductor companies, Nexgen Power is revolutionizing the industry. Trust in their cutting-edge solutions for the future of power technology.',
    url: 'http://nexgenpwr.com/',
    website: 'http://nexgenpwr.com/',
  },
  {
    id: 12,
    brandImg: BrandLogo17SVG,
    modalImg: BrandLogoNavy17SVG,
    title: 'Opq',
    subTitle: 'Design and Lifestyle',
    contents:
      'Opq is a pioneering online platform, providing a seamless browsing and purchasing experience for heritage furniture brands. With its advanced AI-based search engine and robust data collection and processing capabilities, Opq offers users an exploratory journey into the world of timeless furniture. Discover, browse, and effortlessly buy heritage furniture with Opq.',
    url: 'http://www.opq.ooo/',
    website: 'http://www.opq.ooo/',
  },
  {
    id: 13,
    brandImg: BrandLogo18SVG,
    modalImg: BrandLogoNavy18SVG,
    title: 'Kopher',
    subTitle: 'Beauty & Cosmetics',
    contents:
      'KOPHER provides premium cosmetics and distinguishes itself by actively collaborating with brand owners at every stage, from initial concept to production, marketing, and export consultancy. Their in-house system guarantees products that truly embody the brand is essence and vision.',
    url: 'http://www.bestinnovation.co.kr/',
    website: 'http://www.bestinnovation.co.kr/',
  },
  {
    id: 14,
    brandImg: BrandLogo19SVG,
    modalImg: BrandLogoNavy19SVG,
    title: 'POTS Company',
    subTitle: 'Lifestyle',
    contents:
      'POTS is dedicated to enhancing indoor spaces by fostering a harmonious relationship between people and plants, recognizing the profound impact of indoor environments on individuals, and promoting positivity and enjoyment through greenery. Under its brand, SundayPlanet47, POTS offers a range of products, including skincare, scents, and foods derived from plants.',
    url: 'https://sundayplanet47.com/',
    website: 'https://sundayplanet47.com/',
  },
  {
    id: 15,
    brandImg: BrandLogo20SVG,
    modalImg: BrandLogoNavy20SVG,
    title: 'SURF',
    subTitle: 'Analytics & Software',
    contents:
      'SURF is a vital platform for content creators, seamlessly connecting music transactions across countries and aggregating a vast repository of valuable big data, revolutionizing the music industry by eliminating low-expertise, inefficient middlemen.',
    url: 'https://discover.surf/',
    website: 'https://discover.surf/',
  },
  {
    id: 16,
    brandImg: BrandLogo21SVG,
    modalImg: BrandLogoNavy21SVG,
    title: 'SLEEK',
    subTitle: 'Analytics and Software',
    contents:
      'Sleek is committed to advancing global health with a product-oriented approach, primarily through its HiFive platform, aiming to develop a comprehensive "Wellness Super App" to serve both fitness operators and consumers.',
    url: 'https://www.sleek.kr/',
    website: 'https://www.sleek.kr/',
  },
  {
    id: 17,
    brandImg: BrandLogo22SVG,
    modalImg: BrandLogoNavy22SVG,
    title: 'Collectiv',
    subTitle: 'Analytics and Software',
    contents:
      'Collectiv is a leading secondhand fashion platform dedicated to staying ahead of trends through in-depth market analysis. The platform provides users with curated and up-to-date fashion choices while promoting sustainability in the fashion industry.',
    url: 'https://collectiv.kr/',
    website: 'https://collectiv.kr/',
  },
  {
    id: 18,
    brandImg: BrandLogo23SVG,
    modalImg: BrandLogoNavy23SVG,
    title: 'TagHive',
    subTitle: 'Analytics and Software',
    contents:
      'TagHive, a Samsung-funded education technology company, offers innovative solutions like Class Saathi, enabling seamless communication among students, teachers, parents, and administrators to enhance learning outcomes with data-driven insights. Adopted by over 5,000 schools in India and South Korea, it benefits more than 430,000 students.',
    url: 'https://tag-hive.com/',
    website: 'https://tag-hive.com/',
  },
];
