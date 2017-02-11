export default function orderStatusFilter() {
    return status => {
        switch (status) {
            default:
            case 1:
                return 'CAPTURADO';
                break;
            case 2:
                return 'PROCESADO';
                break;
            case 3:
                return 'SURTIENDO';
                break;
            case 4:
                return 'SURTIDO';
                break;
            case 5:
                return 'PENDIENTE DE ENTREGA';
                break;
            case 6:
                return 'EN RUTA PARA ENTREGA';
                break;
            case 7:
                return 'ENTREGADO';
                break;
            case 8:
                return 'CANCELADO';
                break;
            case 9:
                return 'CANCELADO POR EL CLIENTE';
                break;
            case 10:
                return 'CANCELADO POR EL PROMOTOR';
                break;
        }
    }

}
