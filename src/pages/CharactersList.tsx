import { Link, useNavigate } from "react-router";
import { DataGrid, GridColDef, GridFilterModel, getGridStringOperators } from '@mui/x-data-grid';
import { useMemo, useRef, useState } from 'react';
import { useCharacters } from '../hooks/useCharacter';
import { styles } from "../components/navigation/styled";
const PAGE_SIZE = 20;
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const CharactersList = () => {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: PAGE_SIZE,
    });
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
    const filterOperators = filterOperatorContains ? [filterOperatorContains] : [];
    const { characters, info, loading } = useCharacters(paginationModel.page + 1, filters);
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
        { field: 'name', headerName: 'Name', filterable: true, filterOperators, minWidth: 200 },
        { field: 'status', headerName: 'Status', filterable: true, filterOperators },
        { field: 'species', headerName: 'Species', filterable: true, filterOperators },
        { field: 'gender', headerName: 'Gender', filterable: true, filterOperators },
    ];

    const rowCountRef = useRef(info?.count || 0);

    const rowCount = useMemo(() => {
        if (info?.count !== undefined) {
            rowCountRef.current = info.count;
        }
        return rowCountRef.current;
    }, [info?.count]);

    const navigate = useNavigate();

    return (
        <ThemeProvider theme={darkTheme}>
            <div style={{ margin: '20px' }}>
                <Link to="/" style={styles.link}>Home</Link>
                <h1>Characters</h1>
                <div style={{ height: "70vh", maxWidth: "90vw" }}>
                    <DataGrid
                        rows={characters}
                        columns={columns}
                        pagination
                        paginationMode="server"
                        filterMode="server"
                        rowCount={rowCount}
                        loading={loading}
                        pageSizeOptions={[PAGE_SIZE]}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        filterModel={filterModel}
                        onFilterModelChange={setFilterModel}
                        sx={{
                            '.MuiDataGrid-row:hover': {
                                cursor: 'pointer',
                            },
                        }}
                        onRowClick={(row) => navigate(`/characters/${row.id}`)}
                        disableRowSelectionOnClick={true}
                    />
                </div>
            </div>
        </ThemeProvider>
    );
};

export default CharactersList;