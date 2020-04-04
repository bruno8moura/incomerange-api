let INCOME_RANGES = '/incomeranges';
let CONTRACT = '/contract';

exports.routes = {
        'BASE': '/',
        'INCOME_RANGES': INCOME_RANGES,
        'A_INCOME_RANGE': `${INCOME_RANGES}/:id`,
        'CONTRACT': `${CONTRACT}`,
        'INCOME_RANGES_CONTRACT': `${INCOME_RANGES}${CONTRACT}`
};      

