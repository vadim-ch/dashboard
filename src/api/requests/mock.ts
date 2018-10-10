export const promiseMock = (data: any, checkAuth: boolean = true) => {
    const token = window.localStorage.getItem('at');

    return new Promise((resolve, reject) => {
        if (!checkAuth) {
            resolve(data);
        } else {
            if (token) {
                resolve(data);
            } else {
                reject({ response: 'Error auth' });
            }
        }
    });
};

export const mockData = {
    id: 'testId',
    email: 'chedder@gmail.com',
    firstName: 'Сыр',
    lastName: 'Чеддер',
    accessToken: 'ads',
    refreshToken: 'asd'
};