import fs from "fs/promises";

export default async function createDocumentsFromFile(filePath) {
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const sections = fileContent.split('\n\n');
        const documents = sections.map((section, index) => ({
            pageContent: section.trim(),
            metadata: {
                sectionNumber: index + 1, 
            },
        }));
        
        return documents;
    } catch (error) {
        console.error('Error reading or processing the file:', error);
        throw error; 
    }
}