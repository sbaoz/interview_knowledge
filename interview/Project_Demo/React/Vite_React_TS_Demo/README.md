<!--
 * @Author: your name
 * @Date: 2021-11-09 10:39:17
 * @LastEditTime: 2021-11-09 11:06:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\README.md
-->
### tsconfig.json配置说明
  ```json
  {
    "$schema": "https://json.schemastore.org/tsconfig",
    "display": "Vite React",
    "compilerOptions": {
      "target": "ESNext",
      "useDefineForClassFields": true,
      "lib": ["DOM", "DOM.Iterable", "ESNext"],
      "allowJs": false,
      "skipLibCheck": false,
      "esModuleInterop": false,
      "allowSyntheticDefaultImports": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "module": "ESNext",
      "moduleResolution": "Node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx"
    },
    "include": ["./src"],
    "exclude": ["node_modules", "**/*.spec.ts"]
  }
  ```