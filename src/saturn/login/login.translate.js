export default function translate($translateProvider) {

    $translateProvider.translations('es', {
        login_instructions: 'Introduzca sus credenciales para iniciar sesión.',
        login_email: 'Correo electrónico',
        login_password: 'Contraseña',
        auto_login: 'Iniciar sesión automáticamente',
        login_button: 'Iniciar Sesión',
        forgot_password: '¿olvidó su contraseña?',
    });

};
