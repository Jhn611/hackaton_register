import axios  from "axios";

const BASE_URL = "http://26.48.41.80:8000";
const API_TOKEN = "123";

export async function req(params, request, type, data = null) {
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
                response = await axios.post(BASE_URL + request, data, config);
                break;
            case 'patch':
                response = await axios.patch(BASE_URL + request, data, config);
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

export async function get_stecks() {
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

export async function add_hackaton(name, host, status) {
    const data = {
        hackathon_name: name,
        host_hackathon: host, 
        activity_status: status
    }
    return req(data, '/api/admin/hackathons/add', 'post');
};

export async function change_status_hackaton(id) {
    const params = {
        hackathon_id: id
    }
    return req(params, '/api/admin/hackathon/change-status', 'patch');
};

