package com.example.studentmanagement.exception;

import com.example.studentmanagement.response.ApiResponse;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Student not found - 404
    @ExceptionHandler(StudentNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFound(
            StudentNotFoundException ex) {

        return errorResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    // Duplicate email - 409
    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<ApiResponse<Void>> handleDuplicateEmail(
            DuplicateEmailException ex) {

        return errorResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    // Validation errors - 400
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidation(
            MethodArgumentNotValidException ex) {

        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining("; "));

        return errorResponse(HttpStatus.BAD_REQUEST, message);
    }

    // Database constraint violations - 409
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<Void>> handleDatabaseConflict(
            DataIntegrityViolationException ex) {

        return errorResponse(
                HttpStatus.CONFLICT,
                "The submitted data conflicts with an existing record."
        );
    }

    // Unexpected errors - 500
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneralException(
            Exception ex) {

        return errorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "An unexpected error occurred."
        );
    }

    // Common error response method
    private ResponseEntity<ApiResponse<Void>> errorResponse(
            HttpStatus status,
            String message) {

        ApiResponse<Void> response = new ApiResponse<>(
                "ERROR",
                message,
                null
        );

        return ResponseEntity.status(status).body(response);
    }
}