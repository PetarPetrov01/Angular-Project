module.exports = () => (req, res, next) => {
    if (Object.keys(req.query).length > 0) {

        if (req.query.sort) {
            const [sortKey, order] = req.query.sort.split(':');
            req.query.sort = {
                [sortKey]: order == 'asc' ? 1 : -1
            };
        };
    }

    next();
};