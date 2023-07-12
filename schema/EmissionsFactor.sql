CREATE TABLE "EmissionsFactor"(
    "emissions_factor_id" varchar(36),
    "emissions_factor" varchar(255),
    "emissions_factor_link" varchar(255),
    "unit" varchar(255),
    "created" timestamp,
    "last_updated" timestamp,
    PRIMARY KEY("emissions_factor_id")
);