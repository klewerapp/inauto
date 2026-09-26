export function PaymentMarks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`pay-marks ${compact ? 'is-compact' : ''}`}>
      <span>Paiement</span>
      <VisaMark />
      <MastercardMark />
      <PaypalMark />
    </div>
  )
}

export function VisaMark() {
  return (
    <svg className="pay-logo pay-visa" viewBox="0 0 64 40" role="img" aria-label="Visa">
      <rect width="64" height="40" rx="6" fill="#1A1F71" />
      <text x="32" y="26" textAnchor="middle" fill="#fff" fontFamily="Georgia, serif" fontStyle="italic" fontSize="16" fontWeight="700">
        VISA
      </text>
    </svg>
  )
}

export function MastercardMark() {
  return (
    <svg className="pay-logo" viewBox="0 0 64 40" role="img" aria-label="Mastercard">
      <rect width="64" height="40" rx="6" fill="#fff" stroke="#e6e0d8" />
      <circle cx="26" cy="20" r="10" fill="#EB001B" />
      <circle cx="38" cy="20" r="10" fill="#F79E1B" />
      <path d="M32 12.4a10 10 0 0 1 0 15.2 10 10 0 0 1 0-15.2Z" fill="#FF5F00" />
    </svg>
  )
}

export function PaypalMark() {
  return (
    <svg className="pay-logo pay-paypal" viewBox="0 0 78 40" role="img" aria-label="PayPal">
      <rect width="78" height="40" rx="6" fill="#fff" stroke="#e6e0d8" />
      <text x="39" y="26" textAnchor="middle" fontFamily="Verdana, sans-serif" fontSize="13" fontWeight="700">
        <tspan fill="#003087">Pay</tspan>
        <tspan fill="#009cde">Pal</tspan>
      </text>
    </svg>
  )
}
