export const getCorporate = async (req, res, next) => {
    try {
        const corporate = await fetch('https://corporatebs-generator.sameerkumar.website/');
        const data = await corporate.json();
        res.json(data);
    } catch (err) {
        next(err);
    }
};