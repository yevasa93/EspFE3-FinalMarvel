import { ImageObject } from "./comic";

export interface CharacterDetail {
    id: number;
    name: string;
    description: string;
    thumbnail: ImageObject;
}