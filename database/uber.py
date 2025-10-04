import pandas as pd
from sqlalchemy import create_engine

# Path to your Excel file
excel_file = r"C:\Users\elect\Downloads\uber_data.xlsx"



# Create SQLite database (will create uber.db in the same folder)
engine = create_engine("sqlite:///uber.db")

# Read all sheets
sheets = pd.read_excel(excel_file, sheet_name=None)

# Loop through each sheet and write it as a table
for sheet_name, df in sheets.items():
    table_name = sheet_name.lower().replace(" ", "_")  # clean up table name
    df.to_sql(table_name, engine, if_exists="replace", index=False)
    print(f"Imported sheet '{sheet_name}' as table '{table_name}'")
