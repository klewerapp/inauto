import { useEffect, useState, type CSSProperties } from 'react'

let svgRequest: Promise<string> | null = null

function loadSvg() {
  svgRequest ??= fetch('/mats/diamond.svg')
    .then((response) => response.text())
    .then((text) => text.replace(/<\?xml[^>]*>\s*/, ''))
  return svgRequest
}

type Props = {
  mat: string
  edge: string
  heel: boolean
}

export function MatPreview({ mat, edge, heel }: Props) {
  const [svg, setSvg] = useState('')

  useEffect(() => {
    let active = true
    loadSvg().then((markup) => {
      if (active) setSvg(markup)
    })
    return () => {
      active = false
    }
  }, [])

  const style = {
    '--mat-color': mat,
    '--edge-color': edge,
  } as CSSProperties

  return (
    <div className="mat-live" style={style}>
      {svg ? (
        <div className="mat-live-svg" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="mat-live-wait" aria-hidden="true" />
      )}
      {heel && <span className="mat-heel" aria-hidden="true" />}
    </div>
  )
}
