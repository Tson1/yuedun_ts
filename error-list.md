```Unhandled rejection CastError: Cast to ObjectId failed for value "logout" at path "_id" for model "Blog"
    at MongooseError.CastError (E:\workspace\yuedun_ts\node_modules\mongoose\lib\error\cast.js:26:11)
    at ObjectId.cast (E:\workspace\yuedun_ts\node_modules\mongoose\lib\schema\objectid.js:147:13)
    at ObjectId.castForQuery (E:\workspace\yuedun_ts\node_modules\mongoose\lib\schema\objectid.js:187:15)
```
原因是访问的路径不对

`SyntaxError: Octal literals are not allowed in strict mode`
有一种可能是文件名路径不对

```
Db.prototype.authenticate method will no longer be available in the next major release 3.x as MongoDB 3.6 will only allow auth against users in the admin db and will no longer allow multiple credentials on a socket. Please authenticate using MongoClient.connect with auth credentials.
```
