import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './Estilos.css';
import pfpicture from '../images/log.png';
import revista1 from '../images/revista1.jpg';
import revista2 from '../images/revista2.jpg';



const Perfil = () => {
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        tipoUsuario: "",
        
    });

    // Obtener parámetros de la URL usando useLocation
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    useEffect(() => {
        // Obtener información del usuario en el localstorage
        const storedData = localStorage.getItem("userData");
        const userData = storedData ? JSON.parse(storedData) : {};

        // Uasr datos del localstorage para el perfil
        const nombreParam = params.get("nombre");
        const apellidoParam = params.get("apellido");
        const tipoUsuarioParam = params.get("tipoUsuario");
        const fechaNacimientoParam = params.get("fechaNacimiento");

        if (nombreParam && apellidoParam && tipoUsuarioParam) {
            setUsuario({
                nombre: nombreParam,
                apellido: apellidoParam,
                tipoUsuario: tipoUsuarioParam,
                fechaNacimiento: fechaNacimientoParam,
            });
        } else {
            
            setUsuario({
                nombre: userData.nombre || "",
                apellido: userData.apellido || "",
                tipoUsuario: userData.tipoUsuario || "",
                fechaNacimiento: userData.fechaNacimiento || "",
            });
        }
    }, [params]);

    
    return (
        <body>
            <header>
                <div id="botontitulo">
                    <h1><Link to="/">Revistas Científicas Uleam</Link></h1>
                </div>
                <div id="navegacion">
                    <nav>
                        <ul>
                            <li><Link to="/revistas">Revistas</Link></li>   
                            <li><Link to="/login">Cerrar Sesión</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div id="perfil" className="perfil-container">
                <div className="imagen-perfil">
                    <img src={pfpicture} alt={`Foto de perfil de ${usuario.nombre} ${usuario.apellido}`} />
                </div>
                <div className="info-perfil">
                    <h2>{`${usuario.nombre} ${usuario.apellido}`}</h2>
                    <p>{`Tipo de usuario: ${usuario.tipoUsuario}`}</p>
                    <p>{`Cumpleaños: ${usuario.fechaNacimiento}`}</p>
                </div>
            </div>

    <div id="mis-revistas">
        <h2>Mis Revistas</h2>

        <div class="revista">
            <div class="imagen-revista">
                <img src={revista1} alt="Portada de Mi Revista 1"/>
            </div>
            <div class="info-revista">
                <h3>Mi Revista 1</h3>
                <p><strong>Autores:</strong> {usuario.nombre} {usuario.apellido} , Dr. Investigador</p>
                <p><strong>Fecha de Publicación:</strong> Octubre 2023</p>
                <p><strong>Descripción:</strong> Una revista dedicada a la exploración de nuevas tecnologías y avances científicos.</p>
            </div>
        </div>

        <div class="revista">
            <div class="imagen-revista">
                <img src={revista2} alt="Portada de Mi Revista 2"/>
            </div>
            <div class="info-revista">
                <h3>Mi Revista 2</h3>
                <p><strong>Autores:</strong> {usuario.nombre} {usuario.apellido} , Dra. Investigadora</p>
                <p><strong>Fecha de Publicación:</strong> Noviembre 2023</p>
                <p><strong>Descripción:</strong> Explorando los misterios de la ciencia y la tecnología en la era moderna.</p>
            </div>
        </div>



    </div>


            <button className="cta-button"><Link to="/gestionrevista">Revista</Link></button>

            <footer>
                <p>&copy;<strong>2023 Universidad Laica Eloy Alfaro de Manabí. Todos los derechos reservados.</strong></p>
            </footer>
        </body>
    );
}

export default Perfil;
