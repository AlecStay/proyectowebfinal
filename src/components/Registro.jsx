import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Estilos.css';
import logimage from '../images/log.png';

const Registro = () => {
    const initialState = {
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        confirmarPassword: "",
        fechaNacimiento: "",
        userType: "null"
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    const showError = (field, message) => {
        setErrors(prevErrors => ({ ...prevErrors, [field]: message }));
    };

    const handleInputChange = (field, value) => {
        setFormData(prevData => ({ ...prevData, [field]: value }));
        showError(field, "");
    };

    const handleRegister = () => {
        const { nombre, apellido, email, password, confirmarPassword, fechaNacimiento, userType } = formData;

        showError("nombre", nombre === "" ? "Por favor, ingresa un nombre." : (nombre.length > 10 ? "El nombre debe tener un máximo de 10 caracteres." : ""));
        showError("apellido", apellido === "" ? "Por favor, ingresa un apellido." : (apellido.length > 10 ? "El apellido debe tener un máximo de 10 caracteres." : ""));
        showError("email", email === "" ? "Por favor, ingresa un email." : (!regexEmail.test(email) ? "El email no es válido." : ""));
        showError("password", password.length < 7 ? "La contraseña debe tener al menos 7 caracteres." : (!/[A-Z]/.test(password) ? "La contraseña debe contener al menos una letra mayúscula." : ""));
        showError("confirmarPassword", password !== confirmarPassword ? "Las contraseñas no coinciden." : "");
        showError("fechaNacimiento", !fechaNacimiento ? "Por favor, selecciona una fecha de nacimiento." : "");
        showError("userType", userType === "null" ? "Por favor, elija un tipo de usuario." : "");

        // Verificacion correo
        const storedData = localStorage.getItem("userData");
        const existingUsers = storedData ? JSON.parse(storedData) : [];

        // AexistingUsers tiene que ser un array
        const usersArray = Array.isArray(existingUsers) ? existingUsers : [];

        if (usersArray.some(user => user.email === email)) {
            showError("email", "Correo ya registrado, elija otro.");
            return; // Validacion del si el correo ya está registrado
        }

        if (
            nombre !== "" &&
            apellido !== "" &&
            email !== "" &&
            regexEmail.test(email) &&
            password.length >= 7 &&
            /[A-Z]/.test(password) &&
            password === confirmarPassword &&
            fechaNacimiento &&
            userType !== "null"
        ) {
            const userData = { nombre, apellido, email, password, fechaNacimiento, userType };
            usersArray.push(userData);
            localStorage.setItem("userData", JSON.stringify(usersArray));

            setFormData(initialState);
            setErrors({});
            alert("Registro exitoso");
        }
    };

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
                            <li><Link to="/registro">Regístrate</Link></li>
                            <li><Link to="/login">Log in</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div id="main3">
                <div id="registerblock">
                    <h2>Registro</h2>
                    <div id="logimg">
                        <img src={logimage} alt="imagen log" />
                    </div>
                    <div className="form">
                        <input type="text" placeholder="Nombre" value={formData.nombre} onChange={(e) => handleInputChange("nombre", e.target.value)} />
                        <p id="nombreError" className="warnings">{errors.nombre}</p>
                        <input type="text" placeholder="Apellido" value={formData.apellido} onChange={(e) => handleInputChange("apellido", e.target.value)} />
                        <p id="apellidoError" className="warnings">{errors.apellido}</p>
                        <input type="text" placeholder="Email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                        <p id="emailError" className="warnings">{errors.email}</p>
                        <input type="password" placeholder="Contraseña" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} />
                        <p id="passwordError" className="warnings">{errors.password}</p>
                        <input type="password" placeholder="Confirmar Contraseña" value={formData.confirmarPassword} onChange={(e) => handleInputChange("confirmarPassword", e.target.value)} />
                        <p id="confirmarPasswordError" className="warnings">{errors.confirmarPassword}</p>
                        <input type="date" placeholder="Fecha de Nacimiento" value={formData.fechaNacimiento} onChange={(e) => handleInputChange("fechaNacimiento", e.target.value)} />
                        <p id="fechaNacimientoError" className="warnings">{errors.fechaNacimiento}</p>
                        <label htmlFor="user-type">Tipo de Usuario:</label>
                        <select id="user-type" name="user-type" value={formData.userType} onChange={(e) => handleInputChange("userType", e.target.value)}>
                            <option value="null">Elija tipo de usuario</option>
                            <option value="docente">Docente</option>
                            <option value="estudiante">Estudiante</option>
                        </select>
                        <p id="userTypeError" className="warnings">{errors.userType}</p>
                        <button onClick={handleRegister} className="cta-button">Registrarse</button>
                    </div>
                </div>
            </div>

            <footer>
                <p>&copy;<strong>2023 Universidad Laica Eloy Alfaro de Manabí. Todos los derechos reservados.</strong></p>
            </footer>
        </div>
    );

};

export default Registro;
