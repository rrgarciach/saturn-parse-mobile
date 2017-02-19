export default function fileModel($parse, productUploadService) {

    return {
        restrict: 'A',
        link: function (scope, element, ) {

            element.bind('change', function () {
                scope.$apply(function () {
                    productUploadService.setFile(element[0].files[0]);
                });

            });

        }

    };

}
