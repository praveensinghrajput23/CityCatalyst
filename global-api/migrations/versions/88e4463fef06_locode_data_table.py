"""locode_data_table

Revision ID: 88e4463fef06
Revises: cc8d00d4372e
Create Date: 2024-01-17 17:44:56.668758

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import text


# revision identifiers, used by Alembic.
revision: str = "88e4463fef06"
down_revision: Union[str, None] = "cc8d00d4372e"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "citywide_emissions",
        sa.Column("id", sa.dialects.postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("source_name", sa.String, nullable=False),
        sa.Column("GPC_refno", sa.String, nullable=False),
        sa.Column("city_name", sa.String, nullable=False),
        sa.Column("locode", sa.String, nullable=False),
        sa.Column("temporal_granularity", sa.String, nullable=False),
        sa.Column("year", sa.Float, nullable=False),
        sa.Column("activity_name", sa.String, nullable=False),
        sa.Column("activity_value", sa.Float, nullable=True),
        sa.Column("activity_units", sa.String, nullable=True),
        sa.Column("gas_name", sa.String, nullable=False),
        sa.Column("emission_factor_value", sa.Float, nullable=True),
        sa.Column("emission_factor_units", sa.String, nullable=True),
        sa.Column("emissions_value", sa.Float, nullable=False),
        sa.Column("emissions_units", sa.String, nullable=False),
        sa.Column(
            "created_date", sa.DateTime(), server_default=text("CURRENT_TIMESTAMP")
        ),
        sa.Column(
            "modified_date", sa.DateTime(), server_default=text("CURRENT_TIMESTAMP")
        ),
    )


def downgrade() -> None:
    op.drop_table("citywide_emissions")
