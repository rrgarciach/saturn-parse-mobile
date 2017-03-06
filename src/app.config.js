export default function config(ENV, $urlRouterProvider, $translateProvider, ParseProvider, ionicDatePickerProvider) {

    $translateProvider.preferredLanguage('es');
    $translateProvider.fallbackLanguage('es');
    $translateProvider.useSanitizeValueStrategy('escape');

    // Initialize Parse
    ParseProvider.initialize('saturn-id', 'saturn-master-key');
    ParseProvider.serverURL = `${ENV.PARSE_SERVER_URL}/parse`;

    const datePickerObj = {
        inputDate: new Date(),
        titleLabel: 'Select a Date',
        setLabel: 'Set',
        todayLabel: 'Today',
        closeLabel: 'Close',
        mondayFirst: false,
        weeksList: ["S", "M", "T", "W", "T", "F", "S"],
        monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        templateType: 'popup',
        from: new Date(2017, 1, 1),
        to: new Date(2020, 1, 1),
        showTodayButton: true,
        dateFormat: 'dd MMMM yyyy',
        closeOnSelect: false,
        disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);

}
