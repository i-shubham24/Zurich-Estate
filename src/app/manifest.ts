import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Optimal Immobilien AG',
    short_name: 'Optimal',
    description:
      'Optimal Immobilien AG verkauft Ihre Immobilie in Zürich provisionsfrei zum Fixpreis von CHF 12\u2019000.–',
    start_url: '/',
    display: 'standalone',
    theme_color: '#191e23',
    background_color: '#faf8f3',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
