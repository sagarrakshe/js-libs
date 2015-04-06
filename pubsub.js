/*
 * pubsub.js
 * sagarrakshe2@gmail.com
 * Author: sagar
 * Date: 2015-03-19
 *
 */

  var EventEmitter = require('events').EventEmitter;

  var pubsub = new EventEmitter(),
      lastUid = -1;

  // set max. 20 listeners
  pubsub.setMasListeners = 20;


  pubsub.subscribe = function () {
    var callback = arguments[1];

    if (callback) {
      callback.id = ++lastUid;
    }

    pubsub.on.apply(this, arguments);
    return lastUid;
  };


  pubsub.publish = function () {
    return pubsub.emit.apply(this, arguments);
  };


  pubsub.unsubscribe = function (event, id) {
    var events = pubsub._events[event];

    if (events && !Array.isArray(events)) {
      events = [events];
    }

    for (var i=0; i < events.length; ++i) {
      if (events[i].id === id) {
        pubsub.removeListener(event, events[i]);
      }
    }
  };


  /* Using this method removes alternate subscribers */
  // pubsub.unsubscribeEvent = function (event) {
  //   var events = pubsub._events[event];

  //   if (events && !Array.isArray(events)) {
  //     events = [events];
  //   }

  //   for (var i=0; i < events.length; ++i) {
  //     pubsub.removeListener(event, events[i]);
  //   }
  // };


  pubsub.unsubscribeAll = function () {
    return pubsub.removeAllListeners.apply(arguments);
  };


  global.pubsub = pubsub;
  module.exports =  global.pubsub;
