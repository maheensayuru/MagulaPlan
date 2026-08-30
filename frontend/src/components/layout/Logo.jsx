import { Link } from 'react-router-dom'
import logoFull from '../../assets/logo-full.webp'

// Official transparent lockup, used whole: icon, "MAGULAPLAN" wordmark, and
// the "WEDDING PLANNERS | SRI LANKA" tagline are never cropped out.
export default function Logo() {
  return (
    <Link to="/" className="flex items-center shrink-0" aria-label="MagulaPlan home">
      <img src={logoFull} alt="MagulaPlan: Wedding Planners, Sri Lanka" className="h-11 sm:h-14 lg:h-16 w-auto object-contain" />
    </Link>
  )
}
