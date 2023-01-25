export interface BaseCat {
	name: string;
	description: string;
}

export interface Cat extends BaseCat {
	id: number;
}
