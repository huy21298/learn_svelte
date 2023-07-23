export type ITodo = {
	id: string;
	name: string;
	status: 'completed' | 'uncompleted';
};

export type IFilterState = 'all' | 'uncompleted' | 'completed';

export type IFilterItem = {
	label: string;
	name: IFilterState;
};
