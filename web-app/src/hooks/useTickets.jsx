// import { useState, useEffect } from 'react';
// import { fetchTickets } from '../services/ticketService';
//
// export const useTickets = () => {
//     const [tickets, setTickets] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const loadTickets = async () => {
//             try {
//                 const data = await fetchTickets();
//                 setTickets(data);
//             } catch (error) {
//                 console.error("Failed to fetch tickets", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadTickets();
//     }, []);
//
//     return { tickets, loading };
// };
