import * as fs from 'fs';
import pdf from 'pdf-parse';

// Function to read the PDF file and extract text
export async function readPDF(filePath: string) {
  try {
    // Read the PDF file
    const dataBuffer = fs.readFileSync(filePath);

    // Parse the PDF file
    const data = await pdf(dataBuffer);

    // Output the text content
    return data.text;
  } catch (error) {
    console.error('Error reading the PDF file:', error);
    throw new Error('Error reading the PDF file:' + error);
  }
}
