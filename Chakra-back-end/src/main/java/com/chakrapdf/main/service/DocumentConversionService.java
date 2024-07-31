package com.chakrapdf.main.service;

import org.docx4j.convert.out.pdf.PdfConversion;
import org.docx4j.convert.out.pdf.viaXSLFO.PdfSettings;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.springframework.stereotype.Service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class DocumentConversionService {

    public byte[] convertDocxToPdf(InputStream docxInputStream) throws Exception {
        // Load the DOCX file into a WordprocessingMLPackage
        WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(docxInputStream);

        // Create a PdfConversion object using the viaXSLFO converter
        PdfConversion converter = new org.docx4j.convert.out.pdf.viaXSLFO.Conversion(wordMLPackage);

        // Create an output stream to hold the PDF
        ByteArrayOutputStream pdfOutputStream = new ByteArrayOutputStream();

        // Convert the DOCX to PDF
        converter.output(pdfOutputStream, new PdfSettings());

        // Return the PDF bytes
        return pdfOutputStream.toByteArray();
    }

    public byte[] convertImageToPdf(InputStream imageInputStream) throws IOException {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            // Load the image
            PDImageXObject image = PDImageXObject.createFromByteArray(document, imageInputStream.readAllBytes(), null);

            // Draw the image on the page
            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                contentStream.drawImage(image, 0, 0, page.getMediaBox().getWidth(), page.getMediaBox().getHeight());
            }

            // Create an output stream to hold the PDF
            ByteArrayOutputStream pdfOutputStream = new ByteArrayOutputStream();
            document.save(pdfOutputStream);

            // Return the PDF bytes
            return pdfOutputStream.toByteArray();
        }
    }

    public byte[] combinePdfs(InputStream[] pdfStreams) throws IOException {
        PDFMergerUtility mergerUtility = new PDFMergerUtility();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        // Add all PDF input streams to the merger utility
        for (InputStream pdfStream : pdfStreams) {
            mergerUtility.addSource(pdfStream);
        }

        // Set the output stream
        mergerUtility.setDestinationStream(outputStream);

        // Merge the documents
        mergerUtility.mergeDocuments(null);

        return outputStream.toByteArray();
    }
}
