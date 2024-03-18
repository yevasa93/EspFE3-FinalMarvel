export interface ComicImage {
    path: string;
    extension: string;
}

export interface Character {
    available: number;
    collectionURI: string;
	items: ItemCharacter[]
}

export interface ItemCharacter {
    resourceURI: string;
	name:string
}

export interface ItemDescription {
    type: string;
	language:string;
	text:string
}

export interface Comic {
    characters: Character;
    price?: number;
	oldPrice?: number;
	stock?: number;
    id: number;
    title: string;
    textObjects: ItemDescription[];
    images: ComicImage[];
}