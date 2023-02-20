from dotenv import load_dotenv, dotenv_values

# dotenv_value
dotenv_values = dotenv_values()
print("Min hemmelighed: " + dotenv_values.get("MY_SECRET"))

# load_dotenv
load_dotenv()
import os
print("Min hemmelighed: " + os.getenv("MY_SECRET"))