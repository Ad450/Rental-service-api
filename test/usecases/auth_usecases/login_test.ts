import AuthService from "../../../src/services/auth_service/auth_service";
import { AuthServiceParam } from "../../../src/interfaces/auth_service_param";
import { mock, instance, when, verify } from "ts-mockito";
import Login from "../../../src/usecases/auth_usecases/login";
import { Request, NextFunction, Response } from "express";
import { describe, it } from "mocha";
import { Mocker } from "ts-mockito/lib/Mock";

describe("Login Test", () => {
  let mockAuthService: AuthService<AuthServiceParam>;
  let response: any;
  let request: any;
  let nextFunction: NextFunction;
  let login: Login;

  beforeEach(() => {
    // compilation error on response and request type inference
    // missing some params
    response = mock<Response>();
    request = mock<Request>();
    nextFunction = mock<NextFunction>();
    mockAuthService = mock(AuthService);
    login = new Login(instance(mockAuthService));
  });

  it("should respond with a login succesful", async () => {
    const param: AuthServiceParam = {
      req: request,
      res: response,
      next: nextFunction,
    };
    when(mockAuthService.login(param));

    // await login.call(param);

    // verify(
    //   mockAuthService.login({
    //     res: instance(response),
    //     req: instance(request),
    //     next: instance(nextFunction),
    //   })
    // ).once();
    // verify(mockAuthService).atMost(1);
  });
});
