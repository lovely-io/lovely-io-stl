/**
 * Lovely is as left as you can imagine
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
var Lovely = function(undefined) {

  include('src/lovely');
  include('src/util');
  include('src/class');
  include('src/list');
  include('src/hash');


  // exporting the globally visible objects
  return ext(Lovely, {
    version:     '%{version}',

    // the loader default options
    modules:     {}, // the loaded modules index
    loading:     {}, // the currently loading modules
    baseUrl:     '', // default base url address for local modules
    hostUrl:     '', // default host url address for Lovely modules
    waitSeconds: 8,  // timeout before give up on a module

    // globally accessible functions
    A:          A,
    L:          L,
    H:          H,
    ext:        ext,
    bind:       bind,
    trim:       trim,
    isString:   isString,
    isNumber:   isNumber,
    isFunction: isFunction,
    isArray:    isArray,
    isObject:   isObject,
    Class:      Class,
    List:       List,
    Hash:       Hash
  });

}();

