var counterModule;

(function(){
    'use strict';

    function buildIterator(min, max, steps){
        var current = min,
            delta = (max - min) / steps;

        return function(){
            current = (current >= max) ?
                max :
                current + delta;
            return Math.floor(current);
        };
    }

    function buildCounter(next, element){
        return function(){
            var count = next();

            element.text(count);
        };
    }

    counterModule = {

        buildCounter: buildCounter,
        buildIterator: buildIterator

    };

})();