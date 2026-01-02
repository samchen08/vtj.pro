# 项目初始化

首次启动项目前需要完成项目依赖安装、环境变量配置、初始化数据等操作，请按以下步骤操作。

## 初始化步骤

### 1. 安装项目依赖

```bash
pnpm install
```

### 2. 配置后端项目环境变量

后端项目使用 `.env` 文件进行环境变量配置，支持不同环境的配置文件：

#### 环境配置文件

1. **`.env`** - 默认/本地环境配置
2. **`.env.development`** - 开发环境配置
3. **`.env.production`** - 生产环境配置

**优先级**：当同时存在多个配置文件时，优先级为：`.env.{NODE_ENV}` > `.env`

#### 主要环境变量说明

| 变量名                  | 说明                                  | 示例值                                         |
| ----------------------- | ------------------------------------- | ---------------------------------------------- |
| `PORT`                  | 应用服务端口                          | `3000`                                         |
| `DATABASE_HOST`         | 数据库主机地址                        | `127.0.0.1` 或 `rm-xxx.mysql.rds.aliyuncs.com` |
| `DATABASE_PORT`         | 数据库端口                            | `3306`                                         |
| `DATABASE_NAME`         | 数据库名称                            | `vtj_pro`                                      |
| `DATABASE_USER`         | 数据库用户名                          | `root`                                         |
| `DATABASE_PASSWORD`     | 数据库密码                            | `12345678`                                     |
| `LOCAL_UPLOAD_BASE_DIR` | 本地文件上传目录（当OSS未启用时生效） | `uploadfiles`                                  |
| `OSS_ENABLED`           | 是否启用阿里云OSS                     | `true` 或 `false`                              |
| `OSS_ACCESS_KEY_ID`     | 阿里云OSS Access Key Id               | `LTAI****Ud`                                   |
| `OSS_ACCESS_KEY_SECRET` | 阿里云OSS Access Key Secret           | `5Hh4***1nEId`                                 |
| `OSS_BUCKET`            | OSS存储桶名称                         | `vtj`                                          |
| `OSS_REGION`            | OSS区域                               | `oss-cn-guangzhou`                             |
| `OSS_ENDPOINT`          | OSS端点（可选）                       | 留空使用默认                                   |
| `OSS_SECURE`            | 是否使用HTTPS                         | `true`                                         |
| `OSS_TIMEOUT`           | OSS请求超时时间（毫秒）               | `6000`                                         |
| `OSS_MAX_FILE_SIZE`     | 最大文件上传大小（字节）              | `10485760` (10MB)                              |

#### 配置示例

**本地开发环境配置（.env）：**

```bash
# 应用端口
PORT = '3000'

# 数据库配置
DATABASE_USER = 'root'
DATABASE_PASSWORD = '12345678'
DATABASE_HOST = '127.0.0.1'
DATABASE_PORT = '3306'
DATABASE_NAME = 'vtj_pro'

# 本地文件上传
LOCAL_UPLOAD_BASE_DIR = 'uploadfiles'

# 阿里云OSS配置
OSS_ENABLED = 'true'
OSS_ACCESS_KEY_ID = '阿里OSS Access Key Id'
OSS_ACCESS_KEY_SECRET = '阿里OSS 密钥'
OSS_BUCKET = 'vtj'
OSS_REGION = 'oss-cn-guangzhou'
OSS_ENDPOINT = ''
OSS_SECURE =  'true'
OSS_TIMEOUT = 6000
OSS_MAX_FILE_SIZE = 10485760
```

#### 注意事项

1. **敏感信息保护**：请勿将包含真实密码、密钥的配置文件提交到版本控制系统
2. **环境区分**：开发、测试、生产环境应使用不同的数据库和OSS配置
3. **OSS启用**：如果 `OSS_ENABLED=false`，系统将使用本地文件存储
4. **端口冲突**：确保 `PORT` 指定的端口未被其他应用占用

#### 操作步骤

1. 进入 `backend` 目录：`cd backend`
2. 复制环境配置文件模板（如需要）：
   ```bash
   cp .env.example .env
   ```
3. 编辑 `.env` 文件，根据实际情况修改配置值
4. 如需配置特定环境，可创建 `.env.development` 或 `.env.production` 文件

### 3. 启动后端开发服务

启动后端服务完成数据库表的创建，命令：

```bash
npm run server
```

当提示服务已成功启动后，可关闭服务，进行下一步初始化种子数据。

### 4. 初始化种子数据

```bash
npm run seed
```

执行命令初始化数据

### 5. 启动后端服务和前端开发服务

再次自动后端服务

```bash
npm run server
```

新建终端，启动前端开发服务

```bash
npm run dev
```

页面打开后用默认超级管理员账号( **VtjAdmin** )登录, 初始密码：**Vtj@9527**

注意： 登录后记得修改密码

### 6. 按需进行平台相关配置

#### 系统设置

#### 模型配置

## 总结

到此已完成了项目的初始化，如需定制或二次开发，参考步骤5，依次启动后端和前端开发服务即可调试。
