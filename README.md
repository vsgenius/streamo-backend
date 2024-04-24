[![Build status](https://ci.appveyor.com/api/projects/status/wtskubowa3gf16ib/branch/main?svg=true)](https://ci.appveyor.com/project/vsgenius/streamo-backend/branch/main) ![example workflow](https://github.com/vsgenius/streamo-backend/actions/workflows/node.js.yml/badge.svg)

## Backend для проекта Stream

- после клонирования npm install
- запуск npm run dev


### JSON Server

- добавляем (по аналогии с данными расположенными в файле) данные в файл ./static/db.json
- запускаем json server командой npx json-server ./static/db.json
- http://localhost:3000/[ключ из объекта в db.json]
- ссылка на док-ю https://github.com/typicode/json-server/tree/v0
