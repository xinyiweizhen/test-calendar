import {apiFactory} from '@smart-link/context';
import * as mocks from './mocks';

const apiConfig = {
    mock: false,
    mocks,
};

const api = apiFactory(apiConfig);

export default api;
