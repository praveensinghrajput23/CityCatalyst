import argparse
import logging
import os
import pandas as pd
from pathlib import Path
from sqlalchemy import create_engine, insert, MetaData, Table

def record_generator(fl):
    """returns a generator for the csv file
    Note: I was getting the following error using csv.DictReader
    Error: field larger than field limit (131072)
    """
    df = pd.read_csv(fl)
    for _, row in df.iterrows():
        yield row.to_dict()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--database_uri', help='database URI (e.g. postgresql://ccglobal:@localhost/ccglobal)', default=os.environ.get("DB_URI"))
    parser.add_argument('--dir', help='path to directory with CSV files to import')
    parser.add_argument('--file', help='path to file you want to import')
    parser.add_argument('--log_file', help='path to log file', default='./osm_importer.log')
    args = parser.parse_args()

    logging.basicConfig(
        filename=args.log_file,
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
    )

    engine = create_engine(args.database_uri)
    metadata = MetaData(bind=engine)

    osm = Table('osm', metadata, autoload=True)
    fields = [col.name for col in osm.columns]

    if args.file and args.dir:
        print('Error: --file and --dir can not be set at same time')
    elif args.file:
        file = Path(args.file).absolute()

        generator = record_generator(file)

        record_counter = 0
        for record in generator:
            record_counter += 1
            logging.info(f"Processing row num: {record_counter} in file: {file} ")

            record = {key: value for key, value in record.items() if value != ''}
            table_data = {key: record.get(key) for key in record.keys() if key in fields}
            ins = osm.insert().values(**table_data)

            with engine.begin() as conn:  # Use a transaction
                conn.execute(ins)
    elif args.dir:
        files = Path(args.dir).glob('*.csv')

        for file in files:
            generator = record_generator(file)

            record_counter = 0
            for record in generator:
                record_counter += 1
                logging.info(f"Processing row num: {record_counter} in file: {file} ")

                record = {key: value for key, value in record.items() if value != ''}
                table_data = {key: record.get(key) for key in record.keys() if key in fields}
                ins = osm.insert().values(**table_data)

                with engine.begin() as conn:
                    conn.execute(ins)
    else:
        print('Please set either --file or --dir')

    logging.info(f"Done!")

