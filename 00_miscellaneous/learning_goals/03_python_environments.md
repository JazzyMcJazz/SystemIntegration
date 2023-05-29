### Pip
The default build tool for Python. 

Installs dependencies on host system.

**Pro**: Just needs a python installation to start using it

**Con**: Project doesn't have a file listing dependencies and versions, so you will need to keep track of them manually and install prior to running the project on a new machine.

### Virtual Env
**Pros**:
- Widely used
**Cons**:
- Very simple tool, lacks advanced features
- Does not handle package dependencies
- Requires separate installation


### Poetry
**Pros**:
- Handles package dependencies and versions per project
- Is familiar if one has prior knowledge of tools such as npm
**Cons**:
- Not widely used
- Requires separate installation