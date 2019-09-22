'use strict';

const moduleLoader=require('esm')(module);
module.exports=moduleLoader('./index.js');
