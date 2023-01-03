const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        console.log(email, password);

        if (!email || !password) {
            throw generateError('Debes enviar un email y una password', 400);
        }

        // Recogemos los datos de la base de datos del usuario con ese email

        res.send({
            status: 'Error',
            message: 'Not implemented',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginController,
};
