import Link from 'next/link' 
import { removeCookies } from 'cookies-next'
import { useRouter } from 'next/router'

const NavbarAdmin = () => {

  const router = useRouter()

  const closeSession = () => {
    removeCookies('token')
    router.push('/')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">technical test</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link href="/admin"> 
            <a className="nav-link" href="#">Registros</a>
          </Link>
          <Link href="/admin/create"> 
            <a className="nav-link" href="#">Crear nuevo</a>
          </Link>
          <button 
            type="button" 
            className="btn btn-dark"
            onClick={() => closeSession()}
          >
            Cerrar sesion
          </button>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default NavbarAdmin