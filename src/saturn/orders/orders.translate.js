export default function translate($translateProvider) {

    $translateProvider.translations('es', {
        orders: 'Órdenes',
        order: 'Órden',
        new_order: 'Nueva Órden',
        edit_order: 'Editar Órden',
        download_orders: 'Descargar Órdenes',
        add_item: 'Agregar Renglón',
        edit_item: 'Editar Renglón',
        remove_item: 'Remover Renglón',
        sku: 'Código',
        order_notes: 'Notas de la órden',
        no_order_notes: 'No existen notas para esta órden',
        status: 'Estatus',
    });

};
