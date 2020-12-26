## Create mysql docker cointainer

```powershell
docker run --name szop -p 3306:3306 -e MYSQL_ROOT_PASSWORD=passwd -d mysql:latest
```

```powershell
docker exec -it szop bash
```

```bash
mysql -u root -p
```

```SQL.mysql
CREATE DATABASE szop CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
```

```SQL.mysql
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'passwd';
```

```SQL.mysql
flush privileges;
```
