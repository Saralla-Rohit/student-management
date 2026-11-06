package com.example.studentmanagement.controller;

import com.example.studentmanagement.entity.Student;
import com.example.studentmanagement.response.ApiResponse;
import com.example.studentmanagement.service.StudentService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://student-mgmt.rohitnet.dpdns.org"
})
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Student>>> getAllStudents() {

        List<Student> students = studentService.getAll();

        String message = students.isEmpty()
                ? "No students found"
                : "Students retrieved successfully";

        return ResponseEntity.ok(
                new ApiResponse<>("SUCCESS", message, students)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Student>> getStudentById(
            @PathVariable Long id) {

        Student student = studentService.getById(id);

        return ResponseEntity.ok(
                new ApiResponse<>("SUCCESS", "Student retrieved successfully", student)
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Student>> createStudent(
            @Valid @RequestBody Student student) {

        Student savedStudent = studentService.create(student);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        "SUCCESS",
                        "Student added successfully",
                        savedStudent
                ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Student>> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody Student student) {

        Student updatedStudent = studentService.update(id, student);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "SUCCESS",
                        "Student updated successfully",
                        updatedStudent
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStudent(
            @PathVariable Long id) {

        studentService.delete(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "SUCCESS",
                        "Student deleted successfully",
                        null
                )
        );
    }
}