# Setup MongoDB Server
## MongoDB server on Ubuntu 22.04
1. Install `gnupg` and `curl` if they are not available
    ```sudo apt-get install gnupg curl```
    
2. Import the MongoDB public GPG key
   ```bash
   curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
   ```
3. Create a list file for MongoDB
   ```bash
   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   ```
4. Reload local package database
   ```sudo apt-get update```
5. Install the MongoDB packages
   ```sudo apt-get install -y mongodb-org```

<br />

> [Here](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu) you can find all details.

## Run local MongoDB server manually
1. Create the data directory for MongoDB  
`sudo mkdir -p /data/db`

2. Ensure that the directory has the correct permission 
```sudo chown -R `id -u`:`id -g` /data/db```

3. Start MongoDB manually
   `mongod --dbpath /data/db`

4. Open another terminal and connect to your MongoDB instance using mongo shell
    `mongosh`