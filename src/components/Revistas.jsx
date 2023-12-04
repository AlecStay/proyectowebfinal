import React from "react";
import './Estilos.css';
import revista1 from '../images/revista1.jpg';

const Revistas = () => {
    // Obtener información de revistas desde el localStorage
    const storedRevistas = localStorage.getItem("revistasData");
    const revistasData = storedRevistas ? JSON.parse(storedRevistas) : [];

    return (
        <div id="bodyrevistas">
            <header>
                <div id="botontitulo">
                    <h1><a href="/">Revistas Científicas Uleam</a></h1>
                </div>
                <div id="navegacion">
                    <nav>
                        <ul>
                            <li><a href="/revistas">Revistas</a></li>
                            <li><a href="/registro">Regístrate</a></li>
                            <li><a href="/login">Log in</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="mainrevi">
                <div id="bloquesrevistas">
                    <h2>Revistas Cientificas</h2>
                    {revistasData.map((revista, index) => (
                        <div className="revista" key={index}>
                            <div className="imagen-revista">
                                <img src={revista1} alt={`Portada de la Revista`} />
                            </div>
                            <div className="info-revista">
                                <h3>{revista.nombre}</h3>
                                <p><strong>Área de Conocimiento:</strong> {revista.areaConocimiento}</p>
                                <p><strong>Subárea:</strong> {revista.subarea}</p>
                                <p><strong>Descripción:</strong> {revista.descripcion}</p>
                                <p><strong>Autor:</strong> {revista.nombreAutor}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <footer>
                <p>&copy;<strong>2023 Universidad Laica Eloy Alfaro de Manabí. Todos los derechos reservados.</strong></p>
            </footer>
        </div>
    );
};

export default Revistas;
