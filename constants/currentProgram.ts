// Спонсорские блоки для текущего сезона
const CURRENT_PRELAUNCH_SPONSOR = {
  type: 'sponsorStation',
  videoUrl: 'https://storage.yandexcloud.net/videos-meyou/efw2025/promo.mp4',
  title: 'The Showcase Station',
  description:
  `Emirates Fashion Week will unveil its Showcase Station at the pre-launch press conferences.
  Here, 80 beauty companies will present their latest services before and after the runway shows, as well as during the entire Beauty Showroom Day—an exclusive third-day event catering to an affluent audience passionate about fashion and beauty.`,
  buttonText: 'Learn More >',
  buttonLink: '/offer'
};

const CURRENT_FASHION_SHOW_SPONSOR = {
  type: 'sponsorStation',
  videoUrl: 'https://storage.yandexcloud.net/videos-meyou/efw2025/fd.mp4',
  title: 'The Dedicated designer popup corner',
  description: `Secure your Designer's Popup to showcase your collection in an exclusive, premium environment—connecting directly with buyers, media, and trendsetters. Meanwhile, discover the excitement of the Catwalk Show, where live runway presentations unveil new collections and styles. Whether you're presenting or exploring, our event offers a unique platform for visibility, collaboration, and inspiration.`,
  buttonText: 'Reserve Station >',
  buttonLink: '/offer'
};

const CURRENT_BEAUTY_EXPO_SPONSOR = {
  type: 'sponsorStation',
  videoUrl: 'https://storage.yandexcloud.net/videos-meyou/efw2025/bd.mp4',
  title: 'Explore 80 Stations with Beauty Service Providers',
  description: `Showcase your offerings, connect with potential clients, and discover new collaboration opportunities in a dynamic expo setting featuring 80 dedicated stations. Present your services, meet key representatives, and grow your business through impactful networking and real-time engagement.`,
  buttonText: 'Reserve Station >',
  buttonLink: '/offer'
};

export const CURRENT_PROGRAM_TABS = [
  { 
    title: 'Model Casting', 
    date: 'TBD 2026',
    mobileDate: 'TBD',
    events: [
      {
        type: 'event',
        time: 'TBD',
        place: 'Disclosed to Attendees',
        description: `Model Casting`,
        details: `WEDNESDAY & THURSDAY | INTERNATIONAL MODEL CONFERENCE & CASTING EVENT — organized by MAG, bringing together aspiring models to sign the contracts with leading Top Agencies from Milan, Paris, London and New York and to start your real model career right at the event
        <div class="mt-6">
        <div class="mt-2">
        <strong><a href="https://modelagentgroup.com/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">MAG – Model Agent Group</a></strong>
        <div class="mt-2">
        Worldwide Model Agency
        <div class="mt-2">
        Scouting / Development / Placement
        <div class="mt-2">
        Based in Austria
        <div class="mt-2">
        <strong>Registered Models Only</strong>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        `
      },
    ] 
  },
  { 
    title: `Fashion Shows 1<sup>st</sup> & 2<sup>nd</sup> Days`, 
    date: 'TBD 2026',
    mobileDate: 'TBD',
    events: [
      {
        type: 'event',
        time: 'TBD',
        place: `Skylight Gallery,<br>Arjaan Dubai Media City`,
        description: `SATURDAY |  PRÊT-À-PORTER WOMEN'S & MEN'S COLLECTIONS FW 26`,
        details: `<strong class="mb-2 block">By Invitation Only</strong>`,
        buttonText: 'REQUEST INVITE >',
        buttonLink: 'https://docs.google.com/forms/d/e/1FAIpQLSf9UiUI9FshAS-G9Ikkdj5Pq9DV3zkwtqdNdoNXeLxe2LQeEQ/viewform'
      },
      CURRENT_FASHION_SHOW_SPONSOR,
       {
         type: 'event',
         time: 'TBD',
         place: `Skylight Gallery,<br>Arjaan Dubai Media City`,
         description: `SUNDAY |  PRÊT-À-PORTER WOMEN'S & MEN'S COLLECTIONS FW 26`,
         details: `<strong class="mb-2 block">By Invitation Only</strong>`,
         buttonText: 'REQUEST INVITE >',
         buttonLink: 'https://docs.google.com/forms/d/e/1FAIpQLSf9UiUI9FshAS-G9Ikkdj5Pq9DV3zkwtqdNdoNXeLxe2LQeEQ/viewform'
       },
    ] 
  },
    { 
    title: `Pop-Up Market 3<sup>rd</sup> & 4<sup>th</sup> Days`, 
    date: 'TBD 2026',
    mobileDate: 'TBD',
    events: [
      {
        type: 'event',
        time: 'TBD',
        place: `Skylight Gallery,<br>Arjaan Dubai Media City`,
        description: `MONDAY | BEAUTY DAY`,
         details: `
          <strong>Free Entry | 10:00–18:00</strong>
           <div class="mt-4">
           <ul class="space-y-2 text-sm">
             <li>• 40 Designer Collection Pop-ups</li>
             <li>• Beauty & cosmetics brands</li>
             <li>• MUAs, nails, brows/lashes</li>
             <li>• Salons, spas, bridal beauty</li>
             <li>• Makeup & cosmetology schools / courses</li>
           </ul>
           </div>
         `,
      },
      {
        type: 'event',
        time: 'TBD',
        place: `Skylight Gallery,<br>Arjaan Dubai Media City`,
        description: `TUESDAY | WELLNESS DAY`,
         details: `
          <strong>Free Entry | 10:00–18:00</strong>
           <div class="mt-4">
           <ul class="space-y-2 text-sm">
             <li>• 40 Designer Collection Pop-ups</li>
             <li>• Medical & aesthetic clinics</li>
             <li>• Health & wellness tourism, nutrition</li>
             <li>• Spas, massage, barbers</li>
             <li>• Gyms & wellness studios</li>
             <li>• Beauty tech (CRM, booking, payments)</li>
             <li>• Salon & clinic equipment suppliers</li>
           </ul>
           </div>
         `,
      },
    ] 
  },
  { 
    title: 'Beauty Awards', 
    date: 'TBD 2026',
    mobileDate: 'TBD',
    events: [
      {
        type: 'event',
        time: 'TBD',
        place: `Skylight Gallery,<br>Arjaan Dubai Media City`,
        description: `MONDAY TONIGHT | The award ceremony, Gala Dinner, and IntroduceMe Talk Show for VIP Buyers, Designers, Exhibitors, Influencers & Authorities`,
        details: `
          <strong>By Invitation Only</strong>
        `,
      },
    ] 
  },
];

