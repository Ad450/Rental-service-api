"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerMethods = void 0;
// export interface IMiddleware {
//     middleware: (req: Request, res: Response, next: NextFunction) => {}
// }
var routerMethods;
(function (routerMethods) {
    routerMethods[routerMethods["POST"] = 0] = "POST";
    routerMethods[routerMethods["GET"] = 1] = "GET";
    routerMethods[routerMethods["PATCH"] = 2] = "PATCH";
})(routerMethods = exports.routerMethods || (exports.routerMethods = {}));
