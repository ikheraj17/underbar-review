(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    //if n is undefined
    if (n === undefined) {
      return array[array.length - 1];
    }
    //if n is 0
    if (n === 0) {
      return [];
    }
    // if n is longer than the array length
    if (n > array.length) {
      return array;
    }
    //accepts an index value
    return array.slice(array.length - n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    //if colelction is an array
    if (Array.isArray(collection)) {
      //iterate over collection
      for (var i = 0; i < collection.length; i++) {
        //run iterator
        iterator(collection[i], i, collection);
      }
    }
    //if collection is not an array but is an object
    if (!Array.isArray(collection) && collection instanceof Object) {
      //iterate through object
      for (var key in collection) {
        //run iterator
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    //create a result array
    var result = [];
    //iterate over the collection
    _.each(collection, function(item) {
      //if the test passes on each item
      if (test(item)) {
        //push that into the result array
        result.push(item);
      }
    });
    //return result
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    //create a result array
    var result = [];
    //iterate over the collection
    _.each(collection, function(item) {
      //if the test does not pass on each item
      if (!test(item)) {
        //push that into the result array
        result.push(item);
      }
    });
    //return result
    return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    //create a result arr
    var result = [];
    //create uniqe object
    var unique = {};
    //iterate over input array
    for (var i = 0; i < array.length; i++) {
      //unique object at key of array[i] is set equal to array [i]
      unique[array[i]] = array[i];
    }
    //iterate over unique object
    for (var key in unique) {
      //push each object value into result
      result.push(unique[key]);
    }
    //return result
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    //create result array
    var result = [];
    //loop over collection
    for (var i = 0; i < collection.length; i++) {
      //run iterator, push results into result
      result.push(iterator(collection[i], i, collection));
    }
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for EACH item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    //if accumulator is undefined
    if (accumulator === undefined) {
      //create a copy of the input array
      var newArr = collection.slice();
      //create a variable to represent the first element of newArr after shifting it off
      var first = newArr.shift();
      //set accumulator to that shifted value
      accumulator = first;
      // iterate over the modified new arr
      _.each(newArr, function(item) {
        //the accum is re-assigned to the value of calling iterator on the accum and item
        accumulator = iterator(accumulator, item);
      });
      //return the accumlator when the loop is over
      return accumulator;
    } else {
      //loop over the original arr (since accum was defined)
      _.each(collection, function(item) {
        //the accum is re-assigned to the value of calling iterator on the accum and item
        accumulator = iterator(accumulator, item);
      });
      return accumulator;
    }
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    //set iterator to be itself or a identity value if no value is passed
    iterator = iterator || _.identity;
    //loop over the collection
    for (var i = 0; i < collection.length; i ++) {
      //check if any results are false
      if (!iterator(collection[i])) {
        //if any are return false
        return false;
      }
    }
    //otherwise returns true
    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    var result = false;
    //set iterator to passed in value or identity if nothing is passed in
    iterator = iterator || _.identity;
    //empty collection
    if (collection.length === 0) {
      return false;
    }
    //if every item in collection passes the iterator test
    if (_.every(collection, iterator)) {
      //set result to true
      result = true;
      //or else
    } else {
      //for each item in collection, run a function
      _.each(collection, function(item) {
        //if iterator applied to item is true
        if (iterator(item)) {
          //result is equal to true;
          result = true;
        }
      });
    }
    //return result
    return result;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    //gain access to every argument
    for (var i = 1; i < arguments.length; i ++) {
      //iterate over the arguments keys
      for (var key in arguments[i]) {
        //set the values of the new arguments to be the original objs values
        arguments[0][key] = arguments[i][key];
      }
    }
    //return the obj
    return obj;
  };


  /*
  function(obj) {
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
  }
    for (var key in arg) {
      obj[key] = arg[key]
    }
  }

  */

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    //iterate over arguments, ignoring the first argument
    for (var i = 1; i < arguments.length; i ++) {
      //iterate through the keys within arguments[i]
      for (var key in arguments[i]) {
        //if the first argument does not contain the key of the current argument
        if (arguments[0][key] === undefined) {
          //set values of new arguments to be original objs values
          arguments[0][key] = arguments[i][key];
        }
      }
    }
    //return the obj;
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    //create result object
    var result = {};
    //return a function
    return function() {
      ////stringify our arguments
      var args = JSON.stringify(arguments);
      //if result at arguments hasn't been called
      if (result[args] === undefined) {
        //result [args] is equal to the call to this current argument
        result[args] = func.apply(this, arguments);
      }
      //return result[args]
      return result[args];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    //convert the arguments into a userable array
    var args = [...arguments];
    //exclude the first two args, which would be someFunction and the input
    //time, create a copy of arguments array without these values
    args = args.slice(2);
    setTimeout(function() {
      //set timeout is applied on a function that calls on the current argument
      func.apply(this, args);
      //and applies the wait time to that function call
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    //var for new array
    var newArr = array.slice();
    //set the index variable to last index of array
    var origIndex = array.length - 1; // -----> 3
    //set placeholder values
    var temporary, newIndex;
    //while our original index is greater than or equal to 0
    while (origIndex) {
      //change new index
      newIndex = Math.floor(Math.random() * origIndex); // random number times 3
      //subtract one from original index
      origIndex -= 1; // orig index = 2;
      //set temporary to be the value of the copied array at the negatively
      //incremented original index
      temporary = newArr[origIndex];
      newArr[origIndex] = newArr[newIndex]; // set to 3
      temporary = newArr[newIndex];
      //newArr[newIndex] = temporary;
    }
    return newArr;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
