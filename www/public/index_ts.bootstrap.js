"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkwww"] = self["webpackChunkwww"] || []).push([["index_ts"],{

/***/ "../pkg/snake_game.js":
/*!****************************!*\
  !*** ../pkg/snake_game.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Direction\": () => (/* binding */ Direction),\n/* harmony export */   \"GameStatus\": () => (/* binding */ GameStatus),\n/* harmony export */   \"Snake\": () => (/* binding */ Snake),\n/* harmony export */   \"World\": () => (/* binding */ World),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"initSync\": () => (/* binding */ initSync)\n/* harmony export */ });\n/* harmony import */ var _snippets_snake_game_027f5cd2d64d2885_www_utils_random_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snippets/snake_game-027f5cd2d64d2885/www/utils/random.js */ \"../pkg/snippets/snake_game-027f5cd2d64d2885/www/utils/random.js\");\n\n\nlet wasm;\n\nconst cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachedUint8Memory0 = null;\n\nfunction getUint8Memory0() {\n    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {\n        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);\n    }\n    return cachedUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nlet cachedInt32Memory0 = null;\n\nfunction getInt32Memory0() {\n    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {\n        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);\n    }\n    return cachedInt32Memory0;\n}\n/**\n*/\nconst Direction = Object.freeze({ Up:0,\"0\":\"Up\",Down:1,\"1\":\"Down\",Left:2,\"2\":\"Left\",Right:3,\"3\":\"Right\", });\n/**\n*/\nconst GameStatus = Object.freeze({ Won:0,\"0\":\"Won\",Lost:1,\"1\":\"Lost\",Playing:2,\"2\":\"Playing\", });\n/**\n*/\nclass Snake {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Snake.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_snake_free(ptr);\n    }\n    /**\n    * @param {number} starting_index\n    * @param {number} size\n    * @returns {Snake}\n    */\n    static new(starting_index, size) {\n        const ret = wasm.snake_new(starting_index, size);\n        return Snake.__wrap(ret);\n    }\n}\n/**\n*/\nclass World {\n\n    static __wrap(ptr) {\n        const obj = Object.create(World.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_world_free(ptr);\n    }\n    /**\n    * @param {number} width\n    * @param {number} snake_spawn_index\n    * @returns {World}\n    */\n    static new(width, snake_spawn_index) {\n        const ret = wasm.world_new(width, snake_spawn_index);\n        return World.__wrap(ret);\n    }\n    /**\n    */\n    start_game() {\n        wasm.world_start_game(this.ptr);\n    }\n    /**\n    * @returns {number | undefined}\n    */\n    game_status() {\n        const ret = wasm.world_game_status(this.ptr);\n        return ret === 3 ? undefined : ret;\n    }\n    /**\n    * @returns {number}\n    */\n    points() {\n        const ret = wasm.world_points(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {string}\n    */\n    game_status_tostring() {\n        try {\n            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);\n            wasm.world_game_status_tostring(retptr, this.ptr);\n            var r0 = getInt32Memory0()[retptr / 4 + 0];\n            var r1 = getInt32Memory0()[retptr / 4 + 1];\n            return getStringFromWasm0(r0, r1);\n        } finally {\n            wasm.__wbindgen_add_to_stack_pointer(16);\n            wasm.__wbindgen_free(r0, r1);\n        }\n    }\n    /**\n    * @returns {number}\n    */\n    width() {\n        const ret = wasm.world_width(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    snake_head() {\n        const ret = wasm.world_snake_head(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    snake_cells() {\n        const ret = wasm.world_snake_cells(this.ptr);\n        return ret;\n    }\n    /**\n    * @returns {number}\n    */\n    get_snake_lenght() {\n        const ret = wasm.world_get_snake_lenght(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @param {number} direction\n    */\n    change_direction(direction) {\n        wasm.world_change_direction(this.ptr, direction);\n    }\n    /**\n    */\n    step() {\n        wasm.world_step(this.ptr);\n    }\n    /**\n    * @returns {number | undefined}\n    */\n    reward_cell() {\n        try {\n            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);\n            wasm.world_reward_cell(retptr, this.ptr);\n            var r0 = getInt32Memory0()[retptr / 4 + 0];\n            var r1 = getInt32Memory0()[retptr / 4 + 1];\n            return r0 === 0 ? undefined : r1 >>> 0;\n        } finally {\n            wasm.__wbindgen_add_to_stack_pointer(16);\n        }\n    }\n}\n\nasync function load(module, imports) {\n    if (typeof Response === 'function' && module instanceof Response) {\n        if (typeof WebAssembly.instantiateStreaming === 'function') {\n            try {\n                return await WebAssembly.instantiateStreaming(module, imports);\n\n            } catch (e) {\n                if (module.headers.get('Content-Type') != 'application/wasm') {\n                    console.warn(\"`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\\n\", e);\n\n                } else {\n                    throw e;\n                }\n            }\n        }\n\n        const bytes = await module.arrayBuffer();\n        return await WebAssembly.instantiate(bytes, imports);\n\n    } else {\n        const instance = await WebAssembly.instantiate(module, imports);\n\n        if (instance instanceof WebAssembly.Instance) {\n            return { instance, module };\n\n        } else {\n            return instance;\n        }\n    }\n}\n\nfunction getImports() {\n    const imports = {};\n    imports.wbg = {};\n    imports.wbg.__wbg_random_524bbd18d6051af2 = function(arg0) {\n        const ret = (0,_snippets_snake_game_027f5cd2d64d2885_www_utils_random_js__WEBPACK_IMPORTED_MODULE_0__.random)(arg0 >>> 0);\n        return ret;\n    };\n    imports.wbg.__wbindgen_throw = function(arg0, arg1) {\n        throw new Error(getStringFromWasm0(arg0, arg1));\n    };\n\n    return imports;\n}\n\nfunction initMemory(imports, maybe_memory) {\n\n}\n\nfunction finalizeInit(instance, module) {\n    wasm = instance.exports;\n    init.__wbindgen_wasm_module = module;\n    cachedInt32Memory0 = null;\n    cachedUint8Memory0 = null;\n\n\n    return wasm;\n}\n\nfunction initSync(module) {\n    const imports = getImports();\n\n    initMemory(imports);\n\n    if (!(module instanceof WebAssembly.Module)) {\n        module = new WebAssembly.Module(module);\n    }\n\n    const instance = new WebAssembly.Instance(module, imports);\n\n    return finalizeInit(instance, module);\n}\n\nasync function init(input) {\n    if (typeof input === 'undefined') {\n        input = new URL(/* asset import */ __webpack_require__(/*! snake_game_bg.wasm */ \"../pkg/snake_game_bg.wasm\"), __webpack_require__.b);\n    }\n    const imports = getImports();\n\n    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {\n        input = fetch(input);\n    }\n\n    initMemory(imports);\n\n    const { instance, module } = await load(await input, imports);\n\n    return finalizeInit(instance, module);\n}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);\n\n\n//# sourceURL=webpack://www/../pkg/snake_game.js?");

/***/ }),

