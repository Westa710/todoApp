package com.example.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class JdbcDemo {
    public static void main(String[] args) {
        String host = System.getenv().getOrDefault("DB_HOST", "db");
        String port = System.getenv().getOrDefault("DB_PORT", "5432");
        String database = System.getenv().getOrDefault("DB_NAME", "postgres");
        String user = System.getenv().getOrDefault("DB_USER", "postgres");
        String password = System.getenv().getOrDefault("DB_PASSWORD", "postgres");

        String url = "jdbc:postgresql://%s:%s/%s".formatted(host, port, database);

        System.out.println("Connecting to: " + url);

        try (Connection connection = DriverManager.getConnection(url, user, password);
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT 1 AS value")) {

            if (resultSet.next()) {
                System.out.println("DB connected. Query result = " + resultSet.getInt("value"));
            }
        } catch (Exception exception) {
            System.err.println("Failed to connect to DB: " + exception.getMessage());
            exception.printStackTrace();
            System.exit(1);
        }
    }
}