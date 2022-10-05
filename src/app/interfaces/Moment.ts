export interface Moment {
    id?: number; // a "?" significa que o id é opcional, pois quando vamos criar o dado, não precisamos enviar o id pois ele é autoincrementado na tabela do banco
    title: string;
    description: string;
    image: string;
    created_at?: string;
    updated_at?: string;
    comments?: [{ text: string; username: string}];
}