/***/ "../pkg/snippets/snake_game-027f5cd2d64d2885/www/utils/random.js":
/*!***********************************************************************!*\
  !*** ../pkg/snippets/snake_game-027f5cd2d64d2885/www/utils/random.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"random\": () => (/* binding */ random)\n/* harmony export */ });\nfunction random(maximum) {\n    return Math.floor(Math.random() * maximum);\n}\n\n\n//# sourceURL=webpack://www/../pkg/snippets/snake_game-027f5cd2d64d2885/www/utils/random.js?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var snake_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! snake_game */ \"../pkg/snake_game.js\");\n/* harmony import */ var _utils_random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/random */ \"./utils/random.js\");\n\n\n(0,snake_game__WEBPACK_IMPORTED_MODULE_1__[\"default\"])().then(function (wasm) {\n    // Build world\n    var CELL_SIZE = 20;\n    var WORLD_WIDTH = 8;\n    var SNAKE_SPAWN_INDEX = (0,_utils_random__WEBPACK_IMPORTED_MODULE_0__.random)(WORLD_WIDTH * WORLD_WIDTH);\n    var world = snake_game__WEBPACK_IMPORTED_MODULE_1__.World[\"new\"](WORLD_WIDTH, SNAKE_SPAWN_INDEX);\n    // Build canvas\n    var canvas = document.getElementById('snake-game-canvas');\n    var context = canvas.getContext(\"2d\");\n    canvas.height = WORLD_WIDTH * CELL_SIZE;\n    canvas.width = WORLD_WIDTH * CELL_SIZE;\n    // UI -- Bindings\n    var button = document.getElementById('game-panel__control');\n    var statusTextLabel = document.getElementById('game-panel__info__status');\n    var pointsCounter = document.getElementById('game-panel__score__points');\n    drawPoints();\n    drawStatus();\n    // UI -- Button events\n    button.addEventListener('click', function () {\n        var gameStatus = world.game_status();\n        if (gameStatus === undefined) {\n            world.start_game();\n            drawStatus();\n            button.textContent = \"Stop\";\n            gameLoop();\n        }\n        else {\n            location.reload();\n        }\n    });\n    // UI -- Keyboard events\n    document.addEventListener(\"keydown\", function (e) {\n        var key = e.code;\n        if (key === \"ArrowUp\" || key === \"KeyW\") {\n            world.change_direction(snake_game__WEBPACK_IMPORTED_MODULE_1__.Direction.Up);\n        }\n        else if (key === \"ArrowDown\" || key === \"KeyS\") {\n            world.change_direction(snake_game__WEBPACK_IMPORTED_MODULE_1__.Direction.Down);\n        }\n        else if (key === \"ArrowLeft\" || key === \"KeyA\") {\n            world.change_direction(snake_game__WEBPACK_IMPORTED_MODULE_1__.Direction.Left);\n        }\n        else if (key === \"ArrowRight\" || key === \"KeyD\") {\n            world.change_direction(snake_game__WEBPACK_IMPORTED_MODULE_1__.Direction.Right);\n        }\n        else {\n            console.log(\"Invalid key\");\n        }\n    });\n    // UI -- Mobile swipe events\n    document.addEventListener(\"touchstart\", startTouch, false);\n    document.addEventListener(\"touchmove\", moveTouch, false);\n    // Swipe Up / Down / Left / Right\n    var initialX = null;\n    var initialY = null;\n    function startTouch(e) {\n        initialX = e.touches[0].clientX;\n        initialY = e.touches[0].clientY;\n    }\n    ;\n    function moveTouch(e) {\n        if (initialX === null) {\n            return;\n        }\n        if (initialY === null) {\n            return;\n        }\n        var currentX = e.touches[0].clientX;\n        var currentY = e.touches[0].clientY;\n        var diffX = initialX - currentX;\n        var diffY = initialY - currentY;\n        if (Math.abs(diffX) > Math.abs(diffY)) {\n            // sliding horizontally\n            if (diffX > 0) {\n                // swiped left\n                world.change_direction(snake_game__WEBPACK_IMPORTED_MODULE_1__.Direction.Left);\n            }\n            else {\n                // swiped right\n                world.change_direction(snake_game__WEBPACK_IMPORTED_MODULE_1__.Direction.Right);\n            }\n        }\n        else {\n            // sliding vertically\n            if (diffY > 0) {\n                // swiped up\n                world.change_direction(snake_game__WEBPACK_IMPORTED_MODULE_1__.Direction.Up);\n            }\n            else {\n                // swiped down\n                world.change_direction(snake_game__WEBPACK_IMPORTED_MODULE_1__.Direction.Down);\n            }\n        }\n        initialX = null;\n        initialY = null;\n        e.preventDefault();\n    }\n    ;\n    function drawPoints() {\n        pointsCounter.textContent = String(world.points());\n    }\n    function drawStatus() {\n        statusTextLabel.textContent = world.game_status_tostring();\n    }\n    function drawWorld() {\n        context.beginPath();\n        for (var x = 0; x <= WORLD_WIDTH; x++) {\n            context.moveTo(CELL_SIZE * x, 0);\n            context.lineTo(CELL_SIZE * x, WORLD_WIDTH * CELL_SIZE);\n        }\n        for (var y = 0; y <= WORLD_WIDTH; y++) {\n            context.moveTo(0, CELL_SIZE * y);\n            context.lineTo(WORLD_WIDTH * CELL_SIZE, CELL_SIZE * y);\n        }\n        context.stroke();\n    }\n    function drawSnake() {\n        var snakeCells = new Uint32Array(wasm.memory.buffer, world.snake_cells(), world.get_snake_lenght());\n        snakeCells.forEach(function (cell, i) {\n            var col = cell % WORLD_WIDTH;\n            var row = Math.floor(cell / WORLD_WIDTH);\n            context.fillStyle = i === 0 ? \"#DBF9B8\" : \"#87A878\";\n            context.beginPath();\n            context.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);\n        });\n        context.stroke();\n    }\n    function drawReward() {\n        var rewardCellIndex = world.reward_cell();\n        var col = rewardCellIndex % WORLD_WIDTH;\n        var row = Math.floor(rewardCellIndex / WORLD_WIDTH);\n        context.fillStyle = \"#FFD700\";\n        context.beginPath();\n        context.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);\n        context.stroke();\n    }\n    function drawActors() {\n        drawWorld();\n        drawSnake();\n        drawReward();\n        drawStatus();\n        drawPoints();\n    }\n    function gameLoop() {\n        var gameStatus = world.game_status();\n        if (gameStatus === snake_game__WEBPACK_IMPORTED_MODULE_1__.GameStatus.Won) {\n            button.textContent = \"Another round?\";\n            return;\n        }\n        else if (gameStatus === snake_game__WEBPACK_IMPORTED_MODULE_1__.GameStatus.Lost) {\n            button.textContent = \"Try again!\";\n            return;\n        }\n        var refreshSpeedFPS = 3;\n        setTimeout(function () {\n            context.clearRect(0, 0, canvas.width, canvas.height);\n            world.step();\n            drawActors();\n            requestAnimationFrame(gameLoop);\n        }, 1000 / refreshSpeedFPS);\n    }\n    drawActors();\n});\n\n\n//# sourceURL=webpack://www/./index.ts?");

/***/ }),

/***/ "./utils/random.js":
/*!*************************!*\
  !*** ./utils/random.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"random\": () => (/* binding */ random)\n/* harmony export */ });\nfunction random(maximum) {\n    return Math.floor(Math.random() * maximum);\n}\n\n\n//# sourceURL=webpack://www/./utils/random.js?");

/***/ }),

/***/ "../pkg/snake_game_bg.wasm":
/*!*********************************!*\
  !*** ../pkg/snake_game_bg.wasm ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"9c60dc78def2fcb79f04.wasm\";\n\n//# sourceURL=webpack://www/../pkg/snake_game_bg.wasm?");

/***/ })

}]);