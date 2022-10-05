// Essa interface vai receber a resposta do backend mas vai ser um pouco diferente, pois a resposta vai vir com mais dados
export interface Response<T> {
    message?: string;
    data: T;
}