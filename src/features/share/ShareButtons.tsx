import { useState } from 'react';
import { SHARE_TARGETS, type ShareContent } from './shareTargets';

type CopyState = 'idle' | 'copied' | 'failed';

const COPY_MESSAGES: Readonly<Record<CopyState, string>> = {
    idle: '',
    copied: 'Link copied',
    failed: 'Could not copy the link',
};

export function ShareButtons({ url, title }: ShareContent) {
    const [copyState, setCopyState] = useState<CopyState>('idle');

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopyState('copied');
        } catch {
            // The Clipboard API is missing on insecure origins and can be denied by the browser.
            setCopyState('failed');
        }
    };

    return (
        <div className="share" role="group" aria-label="Share">
            <span className="share__label">Share:</span>
            {SHARE_TARGETS.map((target) => (
                <a
                    key={target.id}
                    className="button button--quiet"
                    href={target.buildHref({ url, title })}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {target.label}
                </a>
            ))}
            <button type="button" className="button button--quiet" onClick={() => void copyLink()}>
                Copy link
            </button>
            <span className="share__status" role="status">
                {COPY_MESSAGES[copyState]}
            </span>
        </div>
    );
}
