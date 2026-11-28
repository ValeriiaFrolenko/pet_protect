export type DecorationShape = 'flower' | 'spark' | 'heart';

const PATHS: Readonly<Record<DecorationShape, string>> = {
    flower: 'M50 38C42 -4 98 12 62 44C104 32 100 90 61 61C82 100 24 106 41 63C6 90-8 32 38 44C6 16 52-6 50 38Z',
    spark: 'M50 0C54 34 66 46 100 50C66 54 54 66 50 100C46 66 34 54 0 50C34 46 46 34 50 0Z',
    heart: 'M50 90C-20 46 14-4 50 28C86-4 120 46 50 90Z',
};

interface DecorationProps {
    shape: DecorationShape;
    className?: string;
}

export function Decoration({ shape, className = '' }: DecorationProps) {
    return (
        <svg
            className={`decoration ${className}`}
            viewBox="0 0 100 100"
            aria-hidden="true"
            focusable="false"
        >
            <path d={PATHS[shape]} />
        </svg>
    );
}
