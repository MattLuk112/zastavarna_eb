## [`Vite`](https://github.com/vitejs/vite)` version`

## Dependencies

### MongoDB

Solution to: 1001: MongoDB unavailable, please first install MongoDB before proceeding

#### macOS

```
brew tap mongodb/brew
```

```
brew install mongodb-community@4.4
```

##### mongod

```
brew services start mongodb/brew/mongodb-community
```

#### Connect to specific db

Run before start

```
export mongoUrl=XX.XXX.XXX.XXX 
```