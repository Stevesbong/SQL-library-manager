const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Book extends Sequelize.Model{}
    Book.init({
        title: {
            type:Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please provide a 'Title' of the book.",
                },
                notEmpty: {
                    msg: "'Title' should not be empty."
                }
            }
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please provide a 'Author' of the book."
                },
                notEmpty: {
                    msg: "'Author' should not be empty."
                }
            }
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please provide a 'Genre' of the book."
                },
                notEmpty: {
                    msg: "'Genre' should not be empty."
                }
            }
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please provide a 'Year' of the book."
                },
                notEmpty: {
                    msg: "'Year' should not be empty."
                },
                isInt: {
                    msg: "'Year' should be an integer number."
                }
            }
        }
    }, { sequelize });

    return Book;
}