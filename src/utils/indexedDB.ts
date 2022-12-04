export default class DB {
  private dbName: string // 数据库名称
  private db: any // 数据库对象

  constructor(dbName: string) {
    this.dbName = dbName
  }

  // 打开数据库
  public openStore(storeName: string, keyPath: string, indexs?: Array<string>) {
    // 两个参数（名称，数据库版本（默认为1）），返回一个对象，有三个回调
    // 第一次打开会先触发onupgradeneeded，再onsuccess
    const request = window.indexedDB.open('', 1)
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('数据库打开成功')
        this.db = event.target.result
        // console.log(event)
        // 打开成功才放行promise
        resolve(true)
      }
      request.onerror = (event) => {
        console.log('数据库打开失败')
        // console.log(event)
        reject(event)
      }

      // 第一次打开或者版本发生更新
      request.onupgradeneeded = (event) => {
        console.log('数据库升级成功')
        const { result }: any = event.target
        // 创建对象仓库（相当于数据库中的一个表），第一个参数为存储对象名称
        const store = result.createObjectStore(storeName, { autoIncrement: true, keyPath })

        if (indexs && indexs.length > 0) {
          indexs.map((value: string) => {
            // 创建索引
            store.createIndex(value, value, { unique: false })
          })
        }

        store.transaction.oncomplete = (event: any) => {
          console.log('创建仓库成功')
        }
        // console.log(event)
      }
    })

  }

  // 新增/修改数据库数据
  updateItem(storeName: string, data: any) {
    // 开启事务 两个参数 （数据库对象名称（数组），读写/只读）
    // objectStore拿到store对象
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    // 使用put可以实现新增和修改,但是put是不能重复的，可以使用添加一个时间戳解决
    // add只能新增
    const request = store.put({
      ...data,
      updateTime: (new Date).getTime()
    })
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('数据写入成功')
        // console.log(event)
        resolve(event)
      }
      request.onerror = (event: any) => {
        console.log('数据写入失败')
        // console.log(event)
        reject(event)
      }
    })
  }

  // 删除数据库数据
  deleteItem(storeName: string, key: number | string) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.delete(key)
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('数据删除成功')
        // console.log(event)
        resolve(event)
      }
      request.onerror = (event: any) => {
        console.log('数据删除失败')
        // console.log(event)
        reject(event)
      }
    })
  }

  // 查询所有数据
  getList(storeName: string) {
    const store = this.db.transaction([storeName]).objectStore(storeName)
    const request = store.getAll()
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('查询所有数据成功')
        // console.log(event.target.result)
        resolve(event.target.result)
      }
      request.onerror = (event: any) => {
        console.log('查询所有数据失败')
        // console.log(event)
        reject(event)
      }
    })
  }

  // 查询某条数据
  getItem(storeName: string, key: number | string) {
    const store = this.db.transaction([storeName]).objectStore(storeName)
    const request = store.get(key)
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('查询某条数据成功')
        // console.log(event)
        resolve(event.target.result)
      }
      request.onerror = (event: any) => {
        console.log('查询某条数据失败')
        // console.log(event)
        reject(event)
      }
    })
  }
}





