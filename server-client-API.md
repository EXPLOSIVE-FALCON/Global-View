# Cient/Server API


## Instagram

Request from client includes an object with following structure:

```
  request = {
    timeStart: number,
    timeEnd: number,
    query: string,
    page: ,             //??????
    attitude: number,
    latitude: number
  }
```

Response from server:

```
  response.data = {
    previewUrl: string, //need to understand the size, kinda 80px x 80px
    imageUrl: string,
    authorName: string,
    authorUrl: string, //??????
    message: string
  }
```


## Twitter

Request from client includes an object with following structure:

```
  request = {
    timeStart: number,
    timeEnd: number,
    query: string,
    page: , //need to discuss
    attitude: number,
    latitude: number
  }
```
