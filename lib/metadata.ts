import { Metadata } from 'next';

export const siteConfig = {
    name: 'Belgain Cars',
    url:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://belgian-cars.vercel.app',
    ogImage: '/cover.webp',
    description: '',
};

const metadataKeyWords = [
    'Belgain Cars',
    'WebShark'
];

export const defaultMetadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: metadataKeyWords,
    authors: [
        {
            name: 'Oleksii Bortnytskyi',
            url: 'https://bortnytskyi.vercel.app',
        },
    ],
    creator: 'Oleksii Bortnytskyi',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: '@websharkdev',
    },
    icons: {
        icon: '/favicon.ico',
    },
    manifest: '/site.webmanifest',
};
