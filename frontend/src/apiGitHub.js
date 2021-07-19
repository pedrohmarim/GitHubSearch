import Axios from 'axios';

const apiGitHub = Axios.create({ baseURL: 'https://api.github.com' });

export default apiGitHub;
