import React from "react";
import { Link } from 'react-router-dom';
import './Estilos.css';
import pikaimage from '../images/pika.png';
import killuaimage from '../images/killua.png';

const Homeweb = () => {
    return (
        <div>
            <header>
                <div id="botontitulo">
                    <h1><Link to="/">Revistas Científicas Uleam</Link></h1>
                </div>
                <div id="navegacion">
                    <nav>
                        <ul>
                            <li><Link to="/revistas">Revistas</Link></li>
                            <li><Link to="/registro">Registrate</Link></li>
                            <li><Link to="/login">Log in</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div id="main">
                <div id="textomain">
                    <h2>Bienvenido a Revistas Científicas Uleam</h2>
                    <p>Encuentra o agrega revistas científicas</p>
                    <Link to="/login" className="cta-button">Empezar</Link>
                </div>
            </div>
            <section className="carrousel">
                <h2>Encuentra</h2>
                <div className="contenido" id="r1">
                    <h3>Revistas</h3>
                </div>
                <div className="contenido" id="r2">
                    <h3>Trabajos</h3>
                </div>
                <div className="contenido" id="r3">
                    <h3>Proyectos</h3>
                </div>
            </section>
            <div id="contacto">
                <h2>¿Quieres ser parte de esta gran comunidad?</h2>
                <div id="imagen-contacto">
                    <img src={pikaimage} alt="Tu imagen publicitaria" />
                </div>
                <p>Es tu momento de publicar tu revista científica.</p>
                <Link to="/registro" className="cta-button">Registrate</Link>
            </div>
            <div id="contacto">
                <h2>Contacto</h2>
                <div id="imagen-contacto">
                    <img src={killuaimage} alt="imagen contacto" />
                </div>
                <p>¿Tienes alguna pregunta? Estamos aquí para ayudarte.</p>
                <Link to="/contacto" className="cta-button">Contáctanos</Link>
            </div>
            <footer>
                <p>&copy;<strong>2023 Universidad Laica Eloy Alfaro de Manabí. Todos los derechos reservados.</strong></p>
            </footer>
        </div>
    );
};

export default Homeweb;
