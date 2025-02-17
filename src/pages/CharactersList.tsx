import { Link } from "react-router";
import { DataGrid, GridColDef, GridFilterModel, getGridStringOperators} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useCharacters } from '../hooks/useCharacter';
const PAGE_SIZE = 20;

const CharactersList = () => {
    const [page, setPage] = useState(1);
    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        items: []
    });
    const filters = {
        name: filterModel.items.find(item => item.field === 'name')?.value as string,
        status: filterModel.items.find(item => item.field === 'status')?.value as string,
        species: filterModel.items.find(item => item.field === 'species')?.value as string,
        gender: filterModel.items.find(item => item.field === 'gender')?.value as string,
    };

    const filterOperatorContains = getGridStringOperators().find(operator => operator.value === 'contains');
    const filterOperators =  filterOperatorContains ? [filterOperatorContains] : [];
    const { characters, info, loading } = useCharacters(page, filters);
    const columns: GridColDef[] = [
        {
            field: 'image',
            headerName: 'Image',
            renderCell: (params) => (
                <img src={params.value} alt={params.row.name} style={{ width: 50, height: 50, borderRadius: '50%' }} />
            ),
            filterable: false,
            sortable: false,
        },
        { field: 'name', headerName: 'Name', filterable: true, filterOperators },
        { field: 'status', headerName: 'Status', filterable: true, filterOperators},
        { field: 'species', headerName: 'Species', filterable: true, filterOperators },
        { field: 'gender', headerName: 'Gender', filterable: true, filterOperators },

    ];
    return (
        <div>
            <Link to="/">Home</Link>
            <h1>Characters</h1>
            <div style={{ height: "70vh", width: '100vw'}}>
            <DataGrid
                rows={characters}
                columns={columns}
                pagination
                paginationMode="server"
                filterMode="server"
                rowCount={info?.count || 0}
                loading={loading}
                pageSizeOptions={[PAGE_SIZE]}
                paginationModel={{
                    page: page - 1,
                    pageSize: PAGE_SIZE,
                }}
                onPaginationModelChange={(model) => setPage(model.page + 1)}
                filterModel={filterModel}
                onFilterModelChange={setFilterModel}
                sx={{ backgroundColor: 'white' }}
            />
            </div>
        </div>
    );
    };

export default CharactersList;