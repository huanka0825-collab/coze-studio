# 启探智能体工坊品牌覆盖层

本覆盖层保留开源智能体工作台的完整底层能力，并把前台体验整合为“启探 AI 工坊”的中文产品界面。

## 启动

```powershell
docker compose -f docker-compose.yml -f docker-compose.qitan.yml up -d --build
```

访问地址：

```text
http://localhost:8888
```

从启探 AI 工坊主平台进入：

```text
http://localhost:8000/#!/qitan-ai
```

## 覆盖内容

- 页面标题、HTML 语言、favicon、静态 logo 统一为启探智能体工坊。
- 运行时插入启探顶部栏、返回启探平台入口、能力地图、课堂生产线、能力条和感谢标识。
- 运行时替换可见旧品牌词、英文导航词、插件 OAuth 配置标签和工作流示例名。
- 左侧主导航的内联 SVG 标志会替换成启探“启”方章。
- 工作台背景使用 `branding/qitan/qitan-workbench-bg-v3.png`，登录页保留独立欢迎背景。
- 主题色覆盖为启探蓝、青、黄、珊瑚色系，并弱化上游默认紫色。
- 工作流名称支持中文、字母、数字和下划线。

## 关键文件

- `branding/qitan/Dockerfile`
- `branding/qitan/qitan-branding.js`
- `branding/qitan/qitan-logo.png`
- `branding/qitan/qitan-workbench-bg-v3.png`
- `docker-compose.qitan.yml`

## 验证

静态壳层：

```powershell
@'
import requests,re
html=requests.get('http://localhost:8888/sign?redirect=%2Fspace',timeout=10).content.decode('utf-8','replace')
print(re.search(r'<title>.*?</title>', html).group(0))
print(any(t in html for t in ['Coze','coze','扣子']))
for path in ['/qitan-branding.js','/qitan-workbench-bg-v3.png','/favicon.png']:
    r=requests.get('http://localhost:8888'+path,timeout=10)
    print(path, r.status_code, len(r.content))
'@ | python -
```

登录态资源库：

```powershell
@'
import requests,re
base='http://localhost:8888'
r=requests.post(base+'/api/passport/web/email/login/', json={'email':'qitan.local.audit@qitan.local','password':'QitanAudit2026!'}, headers={'Origin':base}, timeout=10)
token=re.search(r'session_key=([^;]+)', r.headers.get('Set-Cookie','')).group(1)
s=requests.Session()
s.headers.update({'Cookie':'session_key='+token})
body={'user_filter':0,'res_type_filter':[-1],'name':'','publish_status_filter':0,'space_id':'7647360047604826112','size':15}
data=s.post(base+'/api/plugin_api/library_resource_list', json=body, timeout=10).json()
print([(x.get('res_id'), x.get('name')) for x in data.get('resource_list', [])])
'@ | python -
```

## 说明

底层服务、数据库、对象存储和工作流能力仍来自本地开源工程与镜像。前台品牌、课程入口和视觉体验由启探覆盖层统一承载；AI 接口后续可以在平台配置中替换为自有接口。
