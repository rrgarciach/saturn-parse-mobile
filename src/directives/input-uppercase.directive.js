export default function () {

    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            let capitalize = function (inputValue) {
                if (inputValue == undefined) inputValue = '';
                let capitalized = inputValue.toUpperCase();
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            };
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]); // capitalize initial value
        }

    };

}
