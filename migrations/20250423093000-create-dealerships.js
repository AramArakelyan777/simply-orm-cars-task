"use strict"
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable("dealerships", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        address: {
            type: Sequelize.STRING(200),
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
        },
        deletedAt: {
            type: Sequelize.DATE,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    })
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable("dealership_cars")
    await queryInterface.dropTable("users_dealerships")
    await queryInterface.dropTable("dealerships")
}
