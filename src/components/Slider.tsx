import { useState } from 'react'

type Props = {
  images: string[]
  label: string
}

export function Compare({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50)

  return (
    <div className="compare-card">
      <img src={after} alt="Après" />
      <img
        className="is-before"
        src={before}
        alt="Avant"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <span className="compare-tag compare-tag-before">Avant</span>
      <span className="compare-tag compare-tag-after">Après</span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-label="Comparer avant et après"
        onChange={(event) => setPos(Number(event.target.value))}
      />
    </div>
  )
}

export function Slider({ images, label }: Props) {
  const [index, setIndex] = useState(0)
  const count = images.length
  const previous = () => setIndex((current) => (current - 1 + count) % count)
  const next = () => setIndex((current) => (current + 1) % count)

  return (
    <div className="slider">
      <img src={images[index]} alt={`${label}, photo ${index + 1}`} />
      {count > 1 && (
        <>
          <button type="button" className="slider-prev" onClick={previous} aria-label="Photo précédente">
            ‹
          </button>
          <button type="button" className="slider-next" onClick={next} aria-label="Photo suivante">
            ›
          </button>
          <span className="slider-count">
            {index + 1} / {count}
          </span>
        </>
      )}
    </div>
  )
}
