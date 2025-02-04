from fastapi import APIRouter, HTTPException
from sqlalchemy import text
import pandas as pd
from db.database import SessionLocal

api_router = APIRouter(prefix="/api/v0")


def db_query():
    with SessionLocal() as session:
        query = text(
            """
            SELECT DISTINCT ROUND(EXTRACT(EPOCH FROM MAX(modified_date)))
            FROM datasource;
            """
        )

        result = session.execute(query).fetchall()

    return int(result[0][0])


@api_router.get("/catalogue/last-update")
def get_last_update():
    last_update_unix_time = db_query()

    if not last_update_unix_time:
        raise HTTPException(status_code=404, detail="No data available")

    return {"last_update": last_update_unix_time}
