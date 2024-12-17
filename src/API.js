import axios  from "axios";

const BASE_URL = "http://26.48.41.80:8000";
const API_TOKEN = "123";

export async function req(params, request, type) {
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


export async function get_users() {
    return req('', '/api/admin/users', 'get');
};

export async function get_ban_words() {
    return req('', '/api/admin/forbidden-word', 'get');
};

export async function get_hackatons() {
    return req('', '/api/hackathon', 'get');
};

export async function get_stacks() {
    return req('', '/api/tech-stack', 'get');
};

export async function add_ban_words(word) {
    const data = {
        word: word
    }
    return req(data, '/api/admin/forbidden-word/add', 'post');
};

export async function delete_ban_words(word) {
    const params = {
        word: word
    }
    return req(params, '/api/admin/forbidden-word/delete', 'delete');
};

export async function add_hackaton(name, host, status, date) {
    const data = {
        hackathon_name: name,
        host_hackathon: host, 
        activity_status: status,
        event_date: date
    }
    return req(data, '/api/admin/hackathon/add', 'post');
};

export async function change_status_hackaton(id) {
    const params = {
        hackathon_id: id
    }
    return req(params, '/api/admin/hackathon/change-status', 'patch');
};

export async function set_user_profile(name, surname, group, tg) {
    const data = {
        first_name: name,
        last_name: surname, 
        study_group: group,
        tag_telegram: tg,
    }
    return req(data, '/api/user/profile', 'post');
};

export async function hackaton_register(team, tg, role, id, stacks) {
    const data = {
        team_name: team,
        captain_tag: tg, 
        role_in_team: role,
        hackathon_id: id, 
        technology_stack: stacks,
    }
    return req(data, '/api/hackathon/register', 'post');
};

export async function add_stack(stack) {
    const data = {
        tech_name: stack
    }
    return req(data, '/api/tech-stack/add', 'post');
};

export async function get_my_hackatons(id) {
    const params = {
        id_telegram: id
    }
    return req(params, '/api/user/my_hackathon', 'get');
};

export async function get_profile() {
    return req('', '/api/user/my_hackathon', 'get');
};