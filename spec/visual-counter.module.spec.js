describe('Visual Counter', function(){

    var element;

    beforeEach(function(){
        element = {
            attr: function(){
                return 1;
            }
        };
    });

    describe('buildTimedCounter', function(){

        it('should return a function', function(){
            var returnedValue = visualCounter.buildTimedCounter(function(){}, 1, 1);
            expect(typeof returnedValue).toBe('function');
        });

        describe('timedCounter', function(){

            it('should call spy', function(){
                var spy = jasmine.createSpy('count'),
                    timedCounter = visualCounter.buildTimedCounter(spy, 1, 1);

                timedCounter();

                expect(spy).toHaveBeenCalled();
            });

            it('should call spy 3 times', function(){
                var spy = jasmine.createSpy('count'),
                    timedCounter = visualCounter.buildTimedCounter(spy, 50, 2);

                runs(timedCounter);
                waits(60);

                runs(function(){
                    expect(spy.callCount).toBe(3);
                });
            });

        });

    });

    describe('buildVisualCounter', function(){

        var buildTimedCounter;

        beforeEach(function(){
            buildTimedCounter = visualCounter.buildTimedCounter;
        });

        afterEach(function(){
            visualCounter.buildTimedCounter = buildTimedCounter;
        });

        it('should call counterModule.buildIterator', function(){
            var buildIterator = counterModule.buildIterator,
                spy = jasmine.createSpy('buildIterator');

            counterModule.buildIterator = spy;
            visualCounter.buildVisualCounter(element);
            counterModule.buildIterator = buildIterator;

            expect(spy).toHaveBeenCalledWith(1, 1, 1);
        });

        it('should call counterModule.buildIterator with min = 0 when no min exists', function(){
            var buildIterator = counterModule.buildIterator,
                spy = jasmine.createSpy('buildIterator');

            element.attr = function(attrName){
                return (attrName !== 'min') ? 1 : undefined;
            }

            counterModule.buildIterator = spy;
            visualCounter.buildVisualCounter(element);
            counterModule.buildIterator = buildIterator;

            expect(spy).toHaveBeenCalledWith(0, 1, 1);
        });

        it('should call counterModule.buildIterator', function(){
            var buildIterator = counterModule.buildCounter,
                spy = jasmine.createSpy('buildCounter');

            counterModule.buildCounter = spy;
            visualCounter.buildVisualCounter(element);
            counterModule.buildCounter = buildIterator;

            expect(spy).toHaveBeenCalled();
        });

    });

});