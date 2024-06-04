const axios = require('axios');

const getProducts = async (req, res) => {
    const { categoryname } = req.params;
    const { n, minPrice, maxPrice, page, sort, order } = req.query;

    // API call to test server
    try {
        const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products`, {
            params: {
                top: n,
                minPrice: minPrice,
                maxPrice: maxPrice
            },
            headers: {
                'Authorization': `Bearer YOUR_ACCESS_TOKEN`
            }
        });

        // Sorting and pagination logic
        let products = response.data;
        if (sort && order) {
            products.sort((a, b) => {
                if (order === 'asc') {
                    return a[sort] > b[sort] ? 1 : -1;
                } else {
                    return a[sort] < b[sort] ? 1 : -1;
                }
            });
        }

        const paginatedProducts = paginate(products, page, n);
        res.json(paginatedProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    const { categoryname, productid } = req.params;

    // API call to test server
    try {
        const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products`, {
            headers: {
                'Authorization': `Bearer YOUR_ACCESS_TOKEN`
            }
        });

        const product = response.data.find(p => p.productId === productid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const paginate = (items, page, per_page) => {
    page = page || 1;
    per_page = per_page || 10;
    const offset = (page - 1) * per_page;
    const paginatedItems = items.slice(offset).slice(0, per_page);
    return {
        page: page,
        per_page: per_page,
        total: items.length,
        total_pages: Math.ceil(items.length / per_page),
        data: paginatedItems
    };
};

module.exports = { getProducts, getProductById };
