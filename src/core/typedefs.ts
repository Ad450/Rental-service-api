import UsecaseParam from "../interfaces/usecase_params";

/// Baseusecase call method will be implemented by all usecases
/// Generic <T extends UsecaseParam> is prefered for future extensibility of
/// various usecases and their params . That is, they will implement the UsecaseParam

export default abstract class BaseUsecase<T extends UsecaseParam> {
    abstract call(param: T): Promise<void>
}