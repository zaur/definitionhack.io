const siteUrl = 'https://ceramify.xyz';

export default function getMeta (
  title = 'NFT 2.0: interaction, composition and generative art',
  description = 'NFT 2.0: interaction, composition and generative art',
  poster = siteUrl +'/images/poster.png',
  route = undefined,
) {
  const titlePostfix = ' - Ceramify';
  let url;
  let pageMeta;

  if (route) {
    // url = location.protocol + '//' + location.hostname + route.fullPath
    url = siteUrl + route.path;
  }

  if (!url) {
    pageMeta = [];
  } else {
    pageMeta = [
      { hid: 'canonical', rel: 'canonical', href: url },
      { hid: 'og:url', property: 'og:url', content: url },
      { property: 'al:web:url', content: url },
    ];
  }

  return {
    title: title + titlePostfix,
    meta: [
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:title', property: 'og:title', content: title + titlePostfix },
      { hid: 'og:image', property: 'og:image', content: poster },
      { hid: 'og:description', property: 'og:description', content: description },
      { property: 'og:site:name', content: 'BQ Media' },
      { property: 'og:type', content: 'website' },
      { hid: 'og:image:height', property: 'og:image:height', content: 720 },
      { hid: 'og:image:width', property: 'og:image:width', content: 1200 },
      { hid: 'itemprop:name', itemprop: 'name', content: title + titlePostfix },
      { hid: 'itemprop:description', itemprop: 'description', content: description },
      { hid: 'itemprop:image', itemprop: 'image', content: poster },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@ceramify' },
      { hid: 'twitter:title', name: 'twitter:title', content: title + titlePostfix },
      { hid: 'twitter:description', name: 'twitter:description', content: description },
      { hid: 'twitter:image', name: 'twitter:image', content: poster },
      ...pageMeta,
      { hid: 'charset', charset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width,minimum-scale=1,initial-scale=1' },
      { hid: 'yandex-verification', name: 'yandex-verification', content: '621ec301670a4af9' },
    ],
  };
};
