export default function translate($translateProvider) {

    $translateProvider.translations('es', {
        clients: 'Clientes',
        client: 'Cliente',
        profile: 'Perfil',
        firstName: 'Nombre(s)',
        lastName: 'Appellidos',
        folio: 'No. de Cliente',
        rfc: 'RFC',
        address: 'Dirección',
        street: 'Calle',
        number: 'Número',
        interior: 'Interior',
        neighborhood: 'Colonia',
        postalCode: 'C.P.',
        city: 'Ciudad',
        state: 'Estado',
    });

};
