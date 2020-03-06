const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
});

class User extends Model { }
User.init({
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexualorientation: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { sequelize, modelName: 'user' });

async function getUser(username) {
    user.findOne({ where: {username: username} }).then(user => {
        //console.log(user.id),
        return user.id
    });
}

async function createUser(username, password) {
    let user = await User.create({
        username: username,
        password: password
    });
    return user;
}

async function modifyPassword(user, password) {
    user.password = password;
    await user.save();
    return user;
}

async function deleteUser(user) {
    await User.destroy({where: {
          id: user.id,
        }
    });
}

async function main() {
    try {
        await sequelize.sync();
        let user = null;
        id = null;
        if (process.argv[2] && !process.argv[3]) {
            id = await getUser(process.argv[2]);
            console.log(id);
            return;
        }
        if (process.argv[3] && !process.argv[4])
            user = await createUser(process.argv[2], process.argv[3]);
        if (process.argv[4])
            user = await modifyPassword(user, process.argv[4]);
        await deleteUser(user);
        console.log(user.toJSON());
    } catch (e) {
        console.error(e);
    }
}

main()