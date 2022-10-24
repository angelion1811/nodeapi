exports.getPagination = (page, size) => {
    const limit = size ? parseInt(size) : 3;
    const offset = page ? parseInt(page) * limit : 0;
    return { limit, offset };
};

exports.getPagingData = (dataInfo, page, limit) => {
    const { count: total, rows: data } = dataInfo;
    const currentPage = page ? +page : 0;
    const total_pages = Math.ceil(total / limit);
    return { page: currentPage, per_page: limit, total, total_pages, data };
};