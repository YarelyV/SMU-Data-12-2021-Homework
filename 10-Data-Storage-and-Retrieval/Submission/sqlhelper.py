import pandas as pd
from sqlalchemy import create_engine

class SQLHelper():
    def __init__(self):
        self.engine = create_engine("sqlite:///Resources/hawaii.sqlite")

    def executeQuery(self, query):
        try:
            conn = self.engine.connect()
            df = pd.read_sql(query, conn)
            conn.close()

            data = df.to_dict(orient="records")
            return(data)

        except Exception as e:
            print(e)
            error = {"error": "Does not work!"}
            return(error)
