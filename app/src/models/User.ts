import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { City, CityId } from "./City";
import type { Inventory, InventoryId } from "./Inventory";

export interface UserAttributes {
  userId: string;
  name?: string;
  pictureUrl?: string;
  email?: string;
  passwordHash?: string;
  role?: string;
  defaultInventoryId?: string;
  created?: Date;
  lastUpdated?: Date;
  organizationId?: string;
}

export type UserPk = "userId";
export type UserId = User[UserPk];
export type UserOptionalAttributes =
  | "name"
  | "pictureUrl"
  | "email"
  | "passwordHash"
  | "role"
  | "defaultInventoryId"
  | "created"
  | "lastUpdated"
  | "organizationId";
export type UserCreationAttributes = Optional<
  UserAttributes,
  UserOptionalAttributes
>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  userId!: string;
  name?: string;
  pictureUrl?: string;
  email?: string;
  passwordHash?: string;
  role?: string;
  defaultInventoryId?: string;
  created?: Date;
  lastUpdated?: Date;

  // User belongsToMany City via CityId
  cities!: City[];
  getCities!: Sequelize.BelongsToManyGetAssociationsMixin<City>;
  setCities!: Sequelize.BelongsToManySetAssociationsMixin<City, CityId>;
  addCity!: Sequelize.BelongsToManyAddAssociationMixin<City, CityId>;
  addCities!: Sequelize.BelongsToManyAddAssociationsMixin<City, CityId>;
  createCity!: Sequelize.BelongsToManyCreateAssociationMixin<City>;
  removeCity!: Sequelize.BelongsToManyRemoveAssociationMixin<
    City,
    CityId
  >;
  removeCities!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    City,
    CityId
  >;
  hasCity!: Sequelize.BelongsToManyHasAssociationMixin<City, CityId>;
  hasCities!: Sequelize.BelongsToManyHasAssociationsMixin<City, CityId>;
  countCities!: Sequelize.BelongsToManyCountAssociationsMixin;
  // User belongsTo Inventory via defaultInventoryId
  defaultInventory!: Inventory;
  getDefaultInventory!: Sequelize.BelongsToGetAssociationMixin<Inventory>;
  setDefaultInventory!: Sequelize.BelongsToSetAssociationMixin<Inventory, InventoryId>;
  createDefaultInventory!: Sequelize.BelongsToCreateAssociationMixin<Inventory>;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init(
      {
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          field: "user_id",
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        pictureUrl: {
          type: DataTypes.TEXT,
          allowNull: true,
          field: "picture_url",
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: "User_email_key",
        },
        passwordHash: {
          type: DataTypes.CHAR(60),
          allowNull: true,
          field: "password_hash",
        },
        role: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        defaultInventoryId: {
          type: DataTypes.UUID,
          allowNull: true,
          field: "default_inventory_id",
        },
      },
      {
        sequelize,
        tableName: "User",
        schema: "public",
        timestamps: true,
        createdAt: "created",
        updatedAt: "last_updated",
        indexes: [
          {
            name: "User_email_key",
            unique: true,
            fields: [{ name: "email" }],
          },
          {
            name: "User_pkey",
            unique: true,
            fields: [{ name: "user_id" }],
          },
        ],
      },
    );
  }
}
