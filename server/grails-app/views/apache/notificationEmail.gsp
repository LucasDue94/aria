<%--
  Created by IntelliJ IDEA.
  User: nywton.barros
  Date: 23/12/2019
  Time: 11:38
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Notificação Apache</title>
</head>

<body>
    <p>Segue a lista dos apaches não preenchidos:</p>
    <ul>
        <% pacientes.each { paciente -> %>
            <li><%= paciente %></li>
        <% } %>
    </ul>
</body>
</html>