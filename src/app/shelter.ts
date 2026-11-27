// Replace these placeholder values with the real shelter data.
export const SHELTER = {
    name: 'Pet Protect Shelter',
    address: 'Khreshchatyk St, Kyiv, Ukraine',
    phone: '+380 44 000 00 00',
    email: 'info@petprotect.example',
    hours: [
        { days: 'Mon–Fri', time: '09:00–18:00' },
        { days: 'Sat–Sun', time: '10:00–16:00' },
    ],
    location: { lat: 50.4501, lng: 30.5234 },
} as const;
