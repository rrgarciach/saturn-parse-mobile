/**
 * Cents Currency filter
 *
 * This AngularJS filter takes a numeric value and formats it as a mexican pesos currency string ($ 999,999 MXN)
 * taking the value as cents, so that 999 will become into $ 9.99 MXN.
 *
 * @returns {Function}
 */
export default function () {

    return function(value) {

        if (isNaN(value)) return '$ MXN';

        return `$ ${(value / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} MXN`;

    };

}
