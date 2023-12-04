import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import logImage from '../images/log.png';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [redirectToProfile, setRedirectToProfile] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = () => {
        setEmailError("");
        setPasswordError("");

        const storedData = localStorage.getItem("userData");
        const existingUsers = storedData ? JSON.parse(storedData) : [];

        // Verificar si existingUsers es un array
        if (!Array.isArray(existingUsers)) {
            setEmailError("No se encontraron usuarios registrados.");
            return;
        }

        if (email === "" || password === "") {
            setPasswordError("Ingrese un email y una contraseña");
        } else {
            const loggedInUser = existingUsers.find(user => user.email === email);

            if (loggedInUser && loggedInUser.password === password) {
                setUser(loggedInUser);
                setRedirectToProfile(true);
            } else {
                setPasswordError("El email o la contraseña están incorrectos");
            }
        }
    };

    if (redirectToProfile && user) {
        return <Navigate to={`/perfil?nombre=${user.nombre}&apellido=${user.apellido}&tipoUsuario=${user.userType}&fechaNacimiento=${user.fechaNacimiento}`} />;
    }

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
            <div id="main2">
            <div id="loginblock">
                <h2>Iniciar Sesión</h2>
                <div id="logimg">
                    <img src={logImage} alt="imagen log" />
                </div>
                <div className="form">
                    <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p id="emailError" className="warnings">{emailError}</p>
                    <input type="password" id="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p id="passwordError" className="warnings">{passwordError}</p>
                    <button onClick={handleLogin} id="login-button" className="cta-button">Iniciar Sesión</button>
                </div>
            </div>
            </div>
            <footer>
                <p>&copy;<strong>2023 Universidad Laica Eloy Alfaro de Manabí. Todos los derechos reservados.</strong></p>
            </footer>
        </div>
    );
};

export default Login;
