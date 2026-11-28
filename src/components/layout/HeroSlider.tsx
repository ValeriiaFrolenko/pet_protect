import { useEffect, useState, type FocusEvent } from 'react';
import { HERO_SLIDES } from '../../app/heroSlides';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { shiftIndex } from '../../lib/slider';

const AUTOPLAY_MS = 5000;

export function HeroSlider() {
    const reducedMotion = usePrefersReducedMotion();
    const [index, setIndex] = useState(0);
    const [isUserPaused, setIsUserPaused] = useState(false);
    const [isInteracting, setIsInteracting] = useState(false);

    const count = HERO_SLIDES.length;
    const isAutoplaying = count > 1 && !reducedMotion && !isUserPaused && !isInteracting;

    useEffect(() => {
        if (!isAutoplaying) {
            return;
        }

        const timer = window.setTimeout(() => {
            setIndex((current) => shiftIndex(current, 1, count));
        }, AUTOPLAY_MS);

        return () => window.clearTimeout(timer);
    }, [index, isAutoplaying, count]);

    if (count === 0) {
        return null;
    }

    const handleBlur = (event: FocusEvent<HTMLElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsInteracting(false);
        }
    };

    return (
        <section
            className="slider"
            aria-roledescription="carousel"
            aria-label="Featured"
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onFocus={() => setIsInteracting(true)}
            onBlur={handleBlur}
        >
            <div className="slider__viewport">
                <ul
                    className="slider__track"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                    aria-live={isAutoplaying ? 'off' : 'polite'}
                >
                    {HERO_SLIDES.map((slide, slideIndex) => (
                        <li
                            key={slide.id}
                            className="slider__slide"
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${slideIndex + 1} of ${count}`}
                            aria-hidden={slideIndex !== index}
                        >
                            <img
                                className="slider__image"
                                src={slide.src}
                                alt={slide.alt}
                                width={1600}
                                height={200}
                                loading={slideIndex === 0 ? 'eager' : 'lazy'}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {count > 1 && (
                <div className="slider__bar">
                    <button
                        type="button"
                        className="slider__control"
                        aria-label="Previous slide"
                        onClick={() => setIndex((current) => shiftIndex(current, -1, count))}
                    >
                        ‹
                    </button>
                    {HERO_SLIDES.map((slide, slideIndex) => (
                        <button
                            key={slide.id}
                            type="button"
                            className="slider__dot"
                            aria-label={`Go to slide ${slideIndex + 1}`}
                            aria-current={slideIndex === index}
                            onClick={() => setIndex(slideIndex)}
                        />
                    ))}
                    <button
                        type="button"
                        className="slider__control"
                        aria-label="Next slide"
                        onClick={() => setIndex((current) => shiftIndex(current, 1, count))}
                    >
                        ›
                    </button>

                    {!reducedMotion && (
                        <button
                            type="button"
                            className="slider__toggle"
                            aria-pressed={isUserPaused}
                            onClick={() => setIsUserPaused((paused) => !paused)}
                        >
                            {isUserPaused ? 'Play' : 'Pause'}
                        </button>
                    )}
                </div>
            )}
        </section>
    );
}
