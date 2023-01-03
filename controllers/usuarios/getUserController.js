const getUserController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await getUserById(id);

        res.send({
            status: 'ok',
            message: 'user',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserController,
};
