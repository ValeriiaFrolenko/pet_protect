import { useEffect, useState, type FocusEvent, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { HERO_SLIDES } from '../../app/heroSlides';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { shiftIndex } from '../../lib/slider';

const AUTOPLAY_MS = 5000;

function PlaybackIcon({ isPaused }: { isPaused: boolean }) {
    return (
        <svg className="slider__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d={isPaused ? 'M4 2L14 8L4 14Z' : 'M3 2H6.5V14H3ZM9.5 2H13V14H9.5Z'} />
        </svg>
    );
}

export function HeroSlider({ id }: { id: string }) {
    const reducedMotion = usePrefersReducedMotion();
    const [index, setIndex] = useState(0);
    const [isUserPaused, setIsUserPaused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false);

    const count = HERO_SLIDES.length;
    const isAutoplaying =
        count > 1 && !reducedMotion && !isUserPaused && !isHovered && !hasKeyboardFocus;

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

    // Touch devices emulate hover on tap and never "leave", so only a real mouse pauses.
    const handlePointer = (hovered: boolean) => (event: PointerEvent) => {
        if (event.pointerType === 'mouse') {
            setIsHovered(hovered);
        }
    };

    const handleFocus = (event: FocusEvent<HTMLElement>) => {
        setHasKeyboardFocus(event.target.matches(':focus-visible'));
    };

    const handleBlur = (event: FocusEvent<HTMLElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setHasKeyboardFocus(false);
        }
    };

    return (
        <section
            id={id}
            className="slider"
            aria-roledescription="carousel"
            aria-label="Featured"
            onPointerEnter={handlePointer(true)}
            onPointerLeave={handlePointer(false)}
            onFocus={handleFocus}
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
                            className={`slider__slide slider__slide--${slide.theme}`}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${slideIndex + 1} of ${count}`}
                            inert={slideIndex !== index}
                        >
                            <div className="slider__caption">
                                <p className="slider__title">{slide.title}</p>
                                <Link className="button" to={slide.action.to}>
                                    {slide.action.label}
                                </Link>
                            </div>
                            <div className="slider__photos">
                                {slide.photos.map((photo) => (
                                    <img
                                        key={photo}
                                        className="slider__photo"
                                        src={photo}
                                        alt=""
                                        width={160}
                                        height={120}
                                        fetchPriority={slideIndex === 0 ? 'high' : 'low'}
                                    />
                                ))}
                            </div>
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
                            className="slider__control"
                            aria-label={isUserPaused ? 'Play slideshow' : 'Pause slideshow'}
                            title={isUserPaused ? 'Play slideshow' : 'Pause slideshow'}
                            onClick={() => setIsUserPaused((paused) => !paused)}
                        >
                            <PlaybackIcon isPaused={isUserPaused} />
                        </button>
                    )}
                </div>
            )}
        </section>
    );
}
