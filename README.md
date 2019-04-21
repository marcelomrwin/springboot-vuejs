### Projeto exemplo Spring Boot e Vue.js

### Referência do projeto
https://github.com/marcelomrwin/springboot-vuejs

### Build do projeto

Na raiz do projeto

```
mvn clean package -DskipTests
```

Para executar o projeto

```
mvn --projects backend spring-boot:run
```

### Testar a aplicação

Acessar a URL http://localhost:8088

**O Spring Dev-Tools está habilitado permitindo assim redeploy na medida que o código é atualizado**

### Habilitando Live Reload na interface Vue.js

Navegar até a pasta frontend e digitar
```
npm run serve
```
