interface GriddzController {
}

interface GriddzStore {
	_data: IProps[];
	getData(url?: string): void; // [R]ead
	loadData(data: IServerData[]): void; // [R]ead
	updateCell(id:string|number, updates: IUpdateData): void; //[U]pdate
}

// Component-specific Interfaces
interface IProps {
	id: (s?:string|number) => string | number;
	fmv: (s?:string|number) => string | number;
	company_name: (s?:string) => string;
	project_type: (s?:string) => string;
	agg_value: (s?:string|number) => string | number;
	payment: (s?:string) => string;
	method: (s?:string) => string;
}

interface IServerData {
	id: string | number;
	fmv: string | number;
	company_name: string;
	project_type: string;
	agg_value: string | number;
	payment: string;
	method: string;
}

interface IUpdateData {
	fmv?: string | number;
	company_name?: string;
	project_type?: string;
	agg_value?: string | number;
	payment?: string;
	method?: string;
}

interface IAppConfig {
}