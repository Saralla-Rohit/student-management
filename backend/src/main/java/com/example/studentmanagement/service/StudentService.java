package com.example.studentmanagement.service;

import com.example.studentmanagement.entity.Student;
import com.example.studentmanagement.exception.DuplicateEmailException;
import com.example.studentmanagement.exception.StudentNotFoundException;
import com.example.studentmanagement.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAll() {
        return repository.findAll();
    }

    public Student getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));
    }

    public Student create(Student student) {
        if (repository.existsByEmail(student.getEmail())) {
            throw new DuplicateEmailException(student.getEmail());
        }
        student.setId(null);
        return repository.save(student);
    }

    public Student update(Long id, Student input) {
        Student existing = getById(id);
        if (!existing.getEmail().equalsIgnoreCase(input.getEmail())
                && repository.existsByEmail(input.getEmail())) {
            throw new DuplicateEmailException(input.getEmail());
        }
        existing.setName(input.getName());
        existing.setEmail(input.getEmail());
        existing.setAge(input.getAge());
        existing.setCourse(input.getCourse());
        return repository.save(existing);
    }

    public void delete(Long id) {
        Student existing = getById(id);
        repository.delete(existing);
    }
}
