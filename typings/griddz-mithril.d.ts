interface GriddzStore {
	_data: IProps[];
	getData(url: string): void; // [R]ead
	loadData(data: IServerData[]): void; // [R]ead
	updateCell(id:string|number, updates: IUpdateData): void; //[U]pdate
}

interface GriddzController {
}

// Component-specific Interfaces
interface IProps {
	id: (s?:string|number) => string | number;
	value: (s?:string) => string;
	config?: (c?:IAppConfig) => IAppConfig;
	className?: (s?:string) => string;
}

interface IServerData {
	id: string | number;
	value: string;
	config?: IAppConfig;
	className?: string;
}

interface IUpdateData {
	value?: string;
	config?: IAppConfig;
	className?: string;
}

interface IAppConfig {
}