import { useEffect, useId, useRef, useState } from 'react'

export type ComboOption = {
  value: string
  label: string
  logo?: string
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

export function ComboBox({
  label,
  placeholder,
  value,
  options,
  onChange,
  disabled,
}: {
  label: string
  placeholder: string
  value: string
  options: ComboOption[]
  onChange: (value: string) => void
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()
  const selected = options.find((option) => option.value === value)

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    return () => document.removeEventListener('mousedown', onPointer)
  }, [])

  const filtered = options.filter((option) =>
    normalize(option.label).includes(normalize(query)),
  )

  return (
    <div className={`combo ${disabled ? 'is-disabled' : ''}`} ref={rootRef}>
      <span className="field-label">{label}</span>
      <button
        type="button"
        className="combo-btn"
        disabled={disabled}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => {
          if (disabled) return
          setOpen((current) => !current)
          setQuery('')
        }}
      >
        <span className={selected ? '' : 'is-placeholder'}>
          {selected?.logo && (
            <img className="combo-logo" src={selected.logo} alt="" />
          )}
          {selected?.label ?? placeholder}
        </span>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      {open && (
        <div className="combo-pop" id={listId}>
          <input
            autoFocus
            value={query}
            placeholder="Rechercher"
            onChange={(event) => setQuery(event.target.value)}
          />
          <ul>
            {filtered.length === 0 && <li className="combo-empty">Aucun résultat</li>}
            {filtered.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className={option.value === value ? 'is-active' : ''}
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                >
                  {option.logo && <img src={option.logo} alt="" />}
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
