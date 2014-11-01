var visualCounter;

(function(){

    function buildTimedCounter(count, duration, steps){
        var durationDelta = duration/steps,
            currentDuration = 0;

        function timedCounter(){
            count();

            if(currentDuration <= duration){
                setTimeout(function(){
                    currentDuration += durationDelta;
                    timedCounter();
                }, durationDelta);
            }
        }

        return timedCounter;
    }

    function buildVisualCounter(element){

        var min = (element.attr('min')) ? element.attr('min') : 0,
            max = element.attr('max'),
            steps = element.attr('steps'),
            duration = element.attr('duration'),

            next = counterModule.buildIterator(min, max, steps),
            count = counterModule.buildCounter(next, element);

        return buildTimedCounter(count, duration, steps);
    }

    function startCount(className){
        $(className).each(function(){
            buildVisualCounter($(this))();
        });
    }

    visualCounter = {
        buildTimedCounter: buildTimedCounter,
        buildVisualCounter: buildVisualCounter,
        startCount: startCount
    };

})();