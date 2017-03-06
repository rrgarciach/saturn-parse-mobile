export default class OrdersDownloadCtrl {

    constructor(ionicDatePicker, orderDownloadService) {
        this.ionicDatePicker = ionicDatePicker;
        this.orderDownloadService = orderDownloadService;

        this.selectedDateString = '';

        this._init();
    }

    _init() {
        this.url = '';
        this.datePickerOptions = {
            callback: val => {  //Mandatory
                const date = new Date(val);
                this.selectedDateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
                this.url = this.orderDownloadService.getUrlByDateAsXls(this.selectedDateString);
            },
            inputDate: new Date(),
            titleLabel: 'Seleccione una Fecha',
            setLabel: 'Elegir',
            closeLabel: 'Cerrar',
            mondayFirst: false,
            weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            monthsList: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            templateType: 'popup',
            from: new Date(2017, 1, 1),
            to: new Date(2020, 1, 1),
            showTodayButton: false,
            dateFormat: 'dd / MM / yyyy',
            closeOnSelect: true,
            disableWeekdays: []
        };
    }

    openDatePicker() {
        this.ionicDatePicker.openDatePicker(this.datePickerOptions);
    };

}
