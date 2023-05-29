## Levels of Environment Variables

**System Level Environment Variables**
- Defined and available system wide

**User Level Environment Variables**
- Specific to the currently logged in user of the host system

**Session Level Environment Variables**
- Variables that belong to a session, for example a terminal window or a user session. These variables are discarded when the session ends.

**Process Level Environment Variables**
- Defined and only available for a specific process and are discarded when the process finishes. Dotenv variables are process level.

## Define Env in different languages

```js
// Node

// Setting an environment variable
process.env.VARIABLE_NAME = "Value";
```

```python
# Python

import os
# Setting an environment variable
os.environ["VARIABLE_NAME"] = "Value"
```

```bash
# Bash

# Setting an environment variable
export VARIABLE_NAME="Value"
```

```pwsh
# Setting an environment variable
$env:VARIABLE_NAME = "Value"
```

