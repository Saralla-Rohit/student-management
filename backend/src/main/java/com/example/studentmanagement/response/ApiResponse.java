package com.example.studentmanagement.response;

public record ApiResponse<T>(
        String status,
        String message,
        T data
) {}