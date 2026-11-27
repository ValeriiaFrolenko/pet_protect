export interface ShareContent {
    url: string;
    title: string;
}

export interface ShareTarget {
    id: string;
    label: string;
    buildHref: (content: ShareContent) => string;
}

export const SHARE_TARGETS: readonly ShareTarget[] = [
    {
        id: 'facebook',
        label: 'Facebook',
        buildHref: ({ url }) =>
            `https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({ u: url })}`,
    },
    {
        id: 'telegram',
        label: 'Telegram',
        buildHref: ({ url, title }) =>
            `https://t.me/share/url?${new URLSearchParams({ url, text: title })}`,
    },
    {
        id: 'x',
        label: 'X',
        buildHref: ({ url, title }) =>
            `https://x.com/intent/post?${new URLSearchParams({ url, text: title })}`,
    },
];
