const userRoutes = require('../components/users/user.routes');
const rolesRoutes = require("../components/roles/roles.routes.js");

const apiv1Routes = (app) => {
    app.use('/api/v1', userRoutes);
    app.use('/api/v1', rolesRoutes)
};

module.exports = apiv1Routes;