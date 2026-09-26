import { Link } from 'react-router-dom'

export function Privacy() {
  return (
    <main className="legal">
      <p className="eyebrow">Confidentialité</p>
      <h1>Politique de confidentialité</h1>
      <p>
        Les informations demandées — téléphone ou WhatsApp, e-mail, nom, adresse de
        livraison et choix du véhicule — servent uniquement à fabriquer l’ensemble,
        le livrer et vous recontacter au sujet de la commande.
      </p>
      <p>
        Elles ne sont pas vendues. Vous pouvez demander leur accès, leur correction
        ou leur suppression en écrivant via le formulaire du site ou en appelant le
        +33 6 88 48 16 01.
      </p>
      <p>
        Le paiement par Visa, Mastercard ou PayPal sera traité par un prestataire
        certifié dès son branchement. Les numéros de carte ne sont pas saisis sur
        ce site tant que ce prestataire n’est pas en place.
      </p>
      <p>
        <Link to="/">Retour à l’accueil</Link>
      </p>
    </main>
  )
}
