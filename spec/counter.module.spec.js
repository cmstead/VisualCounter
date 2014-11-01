describe('counterModule', function(){

    describe('buildIterator', function(){

        it('should return a function', function(){
            var next = counterModule.buildIterator(0, 50, 10);

            expect(typeof next).toBe('function');
        });

        describe('next', function(){

            var next;

            beforeEach(function(){
                next = counterModule.buildIterator(0, 50, 10);
            });

            it('should return 10 on the first call', function(){
                var returnedValue = next();

                expect(returnedValue).toBe(5);
            });

            it('should return 25 on the 5th call', function(){
                var returnedValue,
                    index = 0;

                while(index < 5){
                    returnedValue = next();
                    index++;
                }

                expect(returnedValue).toBe(25);
            });

            it('should return 50 on any call past the 10th', function(){
                var returnedValue,
                    index = 0;

                while(index < 15){
                    returnedValue = next();
                    index++;
                }

                expect(returnedValue).toBe(50);
            });

        });

    });

    describe('buildCounter', function(){

        it('should return a function', function(){
            var returnedValue = counterModule.buildCounter(function(){}, {});

            expect(typeof returnedValue).toBe('function');
        });

        describe('count', function(){

            var count,
                nextSpy,
                elementSpy;

            beforeEach(function(){
                nextSpy = jasmine.createSpy('next').andReturn(5);
                elementSpy = jasmine.createSpy('text');
                count = counterModule.buildCounter(nextSpy, {
                    text: elementSpy
                });
            });

            it('should call "next" spy function', function(){
                count();

                expect(nextSpy).toHaveBeenCalled();
            });

            it('should call "element" spy with next output', function(){
                count();

                expect(elementSpy).toHaveBeenCalledWith(5);
            });
        });

    });

});