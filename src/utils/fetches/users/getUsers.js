import { getToken } from "../../getToken.js";
import { BaseUrl } from "../../constants.js";

export async function getUsers(limit, offset, order, search, status) {
    let variables = { limit, offset, order };
    
    let builtQuery = ``;
    
    if (search || status) {
        if (search && search !== '') {
            builtQuery += `lastname: {_ilike: "${search + '%'}"}`;
        }
        if (status && status !== '') {
            if (search && search !== '') builtQuery += `, `;
            
            let statusQuery = status ? 1 : 0;
            
            builtQuery += `status: {_eq: ${statusQuery}}`;
        }
    }
    
    const query = `query getUsers($limit: Int, $offset: Int = 1, $order: order_by) {
        users(limit: $limit, offset: $offset, order_by: {id: $order}, where: {${builtQuery}}) {
            email
            firstname
            id
            lastname
            role
            status
            active
            manager_id
            job_id
        },
        users_aggregate(
            where:{
                ${builtQuery}
            }
        )
        {aggregate{count}}}`;
    
    const data = JSON.stringify({ query, variables });
    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authorization': 'Bearer ' + getToken()
    };
    
    try {
        const response = await fetch(BaseUrl, {
            method: 'POST',
            headers,
            body: data
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}