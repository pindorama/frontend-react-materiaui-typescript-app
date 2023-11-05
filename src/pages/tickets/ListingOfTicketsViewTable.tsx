import { useSearchParams } from 'react-router-dom';
import { ToolbarsOfListing } from '../../shared/components';
import { BaseLayoutOfPage } from '../../shared/layouts';
import { useEffect, useMemo, useState } from 'react';
import { TicketsService,IListOfTickets } from '../../shared/services/api/tickets/TicketsService';
import { useDebounce } from '../../shared/hooks';
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { Environment } from '../../shared/environment';

export const ListingOfTicketsViewTable : React.FC = () =>{
  const [ searchParams, setSearchParams ] = useSearchParams();
  const { debounce } = useDebounce();


  const [rows, setRows] = useState<IListOfTickets[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);


  const search = useMemo(() => {
    return searchParams.get('search')  || '';
  },[searchParams]);



  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      TicketsService.getAllTickets(1, search)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);

            setTotalCount(result.totalCount);
            setRows(result.data);
          }
        });
    });
  }, [search]);
  
  
  return (
    <BaseLayoutOfPage  toolbars={
      <ToolbarsOfListing 
        showSearchInput 
        searchText={search} 
        changingSearchText={ text =>
          setSearchParams({ search: text}, {replace: true})}/>  
    }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Buy Tickets</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.title}>
                <TableCell>{row.address.addressLocality}</TableCell>
                <TableCell>{row.imageUrl}</TableCell>
                <TableCell>{row.startDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LIST}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>  
    </BaseLayoutOfPage>
 
  );

};