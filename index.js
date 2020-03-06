const express = require('express')
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
});

class User extends Model { }
User.init({
    name: {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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

async function getUser(name) {
    user.findOne({ where: {name: name} }).then(user => {
        return user.id
    });
}

async function createUser() {
    let user = await User.create({
        name: process.argv[2],
        password: process.argv[3],
        age: process.argv[4],
        email: process.argv[5],
        sexe: process.argv[6],
        sexualorientation: process.argv[7]
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
          email: user.email,
          password: user.password
        }
    });
}

function startServer(app, port) {
    app.get('/hello', (req, res) => {
        res.send('world');
        res.status(200).end();
    });
    app.get('/repeat-my-query', (req, res) => {
        if (req.query.message) {
            res.status(400).send('Bad Request');
            return;
        }
        res.status(200).send(req.query.message);
    });
    app.listen(port, () => console.log(`Ready`))
}

async function main() {
    const app = express();
    const port = 2020;
    startServer(app, port);
    try {
        await sequelize.sync();
        let user = null;
        //id = await getUser(process.argv[2]);
        if (!process.argv[7]) {
            console.log("\nToo few arguments(name password age email sexe sexual-orientation)\n");
            return;
        }
        user = await createUser();
        //user = await modifyPassword(user, process.argv[4]);
        //await deleteUser(user);
        console.log(user.toJSON());
    } catch (e) {
        console.error(e);
    }
}

main()