import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import type { Inventory, InventoryId } from "./Inventory";
import type { SubCategory, SubCategoryId } from "./SubCategory";
import type { DataSource, DataSourceId } from "./DataSource";
import type { Sector, SectorId } from "./Sector";
import type { SubSector, SubSectorId } from "./SubSector";
import type { GasValue, GasValueId } from "./GasValue";

export interface InventoryValueAttributes {
  id: string;
  gpcReferenceNumber?: string;
  activityValue?: number | null;
  activityUnits?: string | null;
  co2eq?: bigint;
  co2eqYears?: number;
  unavailableReason?: string;
  unavailableExplanation?: string;
  sectorId?: string;
  subSectorId?: string;
  subCategoryId?: string;
  inventoryId?: string;
  datasourceId?: string;
  created?: Date;
  lastUpdated?: Date;
}

export type InventoryValuePk = "id";
export type InventoryValueId = InventoryValue[InventoryValuePk];
export type InventoryValueOptionalAttributes =
  | "gpcReferenceNumber"
  | "activityValue"
  | "activityUnits"
  | "co2eq"
  | "co2eqYears"
  | "unavailableReason"
  | "unavailableExplanation"
  | "sectorId"
  | "subSectorId"
  | "subCategoryId"
  | "inventoryId"
  | "datasourceId"
  | "created"
  | "lastUpdated";
export type InventoryValueCreationAttributes = Optional<
  InventoryValueAttributes,
  InventoryValueOptionalAttributes
>;

export class InventoryValue
  extends Model<InventoryValueAttributes, InventoryValueCreationAttributes>
  implements InventoryValueAttributes
{
  id!: string;
  gpcReferenceNumber?: string;
  activityValue?: number | null;
  activityUnits?: string | null;
  co2eq?: bigint;
  co2eqYears?: number;
  unavailableReason?: string;
  unavailableExplanation?: string;
  sectorId?: string;
  subSectorId?: string;
  subCategoryId?: string;
  inventoryId?: string;
  datasourceId?: string;
  created?: Date;
  lastUpdated?: Date;

  // InventoryValue belongsTo Inventory via inventoryId
  inventory!: Inventory;
  getInventory!: Sequelize.BelongsToGetAssociationMixin<Inventory>;
  setInventory!: Sequelize.BelongsToSetAssociationMixin<Inventory, InventoryId>;
  createInventory!: Sequelize.BelongsToCreateAssociationMixin<Inventory>;
  // InventoryValue belongsTo SubCategory via subcategoryId
  sector!: Sector;
  getSector!: Sequelize.BelongsToGetAssociationMixin<Sector>;
  setSector!: Sequelize.BelongsToSetAssociationMixin<Sector, SectorId>;
  createSector!: Sequelize.BelongsToCreateAssociationMixin<Sector>;
  // InventoryValue belongsTo SubCategory via subcategoryId
  subSector!: SubSector;
  getSubSector!: Sequelize.BelongsToGetAssociationMixin<SubSector>;
  setSubSector!: Sequelize.BelongsToSetAssociationMixin<SubSector, SubSectorId>;
  createSubSector!: Sequelize.BelongsToCreateAssociationMixin<SubSector>;
  // InventoryValue belongsTo SubCategory via subcategoryId
  subcategory!: SubCategory;
  getSubcategory!: Sequelize.BelongsToGetAssociationMixin<SubCategory>;
  setSubcategory!: Sequelize.BelongsToSetAssociationMixin<
    SubCategory,
    SubCategoryId
  >;
  createSubcategory!: Sequelize.BelongsToCreateAssociationMixin<SubCategory>;
  // InventoryValue belongsTo DataSource via datasourceId
  dataSource!: DataSource;
  getDataSource!: Sequelize.BelongsToGetAssociationMixin<DataSource>;
  setDataSource!: Sequelize.BelongsToSetAssociationMixin<
    DataSource,
    DataSourceId
  >;
  createDataSource!: Sequelize.BelongsToCreateAssociationMixin<DataSource>;
  // InventoryValue hasMany GasValue via inventoryValueId
  gasValues!: GasValue[];
  getGasValues!: Sequelize.HasManyGetAssociationsMixin<GasValue>;
  setGasValues!: Sequelize.HasManySetAssociationsMixin<
    GasValue,
    GasValueId
  >;
  addGasValue!: Sequelize.HasManyAddAssociationMixin<
    GasValue,
    GasValueId
  >;
  addGasValues!: Sequelize.HasManyAddAssociationsMixin<
    GasValue,
    GasValueId
  >;
  createGasValue!: Sequelize.HasManyCreateAssociationMixin<GasValue>;
  removeGasValue!: Sequelize.HasManyRemoveAssociationMixin<
    GasValue,
    GasValueId
  >;
  removeGasValues!: Sequelize.HasManyRemoveAssociationsMixin<
    GasValue,
    GasValueId
  >;
  hasGasValue!: Sequelize.HasManyHasAssociationMixin<
    GasValue,
    GasValueId
  >;
  hasGasValues!: Sequelize.HasManyHasAssociationsMixin<
    GasValue,
    GasValueId
  >;
  countGasValues!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof InventoryValue {
    return InventoryValue.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          field: "id",
        },
        gpcReferenceNumber: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: "gpc_reference_number",
        },
        activityUnits: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: "activity_units",
        },
        activityValue: {
          type: DataTypes.DECIMAL,
          allowNull: true,
          field: "activity_value",
        },
        co2eq: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        co2eqYears: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: "co2eq_years",
        },
        unavailableReason: {
          type: DataTypes.TEXT,
          allowNull: true,
          field: "unavailable_reason",
        },
        unavailableExplanation: {
          type: DataTypes.TEXT,
          allowNull: true,
          field: "unavailable_explanation",
        },
        sectorId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "Sector",
            key: "sector_id",
          },
          field: "sector_id",
        },
        subSectorId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "SubSector",
            key: "subsector_id",
          },
          field: "sub_sector_id",
        },
        subCategoryId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "SubCategory",
            key: "subcategory_id",
          },
          field: "sub_category_id",
        },
        inventoryId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "Inventory",
            key: "inventory_id",
          },
          field: "inventory_id",
        },
        datasourceId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "DataSource",
            key: "datasource_id",
          },
          field: "datasource_id",
        },
      },
      {
        sequelize,
        tableName: "InventoryValue",
        schema: "public",
        timestamps: true,
        createdAt: "created",
        updatedAt: "last_updated",
        indexes: [
          {
            name: "InventoryValue_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      },
    );
  }
}
