/* global describe, it, beforeEach, expect, spyOn */
'use strict';

var newsletter = require('./index');

describe('subscription', function(){
	var subscription, value, subscriber;

	beforeEach(function(){
		subscription = newsletter();
		value = 13;
		subscriber = { method: function(){} };

		spyOn(subscriber, 'method');
	});

	it('should publish value', function(){
		subscription.subscribe(subscriber.method);
		subscription.publish(value);

		expect(subscriber.method).toHaveBeenCalledWith(value);
	});

	it('should publish first publication', function(){
		subscription = newsletter(value);

		subscription.subscribe(subscriber.method, true);

		expect(subscriber.method).toHaveBeenCalledWith(value);
	});

	it('should return unsubcribe function', function(){
		var unsubcribe = subscription.subscribe(subscriber.method);

		expect(typeof unsubcribe).toBe('function');

		unsubcribe();
		subscription.publish(value);

		expect(subscriber.method).not.toHaveBeenCalled();
	});

	it('should add callback only once', function(){
		var counter = 0, inc = function(){ counter++; };

		subscription.subscribe(inc);
		subscription.subscribe(inc);
		subscription.publish(value);

		expect(counter).toBe(1);
	});
});
