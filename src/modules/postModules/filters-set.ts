export const filters_set: FilterSetType[] = [
	{ id: '0', filter: 'none', filterTitle: 'Normal' },
	{ id: '1', filter: 'contrast(110%) brightness(110%) saturate(130%)', filterTitle: '1977' },
	{
		id: '2',
		filter: 'contrast(90%) brightness(120%) saturate(85%) hue-rotate(20deg)',
		filterTitle: 'Aden'
	},
	{ id: '3', filter: 'contrast(90%) brightness(110%)', filterTitle: 'Brooklyn' },
	{
		id: '4',
		filter: 'contrast(110%) brightness(110%) sepia(30%) grayscale(100%)',
		filterTitle: 'Inkwell'
	},
	{
		id: '5',
		filter: 'contrast(150%) saturate(110%)',
		filterTitle: 'Lofi'
	}
]

type FilterSetType = {
	id: string | number
	filter: string
	filterTitle: string
}
