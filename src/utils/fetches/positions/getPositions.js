import {BaseUrl} from "../../constants.js";
import {getToken} from "../../getToken.js";

export async function getPositions(limit, offset) {
    const data = JSON.stringify({
        query: `query DepartmentsQuery($limit: Int, $offset: Int) {
            departments(limit: $limit, offset: $offset, where: {active: {_eq: true}, title: {}}, order_by: {id: desc}) {
                id
                title
                active
                departments_jobs(where: {active: {_eq: true}}) {
                active
                description
                title
                 id
                jobs_skills_jobs(where: {}) {
                    skills_jobs_skill {
                    title
                    status
                    id
                    }
                }
                }
            },
            departments_aggregate(where: {active: {_eq: true}}) {
                aggregate {
                count
                }
            }
        }`,
        
        variables: {
            limit: limit,
            offset: offset
        }
    });
    const response = await fetch(
        BaseUrl,
        {
            method: 'post',
            
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'Authorization': 'Bearer ' + getToken()
            },
            body: data
        }
    );
    
    return await response.json();
}