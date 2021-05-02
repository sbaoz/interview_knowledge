"use strict";function post(){console.log("do post")}post.prototype.before=function(){console.log("before")};var baz=function(){post();return console.log(1),1};baz();
