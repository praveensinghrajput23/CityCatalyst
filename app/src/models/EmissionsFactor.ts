import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { DataSource, DataSourceId } from "./DataSource";
import type {
  DataSourceEmissionsFactor,
  DataSourceEmissionsFactorId,
} from "./DataSourceEmissionsFactor";
import type { GasValue, GasValueId } from "./GasValue";

export interface EmissionsFactorAttributes {
  emissionsFactorId: string;
  emissionsFactor?: number;
  emissionsFactorUrl?: string;
  units?: string;
  created?: Date;
  lastUpdated?: Date;
}

export type EmissionsFactorPk = "emissionsFactorId";
export type EmissionsFactorId = EmissionsFactor[EmissionsFactorPk];
export type EmissionsFactorOptionalAttributes =
  | "emissionsFactor"
  | "emissionsFactorUrl"
  | "units"
  | "created"
  | "lastUpdated";
export type EmissionsFactorCreationAttributes = Optional<
  EmissionsFactorAttributes,
  EmissionsFactorOptionalAttributes
>;

export class EmissionsFactor
  extends Model<EmissionsFactorAttributes, EmissionsFactorCreationAttributes>
  implements EmissionsFactorAttributes
{
  emissionsFactorId!: string;
  emissionsFactor?: number;
  emissionsFactorUrl?: string;
  units?: string;
  created?: Date;
  lastUpdated?: Date;

  // EmissionsFactor belongsToMany DataSource via emissionsFactorId and datasourceId
  datasourceIdDataSourceDataSourceEmissionsFactors!: DataSource[];
  getDatasourceIdDataSourceDataSourceEmissionsFactors!: Sequelize.BelongsToManyGetAssociationsMixin<DataSource>;
  setDatasourceIdDataSourceDataSourceEmissionsFactors!: Sequelize.BelongsToManySetAssociationsMixin<
    DataSource,
    DataSourceId
  >;
  addDatasourceIdDataSourceDataSourceEmissionsFactor!: Sequelize.BelongsToManyAddAssociationMixin<
    DataSource,
    DataSourceId
  >;
  addDatasourceIdDataSourceDataSourceEmissionsFactors!: Sequelize.BelongsToManyAddAssociationsMixin<
    DataSource,
    DataSourceId
  >;
  createDatasourceIdDataSourceDataSourceEmissionsFactor!: Sequelize.BelongsToManyCreateAssociationMixin<DataSource>;
  removeDatasourceIdDataSourceDataSourceEmissionsFactor!: Sequelize.BelongsToManyRemoveAssociationMixin<
    DataSource,
    DataSourceId
  >;
  removeDatasourceIdDataSourceDataSourceEmissionsFactors!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    DataSource,
    DataSourceId
  >;
  hasDatasourceIdDataSourceDataSourceEmissionsFactor!: Sequelize.BelongsToManyHasAssociationMixin<
    DataSource,
    DataSourceId
  >;
  hasDatasourceIdDataSourceDataSourceEmissionsFactors!: Sequelize.BelongsToManyHasAssociationsMixin<
    DataSource,
    DataSourceId
  >;
  countDatasourceIdDataSourceDataSourceEmissionsFactors!: Sequelize.BelongsToManyCountAssociationsMixin;
  // EmissionsFactor hasMany DataSourceEmissionsFactor via emissionsFactorId
  dataSourceEmissionsFactors!: DataSourceEmissionsFactor[];
  getDataSourceEmissionsFactors!: Sequelize.HasManyGetAssociationsMixin<DataSourceEmissionsFactor>;
  setDataSourceEmissionsFactors!: Sequelize.HasManySetAssociationsMixin<
    DataSourceEmissionsFactor,
    DataSourceEmissionsFactorId
  >;
  addDataSourceEmissionsFactor!: Sequelize.HasManyAddAssociationMixin<
    DataSourceEmissionsFactor,
    DataSourceEmissionsFactorId
  >;
  addDataSourceEmissionsFactors!: Sequelize.HasManyAddAssociationsMixin<
    DataSourceEmissionsFactor,
    DataSourceEmissionsFactorId
  >;
  createDataSourceEmissionsFactor!: Sequelize.HasManyCreateAssociationMixin<DataSourceEmissionsFactor>;
  removeDataSourceEmissionsFactor!: Sequelize.HasManyRemoveAssociationMixin<
    DataSourceEmissionsFactor,
    DataSourceEmissionsFactorId
  >;
  removeDataSourceEmissionsFactors!: Sequelize.HasManyRemoveAssociationsMixin<
    DataSourceEmissionsFactor,
    DataSourceEmissionsFactorId
  >;
  hasDataSourceEmissionsFactor!: Sequelize.HasManyHasAssociationMixin<
    DataSourceEmissionsFactor,
    DataSourceEmissionsFactorId
  >;
  hasDataSourceEmissionsFactors!: Sequelize.HasManyHasAssociationsMixin<
    DataSourceEmissionsFactor,
    DataSourceEmissionsFactorId
  >;
  countDataSourceEmissionsFactors!: Sequelize.HasManyCountAssociationsMixin;
  // EmissionsFactor hasMany GasValue via emissionsFactorId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof EmissionsFactor {
    return EmissionsFactor.init(
      {
        emissionsFactorId: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          field: "emissions_factor_id",
        },
        emissionsFactor: {
          type: DataTypes.DECIMAL,
          allowNull: true,
          field: "emissions_factor",
        },
        emissionsFactorUrl: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: "emissions_factor_url",
        },
        units: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "EmissionsFactor",
        schema: "public",
        timestamps: true,
        createdAt: "created",
        updatedAt: "last_updated",
        indexes: [
          {
            name: "EmissionsFactor_pkey",
            unique: true,
            fields: [{ name: "emissions_factor_id" }],
          },
        ],
      },
    );
  }
}
