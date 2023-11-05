import { Environment } from '../../../environment';
import { Api } from '../axios-config';


export interface IAddressDetails {
  type: string,
  streetAddress: string,
  addressLocality: string,
  addressRegion: null,
  postalCode: string,
  addressCountry: string
}

export interface IListOfTickets{
    title: string,
    startDate: string,
    endDate: string,
    imageUrl: string,
    shopUrl: string,
    address: IAddressDetails,
    priceFrom: number

}

export interface IDetailsOfTickets{
    title: string,
    startDate: string,
    endDate: string,
    imageUrl: string,
    shopUrl: string,
    address: object,
    priceFrom: number

}

type TTicketsTotalCount = {
    data: IListOfTickets[],
    totalCount: number

}

const getAllTickets = async (page = 1, filter= ''): Promise<TTicketsTotalCount | Error> => {
  try {

    const urlForPaginate = `/tickets?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&title_like=${filter}`;

    const {data, headers} = await Api.get(urlForPaginate);

    if(data) 
      return{
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMIT_OF_LINES),

      };
    return new Error('Error of list of registered tickets');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Error of list of registered tickets');
        
  }
};


const getById = async (id: number): Promise<IDetailsOfTickets | Error> =>{

  try {

    const urlForPaginate = `/tickets/${id}`;
    
    const {data} = await Api.get(urlForPaginate);
    
    if(data) 
      return data;    
        
    return new Error('Error when querying the registry');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Error of list of registered tickets');
            
  }};


export const TicketsService = {
  getAllTickets,
  getById
};
