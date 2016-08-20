/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "01bf718cfba2051dd188"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _sidenav = __webpack_require__(3);

	var _sidenav2 = _interopRequireDefault(_sidenav);

	var _canvas = __webpack_require__(1);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _scrollIn = __webpack_require__(2);

	var _scrollIn2 = _interopRequireDefault(_scrollIn);

	var _dialog = __webpack_require__(5);

	var _dialog2 = _interopRequireDefault(_dialog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sidenavTrigger = document.getElementById('open-sidenav');
	var sidenavMenu = document.getElementById('sidenav-container');
	var canvas = document.getElementById('banner');
	var opinionDialogTrigger = document.getElementById('open-opinionated');

	if (sidenavTrigger) {
		var leftNav = new _sidenav2.default();

		sidenavTrigger.addEventListener('click', leftNav.open, false);
		//sidenavMenu.addEventListener('transitionend', sidenav.onTransitionEnd, false);
	}

	if (canvas) {
		canvas.addEventListener('mousemove', _canvas2.default.MouseMove, false);
		canvas.addEventListener('mouseout', _canvas2.default.MouseOut, false);
	}

	if (opinionDialogTrigger) {
		var opinionDialog = new _dialog2.default();

		opinionDialogTrigger.addEventListener('click', opinionDialog.open);
	}

	addEventListener('DOMContentLoaded', _scrollIn2.default.init, false);
	addEventListener('scroll', _scrollIn2.default.viewportChange, false);
	addEventListener('resize', _scrollIn2.default.viewportChange, false);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var keyword = "Forrest",
	    canvas,
	    context,
	    bgCanvas,
	    bgContext,
	    density = 13,
	    particles = [],
	    color = '#fff0a4',
	    mouse = { x: 0, y: 0 },
	    isDrawing = false,
	    canvasW,
	    canvasH;

	function initialize(canvas_id) {
		reload(canvas_id);

		window.onresize = function (event) {
			reload(canvas_id);
		};
	}

	function reload(canvas_id) {
		canvas = document.getElementById(canvas_id);

		if (!window.HTMLCanvasElement) {
			return false;
		}

		context = canvas.getContext('2d');
		canvasW = window.innerWidth;
		canvasH = 300;

		canvas.width = canvasW;
		canvas.height = canvasH;

		bgCanvas = document.createElement('canvas');
		bgContext = bgCanvas.getContext('2d');

		bgCanvas.width = canvasW;
		bgCanvas.height = canvasH;

		prepare();
		setupParticles();
		draw();
	}

	function prepare() {
		bgContext.font = "300px 'sans-serif'";
		bgContext.fillText(keyword, canvasW / 2 - Math.round(bgContext.measureText(keyword).width / 2), 260);
	}

	function setupParticles() {
		particles = [];

		var imageData,
		    image_Data,
		    pixel,
		    width = 0,
		    i = 0,
		    slide = false;

		imageData = bgContext.getImageData(0, 0, canvasW, canvasH);
		image_Data = imageData.data;

		for (var height = 0; height < canvasH; height += density) {
			++i;
			slide = (i & 2) == 0;
			width = 0;

			if (slide == true) {
				width += 6;
			}

			for (width; width < canvasW; width += density) {
				pixel = image_Data[(width + height * canvasW) * 4 - 1];

				if (pixel == 255) {
					particles.push({
						color: color,
						x: width,
						y: height
					});
				}
			}
		}
	}

	function draw() {
		context.clearRect(0, 0, canvasW, canvasH);

		var dx,
		    dy,
		    sqrDist,
		    scale = 1;

		for (var i = 0, len = particles.length; i < len; ++i) {
			context.beginPath();

			context.moveTo(x, y - height / 2);
			context.lineTo(x + width / 2, y - height / 4);
			context.lineTo(x + width / 2, y + height / 4);
			context.lineTo(x, y + height / 2);
			context.lineTo(x - width / 2, y + height / 4);
			context.lineTo(x - width / 2, y - height / 4);
			context.lineTo(x, y - height / 2);

			context.closePath();
			context.fill();
		}
	}

	var mouse = {
		x: 0,
		y: 0,
		o: false
	};

	function MouseMove(e) {
		mouse.x = e.offsetX || e.layerX - canvas.offsetLeft;
		mouse.y = e.offsetY || e.layerY - canvas.offsetTop;

		if (!isDrawing) {
			isDrawing = true;

			var drawTimeout = setTimeout(function () {
				draw();
				isDrawing = false;
			}, 60);
		}
	}

	function MouseOut(e) {
		isDrawing = false;
		clearTimeout(drawTimeout);
		draw();
	}

	module.exports = {
		MouseMove: MouseMove,
		MouseOut: MouseOut
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	function init() {
		var elements = document.querySelectorAll('[data-entrance]');

		Array.prototype.map.call(elements, function (item) {
			var anim = item.getAttribute('data-entrance');
			var delay = item.getAttribute("data-entrance-delay");

			item.style.transition = "all 1s ease";

			if (delay) {
				elem.style.transitionDelay = delay / 1000 + 's';
			}
			if (anim == "fade") {
				item.style.opacity = "0";
			}

			if (isInViewPort(item)) {
				addEventListener('load', function () {
					enter(item);
				}, false);
			}
		});
	}

	function isInViewPort(elem) {
		var rect = elem.getBoundingClientRect();

		return rect.top + 200 >= 0 && rect.top + 200 <= window.innerHeight || rect.bottom + 200 >= 0 && rect.bottom + 200 <= window.innerHeight || rect.top + 200 < 0 && rect.bottom + 200 > window.innerHeight;
	}

	function enter(elem) {
		elem.style.visibility = "visible";
		elem.style.opacity = "1";
		elem.style.transform = "translate(0,0)";
		elem.className += " has-entered";
	}

	function viewportChange() {
		var elements = document.querySelectorAll('[data-entrance]');

		Array.prototype.map.call(elements, function (item) {
			if (isInViewPort(item)) {
				var hasEntered = item.classList.contains("has-entered");

				if (!hasEntered) {
					enter(item);
				}
			}
		});
	}

	module.exports = {
		init: init,
		isInViewPort: isInViewPort,
		enter: enter,
		viewportChange: viewportChange
	};
	/*entrance.isElemInView = function() {
	var rect = elem.getBoundingClientRect();
		return(
		((rect.top + entrance.heightOffset) >= 0 && (rect.top + entrance.heightOffset) <= window.innerHeight) ||
		((rect.bottom + entrance.heightOffset) >= 0 && (rect.bottom + entrance.heightOffset) <= window.innerHeight) ||
		((rect.top + entrance.heightOffset) < 0 && (rect.bottom + entrance.heightOffset) > window.innerHeight)
	);
	}


	entrance.setInitialStyles = function (elem) {
		document.body.style.overflowX = "hidden";
			var anim = elem.getAttribute('data-entrace');
		var delay = elem.getAttribute("data-entrace-delay");
			elem.style.transition = "all " + (entrance.duration / 1000) + "s ease";
			if (delay) {
			elem.style.transitionDelay = (delay/1000) + 's';
		}
			if (anim == "fade") {
			elem.style.opacity = "0";
		}
			if (anim == "from-bottom") {
			elem.style.opacity = "0";
			elem.style.transform = "translate(0, " + entrance.distance + "px)";
		}
	}
	entrance.enter = function (elem) {
	elem.style.visibility = "visible";
	elem.style.opacity = "1";
	elem.style.transform = "translate(0,0)";
	elem.className += " has-entered";
	}

	entrance.viewportChange = function() {
		Array.prototype.map.call(entrance.elements, (item) => {
			if (entrance.elements.isElemInView(item)) {
				var hasEntered = item.classList.contains('has-entered');
			}
				if (!hasEntered) {
				enter(item);
			}
		});
	}
	entrance.init =	function() {
		entrance.elements = document.querySelectorAll('[data-entrance]');
			Array.prototype.map.call(entrance.elements, (item) => {
			setInitialStyles(item);
				if (isElemInView(item)) {
				addEventListener('load', () => {
					enter(item);
				}, false);
			}
		});
	}

	module.exports = {
	entrance: entrance
	} */

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var sideNav = function () {
		function sideNav() {
			_classCallCheck(this, sideNav);

			this.container = document.getElementById('sidenav-container');
			this.nav = document.getElementById('sidenav');
			this.overlay = null;
			this.open = this._open.bind(this);
			this.close = this._close.bind(this);
		}

		_createClass(sideNav, [{
			key: '_open',
			value: function _open() {
				var docFrag = document.createDocumentFragment();

				this.nav.style.willChange = "transform";
				this.container.classList.add('sidenav-container--animatable');
				this.overlay = document.createElement('div');
				this.overlay.className = "sidenav-overlay";
				this.overlay.style.willChange = "opacity";

				if (!this.container.classList.contains("sidenav-container--visible")) {
					this.container.classList.add('sidenav-container--visible');
					this.overlay.classList.add('overlay--visible');
					docFrag.appendChild(this.overlay);
					document.body.appendChild(docFrag);

					this.overlay.addEventListener('click', this.close, false);
				}

				this.overlay.style.willChange = "auto";
				this.nav.style.willChange = "auto";
			}
		}, {
			key: '_close',
			value: function _close() {
				this.nav.style.willChange = "transform";
				this.overlay.style.willChange = "opacity";

				if (this.container.classList.contains("sidenav-container--visible")) {
					this.container.classList.remove("sidenav-container--visible");
					document.body.removeChild(this.overlay);
				}

				this.nav.style.willChange = "auto";
			}
		}]);

		return sideNav;
	}();

	/*
	function openSideNav() {
		const navContainer = document.getElementById('sidenav-container');
		const nav = document.getElementById('sidenav');

		nav.style.willChange = "transform";
		navContainer.classList.add('sidenav-container--animatable');

		if (!navContainer.classList.contains("sidenav-container--visible")) {
			navContainer.classList.add("sidenav-container--visible");
			overlay.classList.add("overlay--visible");
			docFrag.appendChild(overlay);
			document.body.appendChild(docFrag);
		}

		overlay.style.willChange = "auto";
		nav.style.willChange = "auto";
	}

	function toggleSideNav() {
		const navContainer = document.getElementById('sidenav-container');
		const nav = document.getElementById('sidenav');

		nav.style.willChange = "transform";
		navContainer.classList.add("sidenav-container--animatable");

		if (!navContainer.classList.contains("sidenav-container--visible")) {
			navContainer.classList.add("sidenav-container--visible");
			document.body.classList.add("backdrop--visible");
		} else {
			navContainer.classList.remove("sidenav-container--visible");
			document.body.classList.remove("backdrop--visible");
		}

		nav.style.willChange = 'auto';
	}



	function onTransitionEnd() {
		const navContainer = document.getElementById('sidenav-container');

		navContainer.classList.remove("sidenav-container--animatable");
	}

	function openNav() {
		const scrollBarWidth = getScrollBarWidth();
		const backdrop = document.createElement('div');
		const closeSidenav = document.getElementById('close-sidenav');
		backdrop.className = "sidenav-backdrop";
		document.body.appendChild(backdrop);
		document.body.classList.add('modal-open');
		document.getElementById('sidenav').style.width = "250px";
		backdrop.style.opacity = "0.7"

		if (scrollBarWidth !== 0) {
			document.body.style.paddingRight = scrollBarWidth + 'px';
		}

		backdrop.addEventListener('click', closeNav);
		closeSidenav.addEventListener('click', closeNav);
	}

	function closeNav() {
		document.getElementById('sidenav').style.width = "0px";
		document.body.classList.remove('modal-open');
		document.body.style.paddingRight = "0";
		var backdrop = document.querySelector('.sidenav-backdrop');
		document.body.removeChild(backdrop);
	}

	module.exports = {
		openSideNav: openSideNav,
		onTransitionEnd: onTransitionEnd
	};

	*/


	exports.default = sideNav;

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Dialog = function () {
		function Dialog() {
			_classCallCheck(this, Dialog);

			this.closeButton = null;
			this.modal = null;
			this.overlay = null;

			this.defaults = {
				closeButton: true,
				content: "",
				overlay: true,
				clickOutside: true,
				closeKeys: [27],
				className: 'fade-and-drop',
				maxWidth: 600,
				minWidth: 280
			};

			if (arguments[0] && _typeof(arguments[0]) === 'object') {
				this.options = extendDefaults(this.defaults, arguments[0]);
			}
		}

		_createClass(Dialog, [{
			key: 'extendDefaults',
			value: function extendDefaults(source, properties) {
				var property;

				for (property in properties) {
					if (properties.hasOwnProperty(property)) {
						source[property] = properties[property];
					}
				}

				return source;
			}
		}, {
			key: 'buildOut',
			value: function buildOut() {
				var content;
				var contentHolder;
				var docFrag;

				if (typeof this.options.content === "string") {
					content = this.options.content;
				} else {
					content = this.options.content.innerHTML;
				}

				docFrag = document.createDocumentFragment();

				this.modal = document.createElement('div');
				this.modal.className = "modal " + this.options.className;
				this.modal.style.minWidth = this.options.minWidth + "px";
				this.modal.style.maxWidth = this.options.maxWidth + "px";

				if (this.options.overlay === true) {
					this.overlay = document.createElement("div");
					this.overlay.className = "modal-overlay " + this.options.className;
					docFrag.appendChild(this.overlay);
				}

				contentHolder = document.createElement("div");
				contentHolder.className = 'modal-content';
				contentHolder.innerHTML = content;

				docFrag.appendChild(this.modal);

				document.body.appendChild(docFrag);
			}
		}, {
			key: 'initializeEvents',
			value: function initializeEvents() {
				if (this.overlay) {
					this.overlay.addEventListener('click', this.close.bind(this));
				}

				if (Object.prototype.toString.call(this.defaults.closeKeys) === '[object Array]' || this.defults.closeKeys.length !== 0) {
					document.addEventListener('keydown', this.close.bind(this));
				}
			}
		}, {
			key: 'open',
			value: function open() {
				buildOut();

				this.initializeEvents.bind(this);

				window.getComputedStyle(this.modal).height;

				this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? " modal-open modal-anchored" : " modal open");
				this.overlay.className = this.overlay.className + ' modal-open';
			}
		}, {
			key: 'close',
			value: function close() {
				var _this = this;

				var self = this;

				this.modal.className = this.modal.className.replace(" modal-open", "");
				this.overlay.className = this.overlay.className.replace(" modal-open", "");

				this.modal.addEventListener(this.transitionEnd, function () {
					self.parentNode.removeChild(self.modal);
				});

				this.overlay.addEventListener(this.transitionEnd, function () {
					_this.overlay.className = _this.overlay.className.replace(" modal-open", "");
				});

				this.overlay.removeEventListener('click', false);
				document.removeEventListener('keydown', false);
			}
		}]);

		return Dialog;
	}();

	exports.default = Dialog;

/***/ }
/******/ ]);