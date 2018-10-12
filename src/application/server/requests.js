import { getJson } from '../../common/http';

export const authUser = personalToken => getJson('/api/v1/musica/user/login', null, { headers: { personalToken } });

