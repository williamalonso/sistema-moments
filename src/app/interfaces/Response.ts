// Essa interface vai receber a resposta do backend mas vai ser um pouco diferente, pois a resposta vai vir com mais dados
// Ou seja, vamos ter uma resposta (Response<T>) que vai receber dados (message, data) de algum tipo T genérico
export interface Response<T> {
    message?: string; // a "?" significa que esse valor é opcional
    data: T;
}