export interface GameInput {
    title: string;
    genre: string;
    releaseDate: Date;
    createdBy: string; // ID del usuario que crea el juego
}

export interface GameInputUpdate {
    title?: string;
    genre?: string;
    releaseDate?: Date;
}
