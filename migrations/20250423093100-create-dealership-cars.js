"use strict"
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable("dealership_cars", {
        dealership_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "dealerships",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        car_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "cars",
                key: "id",
            },
            onDelete: "CASCADE",
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

    await queryInterface.addConstraint("dealership_cars", {
        fields: ["dealership_id", "car_id"],
        type: "unique",
        name: "unique_dealership_car",
    })
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable("dealership_cars")
}
