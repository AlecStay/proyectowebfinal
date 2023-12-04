import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import './Estilos.css';

const GestionRevista = () => {
    const [nombreRevista, setNombreRevista] = useState("");
    const [areaConocimiento, setAreaConocimiento] = useState("seleccionar");
    const [subarea, setSubarea] = useState("seleccionar");
    const [descripcion, setDescripcion] = useState("");
    const [nombreAutor, setNombreAutor] = useState(""); 

    const [nombreRevistaError, setNombreRevistaError] = useState("");
    const [areaConocimientoError, setAreaConocimientoError] = useState("");
    const [descripcionError, setDescripcionError] = useState("");

    const [subareaVisible, setSubareaVisible] = useState(false);
    const [redirectToRevistas, setRedirectToRevistas] = useState(false);

    useEffect(() => {
        // mostrar ocultar subareas pq no funciono con css xd
        setSubareaVisible(areaConocimiento !== "seleccionar");
    }, [areaConocimiento]);

    const validarFormulario = (e) => {
        e.preventDefault();

        // Limpiar mensajes de error
        setNombreRevistaError("");
        setAreaConocimientoError("");
        setDescripcionError("");

        // Validaciones
        if (nombreRevista.length > 10) {
            setNombreRevistaError("El nombre debe tener un máximo de 10 caracteres.");
            return;
        }

        if (areaConocimiento === "seleccionar") {
            setAreaConocimientoError("Seleccione un área de conocimiento.");
            return;
        }

        if (descripcion.trim() === "") {
            setDescripcionError("Ingrese la descripción.");
            return;
        }


        const revistaData = {
            nombre: nombreRevista,
            areaConocimiento,
            subarea,
            descripcion,
            nombreAutor, 
        };

        // Se guarda la informacion de la revista en revistasData
        const storedRevistas = localStorage.getItem("revistasData");
        const revistasData = storedRevistas ? JSON.parse(storedRevistas) : [];

        // Agregar la nueva revista al arreglo existente
        revistasData.push(revistaData);

        // Actualizar el localStorage con la información actualizada de revistas
        localStorage.setItem("revistasData", JSON.stringify(revistasData));

        // Limpia la informacion puesta
        setNombreRevista("");
        setAreaConocimiento("seleccionar");
        setSubarea("seleccionar");
        setDescripcion("");
        setNombreAutor(""); 

        // Vuelv a poner la subaera escondidad
        setSubareaVisible(false);

        
        setRedirectToRevistas(true);
    };

    if (redirectToRevistas) {
        return <Navigate to="/revistas" />;
    }

    return (
        <div id="bodygestion">
            <header>
                <div id="botontitulo">
                    <h1><Link to="/">Revistas Científicas Uleam</Link></h1>
                </div>
                <div id="navegacion">
                    <nav>
                        <ul>
                            <li><a href="/revistas">Revistas</a></li>
                            <li><a href="/perfil">Mi Perfil</a></li>
                            <li><a href="/login">Cerrar Sesión</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div id="formulario-creacion">
                <h2>Crear una nueva revista</h2>
                <form onSubmit={validarFormulario}>
                    <label htmlFor="nombreRevista">Nombre de la revista:</label>
                    <input type="text" id="nombreRevista" value={nombreRevista} onChange={(e) => setNombreRevista(e.target.value)} required />
                    <span className="error">{nombreRevistaError}</span>

                    <label htmlFor="areaConocimiento">Área de Conocimiento:</label>
                    <select
                        id="areaConocimiento"
                        onChange={(e) => {
                            setAreaConocimiento(e.target.value);
                            setSubarea("seleccionar"); // Restablecer subárea al cambiar el área
                        }}
                        value={areaConocimiento}
                    >
                        <option value="seleccionar">Seleccionar</option>
                        <option value="programas">Programas Genéricos y Calificaciones</option>
                        <option value="educacion">Educación</option>
                        <option value="artes">Artes y Humanidades</option>
                        <option value="ciencias">Ciencias Sociales - Periodismo e Información</option>
                        <option value="administracion">Administración, Negocios y Legislación</option>
                    </select>
                    <span className="error">{areaConocimientoError}</span>

                    {subareaVisible && (
                        <div id={`${areaConocimiento}Subarea`} className="subarea">
                            <label htmlFor="subareaProgramas">Subáreas:</label>
                            <select id="subareaProgramas" value={subarea} onChange={(e) => setSubarea(e.target.value)}>
                                <option value="seleccionar">Seleccionar</option>
                                <option value="programas">Programas y cualificaciones básicas</option>
                                <option value="programas">Alfabetización y aritmética</option>
                                <option value="programas">Desarrollo y habilidades personales</option>
                            </select>
                        </div>
                    )}

                    <div id="descripcionRevista">
                        <label htmlFor="descripcion">Descripción de la revista (100 palabras):</label>
                        <textarea id="descripcion" rows="4" cols="50" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                        <span className="error">{descripcionError}</span>
                    </div>

                    {/* Nuevo campo para el nombre del autor */}
                    <label htmlFor="nombreAutor">Nombre del Autor:</label>
                    <input type="text" id="nombreAutor" value={nombreAutor} onChange={(e) => setNombreAutor(e.target.value)} required />

                    <button className="cta-button" type="submit">
                        Crear Revista
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GestionRevista;
