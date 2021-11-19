import { useState } from 'react'

import {
	DeleteOutlined as DeleteIcon,
	CreateOutlined as EditIcon
} from '@mui/icons-material'
import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid'

import foodsData from '../../data/foods.json'
import { Food } from '../../services/entities'
import { chunkArray } from '../../utils/chunkArray'

export interface FoodTableProps {
	foods: Food[]
	loading: boolean
	onDeleteRow: (id: number) => void
	onOpenUpdate: (id: number) => void
}

export const FoodsTable = ({
	foods,
	onDeleteRow,
	onOpenUpdate,
	loading
}: FoodTableProps) => {
	const perPage = 5
	const chunkedFoods = chunkArray(foods, perPage)
	const [page, setPage] = useState<number>(0)

	const handleDeleteClick = (id: number) => (event: any) => {
		event.stopPropagation()
		onDeleteRow(id)
	}
	const handleUpdateClick = (id: number) => (event: any) => {
		event.stopPropagation()
		onOpenUpdate(id)
	}

	const columns: GridColumns = [
		{
			field: 'name',
			headerName: 'Nome',
			width: 220,
			editable: false,
			type: 'singleSelect',
			headerAlign: 'center',
			align: 'center',
			valueOptions: foodsData,
			sortable: false,
			preProcessEditCellProps: params => {
				const hasError = !params.props.value
				return { ...params.props, error: hasError }
			}
		},
		{
			field: 'quantity',
			headerName: 'Quantidade (kg)',
			type: 'number',
			editable: false,
			headerAlign: 'center',
			align: 'center',
			sortable: false
		},
		{
			field: 'validationDate',
			headerName: 'Data de validade',
			type: 'date',
			width: 180,
			editable: false,
			headerAlign: 'center',
			align: 'center',
			sortable: false,
			preProcessEditCellProps: params => {
				const value = params.props.value
				return {
					...params.props,
					error: value ? (value as Date) <= new Date() : true
				}
			}
		},
		{
			field: 'isAvailable',
			headerName: 'Disponibilidade',
			type: 'boolean',
			width: 220,
			editable: false,
			sortable: false
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Ações',
			width: 100,
			sortable: false,
			getActions: ({ id }) => [
				<GridActionsCellItem
					key={0}
					icon={<EditIcon />}
					label="Editar"
					onClick={handleUpdateClick(id as number)}
					color="error"
				/>,
				<GridActionsCellItem
					key={1}
					icon={<DeleteIcon />}
					label="Delete"
					onClick={handleDeleteClick(id as number)}
					color="error"
				/>
			]
		}
	]

	return (
		<div style={{ height: 500, width: '100%' }}>
			<DataGrid
				rows={chunkedFoods[page]}
				columns={columns}
				editMode="row"
				loading={loading}
				hideFooterSelectedRowCount
				disableColumnFilter
				disableColumnSelector
				disableColumnMenu
				rowsPerPageOptions={[5]}
				pagination
				page={page}
				pageSize={perPage}
				onPageChange={currPage => setPage(currPage)}
			/>
		</div>
	)
}

export default FoodsTable
