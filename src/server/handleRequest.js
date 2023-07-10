const axios = require('axios');

exports.getPhotoFromPixabay = async (req, res) => {
    console.log(req.body);
    const location = req.body.location;
    const baseUrl = 'https://pixabay.com/api/?lang=en&image_type=photo&category=places';
    const key = '&key=' + process.env.PIXABY_KEY;
    const loc = '&q=' + location;

    try {
        
        const respond = await axios(baseUrl + key + loc);
        const data = respond.data;

        if (data.totalHits >= 1) {
            res.status(200).send(data.hits[0]);
            return;
        }
        
        res.status(204).send('No content');
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}
