import axios  from "axios";

const BASE_URL = "http://26.48.41.80:8000";


export async function req(params, request, type, API_TOKEN) {
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            params: params
        };

        let response;
        switch (type) {
            case 'get':
                response = await axios.get(BASE_URL + request, config);
                break;
            case 'post':
                response = await axios.post(BASE_URL + request, params, config);
                break;
            case 'patch':
                response = await axios.patch(BASE_URL + request, params, config);
                break;
            case 'delete':
                response = await axios.delete(BASE_URL + request, config);
                break;
            default:
                throw new Error(`Unsupported request type: ${type}`);
        }

        console.log(`Success ${type} request!`, request);
        return response.data;

    } catch (error) {
        console.error('Ошибка при запросе:', error.message);
        return null;
    }
};


export async function get_users(token) {
    return req('', '/api/admin/users', 'get', token);
};

export async function get_ban_words(token) {
    return req('', '/api/admin/forbidden-word', 'get', token);
};

export async function get_hackatons(token) {
    return req('', '/api/hackathon', 'get', token);
};

export async function get_stacks(token) {
    return req('', '/api/tech-stack', 'get', token);
};

export async function add_ban_words(word, token) {
    const data = {
        word: word
    }
    return req(data, '/api/admin/forbidden-word/add', 'post', token);
};

export async function delete_ban_words(word, token) {
    const params = {
        word: word
    }
    return req(params, '/api/admin/forbidden-word/delete', 'delete', token);
};

export async function add_hackaton(name, host, status, date, token) {
    const data = {
        hackathon_name: name,
        host_hackathon: host, 
        activity_status: status,
        event_date: date
    }
    return req(data, '/api/admin/hackathon/add', 'post', token);
};

export async function change_status_hackaton(id, token) {
    const params = {
        hackathon_id: id
    }
    return req(params, '/api/admin/hackathon/change-status', 'patch', token);
};

export async function set_user_profile(name, surname, group, tg, token) {
    const data = {
        first_name: name,
        last_name: surname, 
        study_group: group,
        tag_telegram: tg,
    }
    return req(data, '/api/user/profile', 'post', token);
};

export async function hackaton_register(team, tg, role, id, stacks, token) {
    const data = {
        team_name: team,
        captain_tag: tg, 
        role_in_team: role,
        hackathon_id: id, 
        technology_stack: stacks,
    }
    return req(data, '/api/hackathon/register', 'post', token);
};

export async function add_stack(stack, token) {
    const data = {
        tech_name: stack
    }
    return req(data, '/api/tech-stack/add', 'post', token);
};

export async function get_my_hackatons(id, token) {
    const params = {
        id_telegram: id
    }
    return req(params, '/api/user/my_hackathon', 'get', token);
};

export async function get_profile(token) {
    return req('', '/api/user/my_hackathon', 'get', token);
};