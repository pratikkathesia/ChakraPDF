package com.chakrapdf.main.controller;

import com.chakrapdf.main.service.DocumentConversionService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/api")
public class DocumentConversionController {

    private final DocumentConversionService conversionService;

    public DocumentConversionController(DocumentConversionService conversionService) {
        this.conversionService = conversionService;
    }

    @PostMapping("/convertdocx")
    public ResponseEntity<?> convertToPdf(@RequestParam("file") MultipartFile file) {
        if (!file.getOriginalFilename().endsWith(".docx")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid file type. Only DOCX files are supported.");
        }

        try {
            byte[] pdfBytes = conversionService.convertDocxToPdf(file.getInputStream());

            // Get the original file name without extension
            String originalFileName = file.getOriginalFilename();
            String baseFileName = originalFileName.substring(0, originalFileName.lastIndexOf('.'));

            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + baseFileName + "_pdf.pdf\"");
            headers.set(HttpHeaders.CONTENT_TYPE, "application/pdf");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to convert the file.");
        }
    }

    @PostMapping("/convertimage")
    public ResponseEntity<?> convertImageToPdf(@RequestParam("file") MultipartFile file) {
        String fileName = file.getOriginalFilename().toLowerCase();
        if (!(fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png"))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid file type. Only JPG, JPEG, and PNG files are supported.");
        }

        try {
            byte[] pdfBytes = conversionService.convertImageToPdf(file.getInputStream());

            String originalFileName = file.getOriginalFilename();
            String baseFileName = originalFileName.substring(0, originalFileName.lastIndexOf('.'));


            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + baseFileName + "_pdf.pdf\"");
            headers.set(HttpHeaders.CONTENT_TYPE, "application/pdf");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to convert the file.");
        }
    }

    @PostMapping("/combinepdfs")
    public ResponseEntity<?> combinePdfs(@RequestParam("files") MultipartFile[] files) {
        for (MultipartFile file : files) {
            if (!file.getOriginalFilename().endsWith(".pdf")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Invalid file type. Only PDF files are supported.");
            }
        }

        try {
            InputStream[] pdfStreams = new InputStream[files.length];
            for (int i = 0; i < files.length; i++) {
                pdfStreams[i] = files[i].getInputStream();
            }

            byte[] combinedPdfBytes = conversionService.combinePdfs(pdfStreams);

            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=combined.pdf");
            headers.set(HttpHeaders.CONTENT_TYPE, "application/pdf");

            return new ResponseEntity<>(combinedPdfBytes, headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to combine the files.");
        }
    }
}
